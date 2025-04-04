import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './Search';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import './App.css';

export default function App() {
  const [movies, setMovies] = useState([]);
  // movies =
  
  return (
    <Router>
      <div className="app">
        <h1>Movie Search App</h1>
        <Search onSearch={setMovies} /> 
        
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movie/:id" element={<MovieDetail/>} />
        </Routes>
      </div>
    </Router>
  );
}