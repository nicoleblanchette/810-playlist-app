import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import fetchData from '../utils/fetchData';

const FellowDetails = () => {
  const [fellow, setFellow] = useState({})
  const [newFellowName, setNewFellowName] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData(`/api/fellows/${id}`)
        if (data) setFellow(data);
      } catch (error) {
        console.log(error);
      }
    }
    doFetch();
  }, [])

  const deleteFellow = async () => {
    try {
      const options = {
        method: "DELETE"
      }
      const [data, error] = await fetchData(`/api/fellows/${id}`, options)
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const changeFellowName = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ fellowName: newFellowName })
      }
      const [data, error] = await fetchData(`/api/fellows/${id}`, options)
      if (data) setFellow(data)
    } catch (error) {
      console.log(error);
    }
    setNewFellowName('')
  }

  return (
    <>
      <h1>Fellow Details</h1>
      <p>{fellow.name} - {fellow.id}</p>
      <button onClick={deleteFellow}>Delete Fellow</button>
      <form onSubmit={changeFellowName}>
        <label htmlFor="name">Update Fellow Name</label>
        <input type="text" name="name" id="name" value={newFellowName} onChange={(e) => setNewFellowName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <Link to='/'>
        <button>Go Home</button>
      </Link>
    </>
  )
}

export default FellowDetails;