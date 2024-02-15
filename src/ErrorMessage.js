import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <p className="error-text">{message}</p>
  </div>
);

export default ErrorMessage;