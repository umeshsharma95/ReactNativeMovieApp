import {
  Dimensions,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from '../services/axios';
import {API_KEY, baseUrlForImage} from '../services/request';
import {Button} from 'react-native';
import {generateLink} from '../utils/DynamicLink';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoviePage = ({route}) => {
  const [movie, setMovie] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);
  const {id: movieId} = route.params;

  useEffect(() => {
    movieId && fetchMovie();
    getFavorites();
  }, [movieId]);

  const shareProduct = async () => {
    const getLink = await generateLink(movieId);
    try {
      Share.share({
        message: getLink,
      });
    } catch (error) {
      console.log('Sharing Error:', error);
    }
  };

  const fetchMovie = async () => {
    try {
      const request = await axios.get(
        `/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
      );
      console.log(movieId, ' :', request?.data);
      setMovie(request?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFavorites = async () => {
    let data = await AsyncStorage.getItem('favoriteMovies');
    data = data ? JSON.parse(data) : data;
    setFavoriteList(data || []);
  };

  const addFavorite = async () => {
    let newData = [...favoriteList, movie];
    setFavoriteList(newData);
    newData = JSON.stringify(newData);
    await AsyncStorage.setItem('favoriteMovies', newData);
  };

  const removeFavorite = async () => {
    let newData = favoriteList.filter(item => item.id !== movie.id);
    setFavoriteList(newData);
    newData = JSON.stringify(newData);
    await AsyncStorage.setItem('favoriteMovies', newData);
  };

  const checkFavorite = favoriteList?.some(item => item?.id === movie?.id);

  return (
    <>
      {movie && (
        <View style={styles.container}>
          <Image
            source={{
              uri: `${baseUrlForImage}${movie.poster_path}`,
            }}
            style={styles.image}
            alt={movie.title}
          />
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
          <View style={styles.button}>
            <Button
              title={`${checkFavorite ? 'Remove From' : 'Add To'} Favorite`}
              onPress={() => {
                checkFavorite ? removeFavorite() : addFavorite();
              }}
            />
          </View>
          <View style={styles.button}>
            <Button title={'Share'} onPress={shareProduct} />
          </View>
        </View>
      )}
    </>
  );
};

export default MoviePage;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#333',
    height: '100%',
  },
  image: {
    height: 250,
    width: Dimensions.get('window').width - 10,
    borderRadius: 8,
    margin: 2,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginTop: 5,
  },
  overview: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 5,
  },
  button: {
    margin: 5,
  },
});
