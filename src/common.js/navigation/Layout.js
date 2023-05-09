import {View, Text} from 'react-native';
import React from 'react';
import Header from './Header';

const Layout = ({component: Component, ...restProps}) => {

  return (
    <View>
      <Header {...restProps} />
      <Component {...restProps} />
    </View>
  );
};

export default Layout;
