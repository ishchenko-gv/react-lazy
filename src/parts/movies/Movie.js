import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieById } from '../../services/api-request';

export default function Movie() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      setMovieData(await getMovieById(movieId));
    }

    getMovie();
  }, []);

  if (!movieData) return 'loading';

  const {
    title,
    ratings
  } = movieData;

  return (
    <div>
      {title}
      <ul>
        {ratings.map(rating => (
          <li key={rating.source}>
            <div>{rating.source}</div>
            <div>{rating.value}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
