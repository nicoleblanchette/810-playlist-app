import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import fetchData from '../utils/fetchData';

const SongDetails = () => {
  const [song, setSong] = useState({})

  const { id } = useParams();
  const navigate = useNavigate();

  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [newSongCoverImg, setNewSongCoverImg] = useState('')
  const [newSongSrc, setNewSongSrc] = useState('')

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData(`/api/songs/${id}`)
        if (data) {
          setSong(data);
          setNewSongTitle(data.title)
          setNewSongArtist(data.artist)
          setNewSongCoverImg(data.coverImg)
          setNewSongSrc(data.src)
        }
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
  }

  const changeSongArtist = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ songArtist: newSongArtist })
      }
      const [data, error] = await fetchData(`/api/songs/${id}`, options)
      if (data) setSong(data)
    } catch (error) {
      console.log(error);
    }
  
  }

  const changeSongCoverImg  = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ songCoverImg: newSongCoverImg })
      }
      const [data, error] = await fetchData(`/api/songs/${id}`, options)
      if (data) setSong(data)
    } catch (error) {
      console.log(error);
    }
  
  }

  const changeSongSrc = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ songSrc: newSongSrc })
      }
      const [data, error] = await fetchData(`/api/songs/${id}`, options)
      if (data) setSong(data)
    } catch (error) {
      console.log(error);
    }
  
  }

  return (
    <>
      <h1>song details</h1>
      <img alt="album cover" src={ song.coverImg} id='album-cover' />
      <p>Track #{song.id}: {song.title} by {song.artist}</p>

      <iframe src={song.src} allow="autoplay"></iframe>
   
      <h2>Edit info:</h2>

      <div id="modify">
      <form onSubmit={changeSongTitle} className='patch-form'>
        <label htmlFor="title" value="song">Title:</label>
        <input type="text" name="title" id="title" value={newSongTitle} onChange={(e) => setNewSongTitle(e.target.value)} />
        <button type="submit">UPDATE</button>
      </form>

      <form onSubmit={changeSongArtist} className='patch-form'>
        <label htmlFor="artist">Artist:</label>
        <input type="text" name="artist" id="artist" value={newSongArtist} onChange={(e) => setNewSongArtist(e.target.value)} />
        <button type="submit">UPDATE</button>
      </form>

      <form onSubmit={changeSongCoverImg} className='patch-form'>
        <label htmlFor="cover-img">Cover Art:</label>
        <input type="text" name="coverImg" id="cover-img" value={newSongCoverImg} onChange={(e) => setNewSongCoverImg(e.target.value)} />
        <button type="submit">UPDATE</button>
      </form>
        
      <form onSubmit={changeSongSrc} className='patch-form'>
        <label htmlFor="source">Source:</label>
        <input type="text" name="source" id="source" value={newSongSrc} onChange={(e) => setNewSongSrc(e.target.value)} />
        <button type="submit">UPDATE</button>
      </form>
        
      </div>

      <Link to='/'>
        <button>Go Home</button>
      </Link>
      <button type="button" onClick={deleteSong}>Delete Song</button>
    </>
  )
}

export default SongDetails;