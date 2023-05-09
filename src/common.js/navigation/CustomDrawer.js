import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {signOut} from '../../utils/Authentication';
import {useNavigation} from '@react-navigation/native';

const CustomDrawer = props => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      {props.user ? (
        <View style={styles.headerBox}>
          <Image
            source={{
              uri: 'https://raw.githubusercontent.com/itzpradip/react-navigation-v6-mix/master/src/assets/images/user-profile.jpg',
            }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {props?.user?.displayName}
          </Text>
        </View>
      ) : (
        <View style={styles.headerBox}>
          <Image
            source={{
              uri: 'https://raw.githubusercontent.com/itzpradip/react-navigation-v6-mix/master/src/assets/images/user-profile.jpg',
            }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signIn}>Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
      <DrawerContentScrollView {...props}>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        {props.user && (
          <TouchableOpacity onPress={signOut} style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="exit-outline" size={22} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                }}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  headerBox: {
    height: 180,
    padding: 20,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  signIn: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5D9C59',
    padding: 8,
    margin: 8,
    borderRadius: 8,
  },
});
