import React from 'react';
import './styles/LyricsDisplay.css';

const LyricsDisplay = ({ lyrics }) => {
  return (
    <div className="lyrics-display-container"> 
      <pre className="lyrics-text">
        {lyrics}
      </pre>
    </div>
  );
};

export default LyricsDisplay;