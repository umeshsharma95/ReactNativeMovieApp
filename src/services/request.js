export const API_KEY = '65799fc9a997452f4088020a5339679f';

// const url = 'https://api.themoviedb.org/3/movie/550?api_key=65799fc9a997452f4088020a5339679f';

export const baseUrlForImage = 'https://image.tmdb.org/t/p/original/';

const requestsData = [
  {
    title: 'NETFLIX ORIGINALS',
    fetchUrl: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    isLargeRow: true,
  },
  {
    title: 'Trending Now',
    fetchUrl: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  {
    title: 'Top Rated',
    fetchUrl: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  },
  {
    title: 'Action Movies',
    fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  {
    title: 'Comedy Movies',
    fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  },
  {
    title: 'Horror Movies',
    fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  },
  {
    title: 'Romance Movies',
    fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  },
  {
    title: 'Documentaries',
    fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  },
];

const findById = `/find/{external_id}?api_key=${API_KEY}&language=en-US&external_source=imdb_id`
const searchMovie = `/search/movie?query=luci&include_adult=true&language=en-US&page=1`

export default requestsData;
