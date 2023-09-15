import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAc_mOVZBUcug2U3s9eA03qiQZzBTmZl8U",
  authDomain: "react-notes-7b65b.firebaseapp.com",
  projectId: "react-notes-7b65b",
  storageBucket: "react-notes-7b65b.appspot.com",
  messagingSenderId: "785307052340",
  appId: "1:785307052340:web:6087b8b1e9adcde2cc1d61"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const notesCollection = collection(db, "notes")
