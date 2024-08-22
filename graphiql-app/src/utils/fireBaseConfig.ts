import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBdhSVKREBwBFiKGlYru3lFfTNiIpQk_No',
  authDomain: 'graphql-app-def25.firebaseapp.com',
  projectId: 'graphql-app-def25',
  storageBucket: 'graphql-app-def25.appspot.com',
  messagingSenderId: '527403987600',
  appId: '1:527403987600:web:dacee03c7f77465b829e15',
  measurementId: 'G-3WJGXLXPZZ',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
