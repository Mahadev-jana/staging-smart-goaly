import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBRyB_WYTeQ1SqAQSzIwgyAk-HEkuImoFo",
  authDomain: "web-push-21f6b.firebaseapp.com",
  projectId: "web-push-21f6b",
  storageBucket: "web-push-21f6b.appspot.com",
  messagingSenderId: "342798992970",
  appId: "1:342798992970:web:7e866cd6f20a97b5f6c8b3",
  measurementId: "G-J62KRZYG26"
};

firebase.initializeApp(config);

export default firebase;