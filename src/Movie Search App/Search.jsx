import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);  //isLoading =  true   
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=17dec6d0&s=${query}`
      );
      
      if (response.data.Response === 'False') {
        onSearch([]);
      } else {
        onSearch(response.data.Search);
      }
    } catch (error) {
      console.error('Іздеу:', error);
    } finally {
      setIsLoading(false);
    }
  };
// query = e.target.value
  return (
    <form className="search-form" onSubmit={searchMovies}>
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Фильмнің атын енгізіңіз..."
        disabled={isLoading}
        aria-label="Фильм іздеу өрісі"
      />
      <button 
        type="submit" 
        className="search-button"
        disabled={isLoading}
      >
        {isLoading ? 'Іздеу...' : 'Табу'}
      </button>
    </form>
  );
};
export default Search;