import { useEffect, useState } from 'react';
import moviesApi from '../api/movies';
import { Movie, MoviesResponse } from '../model/movie';

export const useMovies = (
  list: 'now_playing' | 'popular' | 'top_rated' | 'upcoming',
): [Movie[], boolean] => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMoviesNowPlaying = async (type: string) => {
    setIsLoading(true);
    try {
      const result = await moviesApi.get<MoviesResponse>(`/${type}`);
      setMovies(result.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMoviesNowPlaying(list);
  }, [list]);

  return [movies, isLoading];
};
