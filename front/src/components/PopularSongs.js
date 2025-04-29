import React, { useEffect, useState } from 'react';
import './styles/PopularSongs.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://lyrics-finder-0rii.onrender.com";

const PopularSongs = ({ onSelectSong }) => {
  const [popularSongs, setPopularSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularSongs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/popular-songs`);
        const data = await response.json();
        
        if (data && data.data) {
          setPopularSongs(data.data.map(track => ({
            title: track.title,
            artist: track.artist.name,
            albumCover: track.album.cover_medium
          })));
        } else {
          setError('Could not fetch popular songs.');
        }
      } catch (err) {
        setError('Could not fetch popular songs.');
        console.error('Error fetching popular songs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularSongs();
  }, []);

  if (loading) {
    return (
      <div className="popular-songs-container">
        <h2>Popular Songs</h2>
        <div className="popular-songs-loading">Loading popular songs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="popular-songs-container">
        <h2>Popular Songs</h2>
        <div className="popular-songs-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="popular-songs-container">
      <h2>Popular Songs</h2>
      <div className="popular-songs-grid">
        {popularSongs.map(({ title, artist, albumCover }) => (
          <div
            key={`${artist}-${title}`}
            className="popular-song-card"
            onClick={() => onSelectSong(artist, title)}
          >
            {albumCover && (
              <img 
                src={albumCover} 
                alt={`${title} by ${artist}`} 
                className="song-cover"
              />
            )}
            <h3>{title}</h3>
            <p>{artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSongs; 