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

  return (
    <div>
      {movieData.Title}
    </div>
  );
}
