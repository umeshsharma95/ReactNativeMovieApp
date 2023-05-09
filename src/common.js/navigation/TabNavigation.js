import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FindMovies from '../../screens/FindMovies';
import Favorites from '../../screens/Favorites';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from '../../screens/Home';
import Layout from './Layout';
import {HomeStackNavigation} from './StackNavigation';

const Tab = createBottomTabNavigator();

const TabNavigation = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerRight: () => (
          <Pressable
            style={styles.profileIcon}
            onPress={() => {
              navigation.openDrawer();
            }}>
            <MaterialIcons name={'account-circle'} size={30} color={'white'} />
          </Pressable>
        ),
        headerShown: false,
        headerTintColor: 'white',
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          }
          if (route.name === 'Favorites') {
            iconName = focused ? 'favorite' : 'favorite-outline';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          }
          if (route.name === 'Find Movies') {
            iconName = focused ? 'search' : 'search-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home">
        {props => <Layout component={Home} {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Favorites">
        {props => <Layout component={Favorites} {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Find Movies">
        {props => <Layout component={FindMovies} {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
