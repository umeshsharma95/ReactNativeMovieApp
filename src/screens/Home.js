import React from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import RowList from '../components/RowList';
import requestsData from '../services/request';

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#222" />
      <FlatList
        data={requestsData}
        renderItem={({item}) => <RowList {...item} />}
        keyExtractor={(item, index) => item.title + index}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    padding: 2,
    paddingBottom: 120,
  },
  button: {
    margin: 20,
  },
});
