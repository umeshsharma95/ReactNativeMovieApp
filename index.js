/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import 'react-native-gesture-handler';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  let notifications = await AsyncStorage.getItem('notifications');
  notifications = notifications ? JSON.parse(notifications) : notifications;
  console.log('Message handled in the background!', remoteMessage);
  let data = notifications
    ? [...notifications, remoteMessage]
    : [remoteMessage];
  data = JSON.stringify(data);
  await AsyncStorage.setItem('notifications', data);
});

AppRegistry.registerComponent(appName, () => App);
