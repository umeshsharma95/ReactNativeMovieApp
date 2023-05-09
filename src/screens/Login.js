import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {createUserAccount, signInUser} from '../utils/Authentication';

const Login = ({navigation}) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    formType: 'sign_in',
  });

  const handleChange = (key, value) => {
    setState(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePress = async () => {
    try {
      const {email, password, name, formType} = state;
      if (formType === 'sign_up') {
        const res = await createUserAccount(email, password);
        console.log('sign_up', res);
        res?.user
          ?.updateProfile({
            displayName: name,
          })
          .then(result => {
            if (result) {
              navigation.navigate('Home');
            }
          });
      } else {
        const res = await signInUser(email, password);
        if (res) {
          navigation.navigate('Home');
        }
        console.log('sign_in', res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {state.formType === 'sign_in' ? 'Login' : 'Create Account'}
      </Text>
      {state.formType === 'sign_up' && (
        <TextInput
          style={styles.input}
          onChangeText={text => handleChange('name', text)}
          value={state.name}
          placeholder="Enter Name"
        />
      )}
      <TextInput
        style={styles.input}
        onChangeText={text => handleChange('email', text)}
        value={state.email}
        placeholder="Enter Email Id"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => handleChange('password', text)}
        value={state.password}
        placeholder="Enter Password"
      />
      <TouchableOpacity
        style={[styles.button, styles.activeButton]}
        onPress={handlePress}>
        <Text style={styles.buttonText}>
          {state.formType === 'sign_in' ? 'Sign In' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Or</Text>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() =>
          handleChange(
            'formType',
            state.formType === 'sign_up' ? 'sign_in' : 'sign_up',
          )
        }>
        <Text style={styles.buttonText}>
          {state.formType === 'sign_up' ? 'Sign In' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  heading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 50,
    marginBottom: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    margin: 12,
  },
  buttonText: {
    color: '#fff',
  },
  activeButton: {
    backgroundColor: '#5D9C59',
    color: '#fff',
  },
  orText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
