const getId = require('../utils/getId');


/* 
This class provides an interface for managing Song data. 
Instances of this class can't do much really. They just store data.

The class itself provides static methods for CRUD actions on 
the collection of songs.
*/
class Song {
  static #all = [];

  constructor(title, artist, coverImg, src) {
    this.id = getId();
    this.title = title || 'Thanks, OBAMA (Part II) (Remix)';
    this.artist = artist || 'Gonzalo Romero';
    this.coverImg = coverImg || 'https://steamuserimages-a.akamaihd.net/ugc/1630822545723771399/0945CC59EFF3534D637326CA6FB09A2C3FA83DD1/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false';
    this.src = src || 'https://drive.google.com/file/d/1fnLRZNwCZDiotzvbqBOpD9tB0iSA0VDF/preview'

    Song.#all.push(this);
  }

  static list() {
    return Song.#all;
  }

  static find(id) {
    return Song.#all.find((song) => song.id === id);
  }

  static editTitle(id, newTitle) {
    const song = Song.find(id);
    if (!song) return null;
    song.title = newTitle || song.title;
    return song;
  }

  static editArtist(id, newArtist) {
    const song = Song.find(id);
    if (!song) return null;
    song.artist = newArtist || song.artist;
    return song;
  }

  static editCover(id, newCover) {
    const song = Song.find(id);
    if (!song) return null;
    song.coverImg = newCover || song.coverImg;
    return song;
  }

  static editSrc(id, newSrc) {
    const song = Song.find(id);
    if (!song) return null;
    song.src = newSrc || song.src;
    return song;
  }

  static delete(id) {
    const songIndex = Song.#all.findIndex((song) => song.id === id);
    if (songIndex < 0) return null;

    Song.#all.splice(songIndex, 1);
    return true;
  }

  static deleteAll() {
    if (!Song.#all.length) return null;

    Song.#all.length = 0;
    return Song.#all;
  }
}

module.exports = Song;