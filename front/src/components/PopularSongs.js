import React, { useEffect, useState } from 'react';
import './styles/PopularSongs.css';
import SongList from './SongList';

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://lyrics-finder-0rii.onrender.com";

const PopularSongs = ({ onSelectSong, setLyrics, setLoadingLyrics, onError }) => {
  const [popularSongs, setPopularSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularSongs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/popular-songs`);
        const data = await response.json();
        
        if (data && data.data) {
          const transformedSongs = data.data.map(song => ({
            id: song.id,
            title: song.title,
            artist: {
              name: song.artist.name || song.artist
            },
            album: {
              cover_medium: song.album?.cover_medium || song.image,
              title: song.title
            }
          }));
          setPopularSongs(transformedSongs);
        } else {
          onError('Could not fetch popular songs.');
        }
      } catch (err) {
        onError('Could not fetch popular songs.');
        console.error('Error fetching popular songs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularSongs();
  }, [onError]);

  if (loading) {
    return (
      <div className="popular-songs-container">
        <div className="popular-songs-loading">Loading popular songs...</div>
      </div>
    );
  }

  return (
    <div className="popular-songs-container">
      <SongList
        songs={popularSongs}
        onSelectSong={onSelectSong}
        setLyrics={setLyrics}
        setLoadingLyrics={setLoadingLyrics}
        onError={onError}
      />
    </div>
  );
};

export default PopularSongs; 