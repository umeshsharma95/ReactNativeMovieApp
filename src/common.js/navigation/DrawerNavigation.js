import {StyleSheet} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import TabNavigation from './TabNavigation';
import {drawerItems} from '../constants/constant';
import CategoryPage from '../../screens/CategoryPage';
import Layout from './Layout';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name="TabNavigation"
        options={{title: 'Home'}}
        component={TabNavigation}
      />
      {drawerItems.map((item, index) => (
        <Drawer.Screen key={index} name={item.title}>
          {props => <Layout component={CategoryPage} {...props} />}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
