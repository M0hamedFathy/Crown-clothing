import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3V_QrZdvfK-NpJB5p4zmCj29vMHLheYs",
  authDomain: "crwn-clothing-8258b.firebaseapp.com",
  projectId: "crwn-clothing-8258b",
  storageBucket: "crwn-clothing-8258b.appspot.com",
  messagingSenderId: "890818925799",
  appId: "1:890818925799:web:4e0eff8438a7149b523e42",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Istantiated our fire store
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  // storing the data and checking if this user is already signed
  // the doc takes 3 params first one is the database second one is the collection the last one is the unique id
  const userDocRef = doc(db, "users", userAuth.uid);

  // creating snapshot to check if this user is registered or not
  const userSnapshot = await getDoc(userDocRef);

  // if user data doesn't exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // create and set the document with the data from userAuth in my collection
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
    return userDocRef;
  }

  // return userDocRef
};
