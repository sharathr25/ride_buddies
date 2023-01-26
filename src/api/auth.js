import auth from '@react-native-firebase/auth';

let confirm = null;

export const signInWithPhoneNumber = async (phoneNumber) => {
  confirm = await auth().signInWithPhoneNumber(phoneNumber);
};

export const validateOTP = async (code) => {
  await confirm.confirm(code);
  confirm = null;
};

export const subribeToAuthChange = (cb) => auth().onAuthStateChanged(cb);

export const getCurrentUser = () => auth().currentUser;

export const signOut = async () => {
  return await auth().signOut();
};

export const updateProfile = async ({ displayName, photoURL }) => {
  console.log(displayName, photoURL);
  return await auth().currentUser.updateProfile({ displayName, photoURL });
};

export const getIdToken = async () => await auth().currentUser.getIdToken();
