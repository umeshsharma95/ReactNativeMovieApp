import React, {useState, useEffect} from 'react';
import axios from '../services/axios';
import HorizontalList from './HorizontalList';
import {recordError} from '../utils/Crashlytics';

const RowList = ({title, fetchUrl, isLargeRow}) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUrl && fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const request = await axios.get(fetchUrl);
      setIsLoading(false);
      setMovies(request?.data?.results || []);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      recordError(error);
    }
  };

  return (
    <HorizontalList
      data={movies || []}
      title={title}
      isLargeRow={isLargeRow}
      isLoading={isLoading}
    />
  );
};

export default RowList;
