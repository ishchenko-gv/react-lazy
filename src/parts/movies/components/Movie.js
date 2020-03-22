import React, {
  useState,
  useEffect
} from 'react';
import { useParams } from 'react-router-dom';

import { getMovieById } from '../../../services/api-request';
import Image from '../../../kit/Image';

export default function Movie () {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      setMovieData(await getMovieById(movieId));
    };

    getMovie();
  }, [movieId]);

  if (!movieData) return 'loading';

  const {
    title,
    ratings,
    posterURL,
    plot
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
      <Image src={posterURL} width='300px' height='400px' />
      <p>{plot}</p>
    </div>
  );
}
