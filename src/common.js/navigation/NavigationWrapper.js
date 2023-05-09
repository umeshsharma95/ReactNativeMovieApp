import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import MoviePage from '../../screens/MoviePage';
import Login from '../../screens/Login';
import PhoneSignIn from '../../screens/PhoneSignIn';

import {Pressable} from 'react-native';
import DrawerComponent from './DrawerNavigation';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home Page">
        {props => <Home {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Movie Page">
        {props => <MoviePage {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Movie Page" component={MoviePage} />
    </Stack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Using Email" component={Login} />
      <Stack.Screen name="Using Mobile Number" component={PhoneSignIn} />
    </Stack.Navigator>
  );
}

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Using Email" component={Login} />
      <Stack.Screen name="Using Mobile Number" component={PhoneSignIn} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  profileIcon: {
    marginRight: 10,
  },
});
