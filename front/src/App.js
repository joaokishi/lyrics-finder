// App.js
import React, { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SongSearch from "./components/SongSearch";
import SongList from "./components/SongList";
import LyricsDisplay from "./components/LyricsDisplay";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import Navbar from "./components/Navbar";
import Info from "./components/Info";
import "./App.css";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [lyrics, setLyrics] = useState("");
  const [selectedSongInfo, setSelectedSongInfo] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingLyrics, setLoadingLyrics] = useState(false);
  const [error, setError] = useState("");
  
  const clearError = useCallback(() => setError(""), []);
  const handleSelectSong = useCallback((artist, title) => {
    setSongs([]);
    setLyrics("");
    clearError();
    setSelectedSongInfo({ artist, title });
  }, [clearError]);

  return (
    <div className="app-container">
      <main>
        <section>
          <SongSearch
            setSongs={setSongs}
            setLoading={setLoadingSearch}
            setLyrics={setLyrics}
            onError={setError}
          />
        </section>
        {error && <ErrorMessage message={error} onClose={clearError} />}
        {loadingSearch && <LoadingSpinner text="Searching songs..." />}
        {!loadingSearch && songs.length > 0 && (
          <section>
            <h2>Songs</h2>
            <SongList
              songs={songs}
              onSelectSong={handleSelectSong}
              setLyrics={setLyrics}
              setLoadingLyrics={setLoadingLyrics}
              onError={setError}
              loadingLyrics={loadingLyrics}
            />
          </section>
        )}
        {!loadingLyrics && lyrics && (
          <section>
            <h2>"{selectedSongInfo?.title}" Lyrics</h2>
            <LyricsDisplay lyrics={lyrics} />
          </section>
        )}
      </main>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  </BrowserRouter>
);

export default App;