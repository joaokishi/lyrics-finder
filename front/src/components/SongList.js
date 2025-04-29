// components/SongList.js
import React from 'react';
import LyricsSearch from './LyricsSearch';
import './styles/SongList.css';

const SongList = ({ songs, onSelectSong, setLyrics, setLoadingLyrics, onError, loadingLyrics }) => {
  return (
    <div className="music-container">
      {songs.map((song) => (
        <div className="music-card" key={song.id}>
          <img
            src={song.album.cover_medium}
            alt={`Album cover ${song.album.title}`}
          />
          <h3>{song.title}</h3>
          <p>{song.artist.name}</p>
          <LyricsSearch
            artist={song.artist.name}
            title={song.title}
            setLyrics={setLyrics}
            setLoading={setLoadingLyrics}
            onError={onError}
            onLyricsClick={() => onSelectSong(song.artist.name, song.title)}
            isLoading={loadingLyrics}
          />
        </div>
      ))}
    </div>
  );
};

export default SongList;