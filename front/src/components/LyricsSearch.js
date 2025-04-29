import React from "react";
import axios from "axios";
import "./styles/LyricsSearch.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const normalizeLyrics = (lyrics) => {
  if (!lyrics) return "";
  return lyrics
    .replace(/\r\n|\n|\r/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
};

const LyricsSearch = ({
  artist,
  title,
  setLyrics,
  setLoading,
  onError,
  onLyricsClick,
  isLoading,
}) => {
  const fetchLyrics = async () => {
    if (onLyricsClick) {
      onLyricsClick();
    }
    setLoading(true);
    onError("");
    setLyrics("");
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lyrics?artist=${encodeURIComponent(
          artist
        )}&title=${encodeURIComponent(title)}`
      );
      const normalized = normalizeLyrics(response.data.lyrics);
      if (normalized) {
        setLyrics(normalized);
      }
    } catch (error) {
      console.error("Error when searching for lyrics:", error);
      setLyrics("");
      const errorMessage =
        error.response?.data?.error ||
        "Error when searching for lyrics. Try again.";
      onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={fetchLyrics}
      className="lyrics-search-button"
      disabled={isLoading}
    >
      {isLoading ? "Loading lyrics..." : "See lyrics"}
    </button>
  );
};

export default LyricsSearch;
