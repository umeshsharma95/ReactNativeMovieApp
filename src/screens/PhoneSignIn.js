import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import OTPInput from '../components/OTPInput';

function PhoneSignIn() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [isPinReady, setIsPinReady] = useState(false);
  const [state, setState] = useState({
    mobile: '',
    code: '',
  });

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode(code) {
    try {
      confirm.confirm(code).then(() => {
        console.log('User signed in using mobile number!');
        setConfirm(null);
      });
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const handlePress = () => {
    const {code, mobile} = state;
    if (confirm) {
      confirmCode(code);
    } else {
      signInWithPhoneNumber(`+91 ${mobile}`);
    }
  };

  const handleChange = (key, value) => {
    setState(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const disableButton = confirm ? !isPinReady : state.mobile.length !== 10;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mobile Login</Text>
      {!confirm ? (
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={text => handleChange('mobile', text)}
          value={state.mobile}
          placeholder="Enter Mobile Number"
        />
      ) : (
        <OTPInput
          code={state.code}
          setCode={text => handleChange('code', text)}
          maximumLength={6}
          setIsPinReady={setIsPinReady}
        />
      )}
      <TouchableOpacity
        style={[styles.button, disableButton && styles.buttonDisabled]}
        disabled={disableButton}
        onPress={handlePress}>
        <Text style={styles.buttonText}>
          {confirm ? 'Confirm Code' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default PhoneSignIn;

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
    backgroundColor: '#5D9C59',
    padding: 10,
    margin: 12,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
  },
});
