import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {checkAndroidPermission} from './src/utils/Permissions';
import {
  notificationServices,
  requestUserPermission,
} from './src/utils/PushNotifications';
import {crashApp, crashlyticsLog, onSignIn} from './src/utils/Crashlytics';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './src/common.js/navigation/DrawerNavigation';
import StackNavigation from './src/common.js/navigation/StackNavigation';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [deepLinkId, setDeepLinkId] = useState();

  useEffect(() => {
    crashlyticsLog('App mounted');
    onSignIn({
      uid: 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9',
      username: 'Joaquin Phoenix',
      email: 'phoenix@example.com',
      credits: 42,
    });
    // push notifications
    checkAndroidPermission();
    requestUserPermission();
    notificationServices();

    // check user is logged in or not
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleDynamicLinks = async link => {
    console.log('Foreground link handling:', link);
    let productId = link.url.split('=').pop();
    console.log('productId:', productId);
    setDeepLinkId(productId);
  };
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLinks);
    return () => unsubscribe();
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
    console.log('user', user);
    if (initializing) {
      setInitializing(false);
    }
  }

  return (
    <NavigationContainer>
      <StackNavigation user={user} />
    </NavigationContainer>
  );
};

export default App;
