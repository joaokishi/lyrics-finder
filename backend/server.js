// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
const DEEZER_API_URL = "https://api.deezer.com";
const LYRICS_API_URL = "https://api.lyrics.ovh/v1";

app.use(cors());
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Internal error in the server." });
});

app.get("/search", async (req, res, next) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "'q' parameter can't be null." });
  }
  try {
    const encodedQuery = encodeURIComponent(q);
    const response = await axios.get(`${DEEZER_API_URL}/search?q=${encodedQuery}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error when searching on Deezer API:", error.message);
    if (error.response) {
        return res.status(error.response.status || 500).json({
             error: `Error when searching for music: ${error.response.data?.error?.message || error.message}`
        });
    }
    res.status(500).json({ error: "Can't connect to Deezer API." });
  }
});

app.get("/lyrics", async (req, res, next) => {
  const { artist, title } = req.query;
  if (!artist || !title) {
    return res.status(400).json({ error: "The parameters 'artist' and 'title' can't be null." });
  }
  try {
    const encodedArtist = encodeURIComponent(artist);
    const encodedTitle = encodeURIComponent(title);
    const response = await axios.get(`${LYRICS_API_URL}/${encodedArtist}/${encodedTitle}`);
     if (response.data && response.data.error) {
        return res.status(404).json({ error: "Lyrics not found." });
    }
    res.json(response.data);
  } catch (error) {
     console.error("Error when searching on Lyrics.ovh API:", error.message);
    if (error.response && error.response.status === 404) {
       return res.status(404).json({ error: "Lyrics not found." });
    }
    res.status(500).json({ error: "Can't connect to Lyrics.ovh API." });
  }
});

app.get('/popular-songs', async (req, res) => {
  try {
    const response = await axios.get('https://api.deezer.com/chart/0/tracks?limit=10');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch popular songs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});