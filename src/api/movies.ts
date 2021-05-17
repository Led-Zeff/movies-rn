import axios from 'axios';

const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '4de6d61298a67b4eaf7dbd5d0b548a3f',
    language: 'en-US',
  },
});

export default moviesApi;
