import 'core-js';
import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'swiper/dist/css/swiper.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import './assets/css/home.css';
import './assets/css/main.css';
import './assets/css/style.css';
// import './assets/css/lineup.css';
// import './index.scss';
import './index.css';





import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ScrollToTop from 'react-router-scroll-top';
import PageRoutes from './pages';
import EmailVerification from './pages/email-verification/EmailVerification';
//import firebase from 'firebase';
// import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyBRyB_WYTeQ1SqAQSzIwgyAk-HEkuImoFo",
//   authDomain: "web-push-21f6b.firebaseapp.com",
//   projectId: "web-push-21f6b",
//   storageBucket: "web-push-21f6b.appspot.com",
//   messagingSenderId: "342798992970",
//   appId: "1:342798992970:web:7e866cd6f20a97b5f6c8b3",
//   measurementId: "G-J62KRZYG26"
// };

//const firebaseApp = initializeApp(firebaseConfig);
//const messaging = getMessaging(firebaseApp);

const Index = (props) => {

   useEffect( ()=>{
      console.log('hello')
     
   })
 

    return(
        <BrowserRouter>
            <ScrollToTop>
                <Switch>
                    <Route path="/emailvarification/:key" component={EmailVerification} />
                    <Route path="/" component={PageRoutes} />
                    <Redirect to='/' />
                </Switch>
            </ScrollToTop>
        </BrowserRouter>
    

);
}

const wrapper = document.getElementById("index");
wrapper ? ReactDOM.render(<Index />, wrapper) : false;