import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  // copied form chat gpt
const linkStyle = {
  fontSize: '18px',
  fontWeight: '600',
  letterSpacing: '1px',
  padding: '10px 15px',
  transition: 'all 0.3s ease',
  textTransform: 'uppercase',
  borderRadius: '5px',
};
  return (
    // copied from Bootstrap
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom" style={{ position: 'fixed', width: '100%', top: '0', left: '0', zIndex: '9999', minHeight: '9vh'}}>
        <div className="container">
          <span className="navbar-brand text-white" style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase' }}>
            BOOKSTORE
          </span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ border: '1px solid white' }}>
            <span className="navbar-toggler-icon" style={{ color: 'white', backgroundColor: '#171515' }}></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* link to home page */}
                <Link className="nav-link text-white" aria-current="page" to="/" style={linkStyle}>HOME</Link>
              </li>
              <li className="nav-item">
                {/* link to book page */}
                <Link className="nav-link text-white" to="/book" style={linkStyle}>BOOKS</Link>
              </li>
              <li className="nav-item">
                {/* link to add page */}
                <Link className="nav-link text-white" to="/addbook" style={linkStyle}>ADD BOOKS</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

