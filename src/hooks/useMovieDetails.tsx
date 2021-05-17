import { useEffect, useState } from 'react';
import moviesApi from '../api/movies';
import { Cast, MovieCredits, MovieDetail } from '../model/movie';

interface Details {
  isLoading: boolean;
  movie?: MovieDetail;
  cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {
  const [details, setDetails] = useState<Details>({
    isLoading: true,
    cast: [],
  });

  const getMovieDetails = async (id: number) => {
    const detailsProm = moviesApi.get<MovieDetail>(`/${id}`);
    const creditsProm = moviesApi.get<MovieCredits>(`/${id}/credits`);

    const [movie, credits] = await Promise.all([detailsProm, creditsProm]);

    setDetails({
      movie: movie.data,
      cast: credits.data.cast,
      isLoading: false,
    });
  };

  useEffect(() => {
    getMovieDetails(movieId);
  }, [movieId]);

  return { ...details };
};
