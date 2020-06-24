import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBO23FCAsUDLyKI6RMZdmrvNTca0K58Pkw",
  authDomain: "ulwanshop-db.firebaseapp.com",
  databaseURL: "https://ulwanshop-db.firebaseio.com",
  projectId: "ulwanshop-db",
  storageBucket: "ulwanshop-db.appspot.com",
  messagingSenderId: "553994643366",
  appId: "1:553994643366:web:143eb02cef73d33a109167",
  measurementId: "G-T8BP542M89"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
