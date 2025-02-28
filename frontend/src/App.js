import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Book from './pages/Book';
import AddBook from './pages/AddBook';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Description from './components/Description';

function App() {
  return (
    // giving routes to the specfc URLs
    <div className="App bg-dark">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/description" element={<Description />} /> {/* Fixed this */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

