import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams(); // object
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=17dec6d0&i=${id}&plot=full`
        );
        if (response.data.Response === 'False') {
          throw new Error(response.data.Error);
        }
        setMovie(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="error">Данные не найдены</div>;

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-poster">
        <img
          src={movie.Poster !== 'N/A' 
            ? movie.Poster 
            : 'https://via.placeholder.com/400x600?text=No+Poster'}
          alt={`Постер ${movie.Title}`}
        />
      </div>
      <div className="movie-detail-info">
        <h1 className="movie-detail-title">{movie.Title} ({movie.Year})</h1>
        
        <div className="movie-detail-meta">
          <span>IMDb: {movie.imdbRating}</span>
          <span>{movie.Runtime}</span>
          <span>{movie.Rated}</span>
        </div>
        
        <p className="movie-detail-plot">{movie.Plot}</p>

        <div className="movie-detail-extra">
          <div className="movie-detail-group">
            <h3>Режиссер</h3>
            <p>{movie.Director}</p>
          </div>
          <div className="movie-detail-group">
            <h3>Актеры</h3>
            <p>{movie.Actors}</p>
          </div>
          <div className="movie-detail-group">
            <h3>Жанр</h3>
            <p>{movie.Genre}</p>
          </div>
        </div>

        <Link to="/" className="back-button">
          ← Іздеуге оралу
        </Link>
      </div>
    </div>
  );
};

export default MovieDetail;