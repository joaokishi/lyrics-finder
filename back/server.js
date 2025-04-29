const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

// Existing lyrics endpoint
app.get('/lyrics/:artist/:title', async (req, res) => {
  try {
    const { artist, title } = req.params;
    const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Lyrics not found' });
  }
});

// New endpoint for popular songs
app.get('/popular-songs', async (req, res) => {
  try {
    const response = await axios.get('https://api.deezer.com/chart/0/tracks?limit=10');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch popular songs' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 