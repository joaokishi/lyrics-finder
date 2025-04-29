// App.js
import React, { useState, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SongSearch from "./components/SongSearch";
import SongList from "./components/SongList";
import LyricsDisplay from "./components/LyricsDisplay";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import Navbar from "./components/Navbar";
import Info from "./components/Info";
import PopularSongs from "./components/PopularSongs";
import "./App.css";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [lyrics, setLyrics] = useState("");
  const [selectedSongInfo, setSelectedSongInfo] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingLyrics, setLoadingLyrics] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const clearError = useCallback(() => setError(""), []);
  
  const handleSelectSong = useCallback((artist, title) => {
    setLyrics("");
    clearError();
    setSelectedSongInfo({ artist, title });
  }, [clearError]);

  const handleBackToSongs = () => {
    setLyrics("");
    setSelectedSongInfo(null);
  };

  const resetHome = useCallback(() => {
    setSongs([]);
    setLyrics("");
    setSelectedSongInfo(null);
    setLoadingSearch(false);
    setLoadingLyrics(false);
    setError("");
    navigate("/");
  }, [navigate]);

  return (
    <>
      <Navbar onTitleClick={resetHome} />
      <Routes>
        <Route path="/" element={
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
              {!loadingLyrics && !lyrics && (
                <section>
                  <h2>{songs.length > 0 ? 'Songs' : 'Popular Songs'}</h2>
                  {!loadingSearch && songs.length === 0 ? (
                    <PopularSongs 
                      onSelectSong={handleSelectSong}
                      setLyrics={setLyrics}
                      setLoadingLyrics={setLoadingLyrics}
                      onError={setError}
                    />
                  ) : (
                    <SongList
                      songs={songs}
                      onSelectSong={handleSelectSong}
                      setLyrics={setLyrics}
                      setLoadingLyrics={setLoadingLyrics}
                      onError={setError}
                      loadingLyrics={loadingLyrics}
                    />
                  )}
                </section>
              )}
              {loadingLyrics && (
                <section>
                  <LoadingSpinner text="Loading lyrics..." />
                </section>
              )}
              {!loadingLyrics && lyrics && (
                <section>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2>"{selectedSongInfo?.title}" Lyrics</h2>
                    <button 
                      onClick={handleBackToSongs}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Back to Songs
                    </button>
                  </div>
                  <LyricsDisplay lyrics={lyrics} />
                </section>
              )}
            </main>
          </div>
        } />
        <Route path="/info" element={<Info />} />
      </Routes>
    </>
  );
};

export default App;