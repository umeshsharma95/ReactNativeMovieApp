import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
};

const getFCMToken = async () => {
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('old fcmToken: ', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      console.log('new generated fcmToken: ', fcmToken);
      await AsyncStorage.setItem('fcmToken', fcmToken);
    } catch (error) {
      console.log(error);
    }
  }
};

const notificationServices = async () => {
  let notifications = await AsyncStorage.getItem('notifications');
  notifications = notifications ? JSON.parse(notifications) : notifications;
  console.log('notifications', notifications);
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    let data = notifications
      ? [...notifications, remoteMessage]
      : [remoteMessage];
    data = JSON.stringify(data);
    await AsyncStorage.setItem('notifications', data);
  });

  // Foreground Notification handling
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground Notification', remoteMessage);
    let data = notifications
      ? [...notifications, remoteMessage]
      : [remoteMessage];
    data = JSON.stringify(data);
    await AsyncStorage.setItem('notifications', data);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        let data = notifications
          ? [...notifications, remoteMessage]
          : [remoteMessage];
        data = JSON.stringify(data);
        await AsyncStorage.setItem('notifications', data);
      }
    });
};

export {requestUserPermission, notificationServices};
