import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardView from '../components/CardView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = ({route}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getFavorites();
  }, [route]);

  const getFavorites = async () => {
    let data = await AsyncStorage.getItem('favoriteMovies');
    data = data ? JSON.parse(data) : data;
    console.log('data', data);
    setMovies(data || []);
  };

  return (
    <View>
      <FlatList
        data={movies}
        renderItem={({item}) => <CardView {...item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Favorite is empty</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
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
