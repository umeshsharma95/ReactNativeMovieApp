import crashlytics from '@react-native-firebase/crashlytics';

const onSignIn = async user => {
  crashlytics().log('User signed in.');
  await Promise.all([
    crashlytics().setUserId(user.uid),
    crashlytics().setAttribute('credits', String(user.credits)),
    crashlytics().setAttributes({
      role: 'user',
      email: user.email,
      username: user.username,
    }),
  ]);
};

const recordError = error => crashlytics().recordError(error);
const crashlyticsLog = data => {
  console.log('crashlyticsLog', data);
  crashlytics().log(data);
};
const crashApp = () => crashlytics().crash();

export {onSignIn, recordError, crashlyticsLog, crashApp};
