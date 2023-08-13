// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA9tiz2410X4r2M0nInzhwyOyZwz4JCvJk',
  authDomain: 'todo-crud-98756.firebaseapp.com',
  projectId: 'todo-crud-98756',
  storageBucket: 'todo-crud-98756.appspot.com',
  messagingSenderId: '756146256724',
  appId: '1:756146256724:web:6ac5d490e80a1c596966c1',
  measurementId: 'G-C47Z0F2MZY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);


export {db};
setPersistence(auth, browserSessionPersistence);
