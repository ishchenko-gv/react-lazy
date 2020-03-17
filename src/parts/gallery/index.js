import React, { useEffect, useState } from 'react';

import { searchMovie } from '../../services/api-request';

export default function Gallery() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      setMovies(await searchMovie('batman'))
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Gallery</h2>
      <input type='text' onChange={async e => setMovies(await searchMovie(e.target.value))} />
      {movies && movies.map(movie => (
        <div key={movie.imdbID}>
          <div>{movie.Title}</div>
          <div>{movie.Year}</div>
          <img src={movie.Poster} />
        </div>
      ))}
    </div>
  );
}
