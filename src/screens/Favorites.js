import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardView from '../components/CardView';
import { useSelector } from 'react-redux';

const Favorites = () => {
  const favoriteList = useSelector(state => state?.favoriteList || [])

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteList}
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
