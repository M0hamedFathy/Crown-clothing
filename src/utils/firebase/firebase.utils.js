import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Istantiated our fire store
export const db = getFirestore();

//creating collection and document for the product and upload it
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  //Getting the collection ref
  const collectionRef = collection(db, collectionKey);

  // Creating a transaction
  const batch = writeBatch(db);

  //Creating sets for the transaction
  objectsToAdd.forEach((object) => {
    //getting the collection Ref
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

//getting the data
export const getCategoriesAndDocuments = async () => {
  // getting collection key
  const collectionRef = collection(db, "categories");

  //getting the query with the collectionRef that we got
  const q = query(collectionRef);

  //getting a snapshot from the query
  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
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
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
    // return userDocRef
    return userDocRef;
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
