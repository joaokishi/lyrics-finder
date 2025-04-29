// components/SongList.js
import React from 'react';
import './styles/SongList.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://lyrics-finder-0rii.onrender.com";

function normalizeLyrics(lyrics) {
  if (!lyrics) return '';
  
  return lyrics
    .replace(/\r\n|\r|\n/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

const SongList = ({ songs, onSelectSong, setLyrics, setLoadingLyrics, onError }) => {
  const handleCardClick = async (song) => {
    if (!song.artist?.name || !song.title) {
      console.warn('Song missing artist or title:', song);
      onError && onError("This song is missing artist or title information.");
      return;
    }
    try {
      setLoadingLyrics(true);
      onSelectSong(song.artist.name, song.title);
      
      const response = await fetch(
        `${API_BASE_URL}/lyrics?artist=${encodeURIComponent(song.artist.name)}&title=${encodeURIComponent(song.title)}`
      );
      const data = await response.json();
      
      if (data.lyrics) {
        setLyrics(normalizeLyrics(data.lyrics));
      } else {
        onError("Couldn't find lyrics for this song.");
      }
    } catch (err) {
      onError("Error fetching lyrics. Please try again.");
      console.error('Error fetching lyrics:', err);
    } finally {
      setLoadingLyrics(false);
    }
  };

  const validSongs = songs.filter(song => song.artist?.name && song.title);

  return (
    <div className="music-container">
      {validSongs.map(song => (
        <div
          key={song.id}
          className="music-card"
          onClick={() => handleCardClick(song)}
        >
          <img
            src={song.album.cover_medium}
            alt={`${song.title} by ${song.artist.name}`}
          />
          <h3>{song.title}</h3>
          <p>{song.artist.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SongList;