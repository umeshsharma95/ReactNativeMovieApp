import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoviePage from '../../screens/MoviePage';
import DrawerNavigation from './DrawerNavigation';
import Login from '../../screens/Login';
import PhoneSignIn from '../../screens/PhoneSignIn';
import Navigation from '../../screens/Navigation';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" options={{headerShown: false}}>
        {props => <DrawerNavigation {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Movie Page">
        {props => <MoviePage {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Login">{props => <Login {...props} />}</Stack.Screen>
      <Stack.Screen name="Notification">
        {props => <Navigation {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigation;
