import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from '../services/axios';
import requestsData from '../services/request';
import {FlatList} from 'react-native-gesture-handler';
import CardView from '../components/CardView';

const CategoryPage = ({navigation, route}) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [fetchUrl, setFetchUrl] = useState('');

  useEffect(() => {
    const data = requestsData.find(item => item?.title === route?.name);
    data && fetchData(data.fetchUrl);
  }, [route]);

  const fetchData = async fetchUrl => {
    setFetchUrl(fetchUrl);
    try {
      //   setIsLoading(true);
      const request = await axios.get(`${fetchUrl}&page=${1}`);
      //   setIsLoading(false);
      console.log('title', ' :', request?.data?.results[0]);
      setMovies(request?.data?.results || []);
    } catch (error) {
      //   setIsLoading(false);
      console.log(error);
      //   recordError(error);
    }
  };

  const loadMoreData = async () => {
    try {
      const request = await axios.get(`${fetchUrl}&page=${page + 1}`);
      const data = request?.data?.results || [];
      setMovies(prev => [...prev, ...data]);
      setPage(prev => ++prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({item}) => <CardView {...item} />}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.2}
        onEndReached={loadMoreData}
      />
    </View>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#333',
  },
});
