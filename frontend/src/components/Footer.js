import React from 'react';

export default function Footer() {
  // copied from chat gpt
  let mystyle = {
    borderTop: '2px solid white',
    color: '#c8c8c8',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#333', // Dark background for contrast
    padding: '8px 0',
    height: '9vh',
    // position: 'fixed', // To keep it at the bottom of the page
    bottom: '0',
    width: '100%',
  };

  const textStyle = {
    fontSize: '12px',
    marginBottom: '0',
    letterSpacing: '1px', // Adds a little spacing to the letters
    fontWeight: 'lighter', // Lighter font for a modern feel
    textTransform: 'uppercase', // All letters in uppercase
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center text-center"
      style={mystyle}
    >
      <p className="mb-0" style={textStyle}>Developed by Huzaifa Gujjar @ 2025</p>
    </div>
  );
}
