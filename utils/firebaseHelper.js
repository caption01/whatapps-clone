import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCYLTfkrIm07EwrGZ3HG01pjgkB-Vlqg6o',
  authDomain: 'whatsapp-2dd71.firebaseapp.com',
  projectId: 'whatsapp-2dd71',
  storageBucket: 'whatsapp-2dd71.appspot.com',
  messagingSenderId: '228572904204',
  appId: '1:228572904204:web:e61592c663bfa06826e729',
  measurementId: 'G-WP54L1MXJD',
};

export const getFirebaseApp = () => {
  const app = initializeApp(firebaseConfig);

  return app;
};
