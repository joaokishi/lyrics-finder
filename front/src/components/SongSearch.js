import React, { useState } from "react";
import axios from "axios";
import './styles/SongSearch.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://lyrics-finder-0rii.onrender.com";
const SongSearch = ({ setSongs, setLoading, setLyrics, onError, isLoading }) => {
  const [query, setQuery] = useState("");
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      onError("Please, type the song title or artist.");
      return;
    }
    setLoading(true);
    setSongs([]);
    setLyrics("");
    onError("");
    try {
      const response = await axios.get(`${API_BASE_URL}/search?q=${trimmedQuery}`);
      if (response.data?.data?.length > 0) {
        setSongs(response.data.data);
      } else {
        setSongs([]);
        onError("Song not found.");
      }
    } catch (error) {
      console.error("Error when searching for song:", error);
      setSongs([]);
      const errorMessage = error.response?.data?.error || "Error when searching for song. Try again";
      onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="song-search-container">
      <input
        type="text"
        placeholder="Song name or artist"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="song-search-input"
        aria-label="Search song or artist"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="song-search-button"
        disabled={isLoading} 
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SongSearch;