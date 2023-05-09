function handleClick() {
  setTimeout(function () {
    window.ReactNativeWebView.postMessage('Hello!');
  }, 2000);
}
