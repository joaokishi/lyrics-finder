import React from 'react';
import './styles/LoadingSpinner.css';

const LoadingSpinner = ({ text = "Loading..." }) => {
    return <p className="loading-text">{text}</p>;
};

export default LoadingSpinner;