import React, {useRef, useState, useEffect} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

const OTPInput = ({code, setCode, maximumLength, setIsPinReady}) => {
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef();

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = event => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maximumLength);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);
  
  const boxDigit = (_, index) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    return (
      <View
        style={[
          styles.splitBoxes,
          isInputBoxFocused && isValueFocused && styles.splitBoxesFocused,
        ]}
        key={index}>
        <Text style={styles.splitBoxText}>{digit}</Text>
      </View>
    );
  };

  return (
    <View style={styles.otpContainer}>
      <Pressable style={styles.splitOTPContainer} onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        style={styles.textInputHidden}
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        keyboardType="numeric"
        ref={inputRef}
        caretHidden={true}
        selectTextOnFocus={false}
        selection={{start: code.length, end: code.length}}
        onBlur={handleOnBlur}
      />
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  otpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  splitOTPContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInputHidden: {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
  },
  splitBoxText: {
    fontSize: 20,
    textAlign: 'center',
  },
  splitBoxes: {
    borderColor: '#e5e5e5',
    borderWidth: 2,
    borderRadius: 5,
    padding: 12,
    minWidth: 50,
    margin: 5,
  },
  splitBoxesFocused: {
    borderColor: '#5D9C59',
  },
});
