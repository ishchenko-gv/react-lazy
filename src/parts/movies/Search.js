import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { findMoviesByTitle, getMovieById } from '../../services/api-request';
import Image from '../../kit/Image';

export default function Search() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setMovies(await findMoviesByTitle('batman'))
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      <input type='text' onChange={async e => setMovies(await findMoviesByTitle(e.target.value))} />
      {movies && movies.map(movie => (
        <div key={movie.id}>
          <div>{movie.title}</div>
          <div>{movie.year}</div>
          <Link to={`${url}/${movie.id}`}>
            <Image width={300} height={400} src={movie.posterURL} onMouseEnter={() => getMovieById(movie.id)} />
          </Link>
        </div>
      ))}
    </div>
  );
}