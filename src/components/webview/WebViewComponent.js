import {
  BackHandler,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {WebView} from 'react-native-webview';
import {html} from './htmlFile.js';

const WebViewComponent = () => {
  const webViewRef = useRef(null);
  const handleWebViewNavigationStateChange = newNavState => {
    console.log('newNavState', newNavState);
  };

  const runFirst = `
      document.getElementById("button2").addEventListener("click", function () {
        window.ReactNativeWebView.postMessage('Hello From External Event!')
        window.ReactNativeWebView.reload()
      });
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onAndroidBackPress,
        );
      };
    }
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        // source={{uri: 'file:///android_asset/index.html'}}
        source={{html: html}}
        // source={{uri: 'https://google.com'}}
        onShouldStartLoadWithRequest={request => {
          // Only allow navigating within this website
          return request.url.includes('https://');
        }}
        style={styles.webView}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        onMessage={event => {
          console.log('event', event);
        }}
        injectedJavaScript={runFirst}
        geolocationEnabled={true}
        onError={console.log}
        useWebView2={true}
      />
    </View>
  );
};

export default WebViewComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
