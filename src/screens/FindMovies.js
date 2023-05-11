import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardView from '../components/CardView';
import axios from '../services/axios';
import {API_KEY} from '../services/request';
import {debounce} from '../utils/commonFunctions';

const FindMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [debounceValue, setDebounceValue] = useState('');

  useEffect(() => {
    debounce(value => setDebounceValue(value), 500)(searchString);
  }, [searchString]);

  useEffect(() => {
    if (debounceValue) {
      searchMovies(debounceValue);
    } else {
      setMovies([]);
    }
  }, [debounceValue]);

  const searchMovies = async search => {
    const request = await axios.get(
      `/search/movie?api_key=${API_KEY}&query=${search}&include_adult=false&language=en-US`,
    );
    setMovies(request?.data?.results || []);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Movie Name"
        value={searchString}
        onChangeText={setSearchString}
      />
      <FlatList
        data={movies}
        renderItem={({item}) => <CardView {...item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {debounceValue ? 'No Data Found' : 'Search Movie by Name'}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default FindMovies;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 120,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  emptyState: {
    alignItems: 'center',
    marginVertical: 20,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '500',
  },
});
