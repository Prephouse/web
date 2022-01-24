import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'prephouse-auth.firebaseapp.com',
  projectId: 'prephouse-auth',
  storageBucket: 'prephouse-auth.appspot.com',
  messagingSenderId: '724633304155',
  appId: '1:724633304155:web:d8f8de472239fd6180937e',
  measurementId: 'G-QDWNNJCXWP',
};

export default function initializeFirebase() {
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
}
