import auth from '@react-native-firebase/auth';

const createUserAccount = async (email, password) => {
  return await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log('User account created & signed in!');
      return res;
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};

const signInUser = async (email, password) => {
  return await auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('User signed in!');
      return res;
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        console.log('There is no user record corresponding to this email.');
      }
      if (error.code === 'auth/wrong-password') {
        console.log(
          'The password is invalid or the user does not have a password',
        );
      }
      console.error(error);
    });
};

const signOut = async () => {
  await auth()
    .signOut()
    .then(() => console.log('User signed out!'))
    .catch(error => {
      if (error.code === 'auth/no-current-user') {
        console.log('No user currently signed in');
      }
      console.error(error);
    });
};

export {createUserAccount, signInUser, signOut};
