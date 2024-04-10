import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import fetchData from '../utils/fetchData';
import '../App.css'

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('')
  const [newSongCoverImg, setNewSongCoverImg] = useState('')
  const [newSongSrc, setNewSongSrc] = useState('')
  const [newlyAddedSong, setNewlyAddedSong] = useState({})

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData('/api/songs/')
        if (data) setSongs(data);
      } catch (error) {
        console.log(error);
      }
    }
    doFetch();
  }, [newlyAddedSong])

  const createSong = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ songTitle: newSongTitle, songArtist: newSongArtist, songCoverImg: newSongCoverImg, songSrc: newSongSrc })
      }
      const [data, error] = await fetchData(`/api/songs/`, options)
      if (data) setNewlyAddedSong(data);
    } catch (error) {
      console.log(error);
    }
    setNewSongTitle('')
    setNewSongArtist('')
    setNewSongCoverImg('')
    setNewSongSrc('')
  }

  return (
    <>
      <h1>slopify</h1>
      <h2>slop. for your ears.</h2>
      <form onSubmit={createSong} class="create-form">
        <h3>send a song to the slop chamber!</h3>
        
        <div className='form-input'>
        <label htmlFor="name">title:</label>
        <input type="text" name="name" id="name" value={newSongTitle} onChange={(e) => setNewSongTitle(e.target.value)} />
        </div>
          
        <div className='form-input'>
        <label htmlFor="artist">artist:</label>
          <input type="text" name="artist" id="artist" value={newSongArtist} onChange={(e) => setNewSongArtist(e.target.value)} />
        </div>

        <div className='form-input'>
        <label htmlFor="cover-art">cover art:</label>
          <input type="text" name="coverArt" id="cover-art" value={newSongCoverImg} onChange={(e) => setNewSongCoverImg(e.target.value)} />
        </div>

        <div className='form-input'>
        <label htmlFor="source">source:</label>
          <input placeholder="Paste the src from an iframe embed" type="text" name="source" id="source" value={newSongSrc} onChange={(e) => setNewSongSrc(e.target.value)} />
        </div>

        <button type="submit">SLOPIFY!</button>
      </form>
      <ul id="tracklist">
        {
          songs.map((song) => {
            return <li key={song.id}>
              <p>#{song.id }</p>
              <Link to={`/songs/${song.id}`}>
                {song.title} - {song.artist}
              </Link>
            </li>
         })
        }
      </ul >
    </>
  )
}

export default Home;