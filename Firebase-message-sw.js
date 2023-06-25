importScripts("https:/www.gstatic.com/firebasejs/3.5.0/firebase-app.js");
importScripts("https:/www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js");

firebase.initializeApp({
   
   messagingSenderId: '342798992970';

});

const initMessaging = firebase.messaging();