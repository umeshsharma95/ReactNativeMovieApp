import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {baseUrlForImage} from '../services/request';
import {useNavigation} from '@react-navigation/native';

let currentSlide = 0;
let timerId = null;
let intervalTime = 3000;

const HorizontalList = ({data, isLargeRow, title, isLoading}) => {
  const listRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (isLargeRow) {
      stopAutoPlay();
      startAutoPlay();
    }
    return () => {
      stopAutoPlay();
    };
  }, []);

  const goToNextSlide = () => {
    if (currentSlide >= data.length - 1) {
      currentSlide = 0;
    }
    listRef?.current &&
      listRef.current.scrollToIndex({
        index: ++currentSlide,
        animated: true,
      });
  };

  const startAutoPlay = () => {
    timerId = setInterval(goToNextSlide, intervalTime);
  };

  const stopAutoPlay = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  const renderItem = ({item}) => <Item item={item} />;

  const Item = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Movie Page', {id: item.id})}>
        <Image
          source={{
            uri: `${baseUrlForImage}${
              isLargeRow ? item.poster_path : item.backdrop_path
            }`,
          }}
          style={isLargeRow ? styles.largeImage : styles.image}
          alt={item.name}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {isLoading ? (
        <View
          style={isLargeRow ? styles.largeLoadingState : styles.loadingState}
        />
      ) : (
        <FlatList
          ref={listRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={event => {
            currentSlide = Math.floor(
              Math.floor(event.nativeEvent.contentOffset.x) /
                Math.floor(event.nativeEvent.layoutMeasurement.width),
            );
          }}
        />
      )}
    </View>
  );
};

export default HorizontalList;

const styles = StyleSheet.create({
  container: {},
  title: {
    color: '#fff',
    fontSize: 16,
    marginTop: 6,
    marginBottom: 6,
  },
  loadingState: {
    height: 100,
    backgroundColor: '#fff',
    opacity: 0.7,
    margin: 2,
  },
  largeLoadingState: {
    height: 250,
    backgroundColor: '#fff',
    opacity: 0.7,
    margin: 2,
  },
  image: {
    width: 200,
    height: 100,
    borderRadius: 8,
    margin: 2,
  },
  largeImage: {
    height: 250,
    width: Dimensions.get('window').width - 10,
    borderRadius: 8,
    margin: 2,
  },
});
