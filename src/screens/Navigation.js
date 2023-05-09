import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navigation = () => {
  const [notifications, setNotifications] = useState();

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    let data = await AsyncStorage.getItem('notifications');
    if (data) {
      setNotifications(JSON.parse(data));
    }
  };

  const CardData = ({notification}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.body}>{notification.body}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={notifications}
        renderItem={({item}) => <CardData {...item} />}
      />
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    height: 100,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 1,
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    color: '#000',
  },
});
