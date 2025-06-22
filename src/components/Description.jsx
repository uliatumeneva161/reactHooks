// Description.jsx
import React from 'react';

const Description = ({ children }) => {
  return (
    <div style={descriptionStyle}>
      <p style={textStyle}>{children}</p>
    </div>
  );
};

// Стили компонента
const descriptionStyle = {
  marginTop: '20px',
  padding: '15px',
  backgroundColor: '#f8f9fa',
  borderLeft: '4px solid #61dafb',
  borderRadius: '0 4px 4px 0',
};

const textStyle = {
  margin: 0,
  color: '#333',
  lineHeight: 1.6,
  fontSize: '0.95rem',
};

export default Description;