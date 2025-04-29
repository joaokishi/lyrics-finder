import React from 'react';
import './styles/ErrorMessage.css';

const ErrorMessage = ({ message, onClose }) => {
    if (!message) return null;
    return (
        <div className="error-message">
            <span>{message}</span>
        </div>
    );
};

export default ErrorMessage;