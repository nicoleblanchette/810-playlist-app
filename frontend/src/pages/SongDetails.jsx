import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import fetchData from '../utils/fetchData';

const SongDetails = () => {
  const [song, setSong] = useState({})
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('')

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData(`/api/songs/${id}`)
        if (data) setSong(data);
      } catch (error) {
        console.log(error);
      }
    }
    doFetch();
  }, [])

  const deleteSong = async () => {
    try {
      const options = {
        method: "DELETE"
      }
      const [data, error] = await fetchData(`/api/songs/${id}`, options)
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const changeSongTitle = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ songTitle: newSongTitle })
      }
      const [data, error] = await fetchData(`/api/songs/${id}`, options)
      if (data) setSong(data)
    } catch (error) {
      console.log(error);
    }
    setNewSongTitle('')
  }

  const changeSongArtist = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ songTitle: newSongArtist })
      }
      const [data, error] = await fetchData(`/api/songs/${id}`, options)
      if (data) setSong(data)
    } catch (error) {
      console.log(error);
    }
    setNewSongTitle('')
  
  }

  return (
    <>
      <h1>Song Details</h1>
      <img alt="album cover" src='https://static.wikia.nocookie.net/sd-reborn/images/3/31/Obama.png/revision/latest?cb=20221021132625'/>
      <p>Track #{song.id}: {song.title} by {song.artist}</p>

      <form onSubmit={changeSongTitle} className='patch-form'>
        <label htmlFor="title">Update Song Title:</label>
        <input type="text" name="title" id="title" value={newSongTitle} onChange={(e) => setNewSongTitle(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={changeSongArtist} className='patch-form'>
        <label htmlFor="artist">Update Song Artist:</label>
        <input type="text" name="artist" id="artist" value={newSongArtist} onChange={(e) => setNewSongArtist(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <Link to='/'>
        <button>Go Home</button>
      </Link>
      <button onClick={deleteSong}>Delete Song</button>
    </>
  )
}

export default SongDetails;