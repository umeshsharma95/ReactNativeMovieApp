import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const Header = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <Pressable
        style={styles.profileIcon}
        onPress={() => {
          props.navigation.openDrawer();
        }}>
        <MaterialIcons name={'menu'} size={30} color={'white'} />
      </Pressable>
      <Text style={styles.title}>{props?.route?.name}</Text>
      <Pressable
        style={styles.profileIcon}
        onPress={() => {
          navigation.navigate('Notification');
        }}>
        <MaterialIcons name={'notifications'} size={25} color={'white'} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 2,
  },
  profileIcon: {},
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
});
