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
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteList } from '../redux/actions';

const MoviePage = ({route}) => {
  const favoriteList = useSelector(state => state?.favoriteList || [])
  const dispatch = useDispatch()

  const [movie, setMovie] = useState(null);
  const {id: movieId} = route.params;

  useEffect(() => {
    movieId && fetchMovie();
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

  const addFavorite = async () => {
    let newData = [...favoriteList, movie];
    dispatch(setFavoriteList(newData))
  };

  const removeFavorite = async () => {
    let newData = favoriteList.filter(item => item.id !== movie.id);
    dispatch(setFavoriteList(newData))
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
