import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDrxgSz9vZcVr5keIoat_iUy8wMhfiMtkI",
  authDomain: "soli-blog.firebaseapp.com",
  projectId: "soli-blog",
  storageBucket: "soli-blog.appspot.com",
  messagingSenderId: "674796399522",
  appId: "1:674796399522:web:12601b65230717a60fe0fb",
  measurementId: "G-BW0Y7S5S4S",
};
firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
