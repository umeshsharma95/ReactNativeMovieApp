import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {baseUrlForImage} from '../services/request';

const CardView = item => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Movie Page', {id: item.id})}>
      <View style={styles.card}>
        <Image
          source={{
            uri: `${baseUrlForImage}${item.poster_path}`,
          }}
          style={styles.image}
          alt={item.name}
        />
        <View style={styles.text}>
          <Text style={styles.title}>{item.name || item.title}</Text>
          <Text style={styles.overview}>{item.overview}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardView;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    height: 180,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 1,
  },
  image: {
    width: 120,
    borderRadius: 8,
  },
  text: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  overview: {
    fontSize: 14,
    marginVertical: 5,
    flex: 1,
    flexWrap: 'wrap',
  },
});
