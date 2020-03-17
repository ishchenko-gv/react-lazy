import React, { useEffect } from 'react';

import { searchMovie } from '../../services/api-request';

export default function Gallery() {
  useEffect(() => {
    const fetchMovies = async () => {
      console.log(await searchMovie('batman'))
    };

    fetchMovies();
  });

  return (
    <div>Gallery</div>
  );
}
