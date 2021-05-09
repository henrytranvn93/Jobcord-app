import React, { useState, useEffect} from 'react';
import './LoginPage.scss';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import logo from '../../assets/logo/logo-jobcord.png';
import firebase from 'firebase';
import "firebase/storage";
import { StyledFirebaseAuth } from 'react-firebaseui';
import Dashboard from '../Dashboard/Dashboard';

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
});

export const storage = firebase.storage();

export default function LoginPage({getUserUID, docID, setDocID}) {
    const [loading, setLoading] = useState(true);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2200);
    })

    const db = firebase.firestore();

    useEffect(() => {
        const unregisterAuthObeserver = firebase.auth().onAuthStateChanged(user => {
            setSignedIn(!!user);
            if(!!user) { 
                db.collection('users').doc(user.uid).set({name: user.displayName});
                getUserUID(firebase.auth().currentUser.uid);
            }
        });
        return () => unregisterAuthObeserver();
    });

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    }

    const signOut = () => {
        firebase.auth().signOut();
        setDocID('');
    }
    

    return ( signedIn ? <Dashboard user={firebase.auth().currentUser} signOut={signOut} docID={docID} setDocID={setDocID}/> :
        <>
        {loading === false 
        ? <div className="login">
            <div className="login__logo-container">
                <img src={logo} alt="Jobcord logo" className="login__logo"/>
            </div>
            <div className="login__methods">
                <h3 className="login__title">Log In</h3>
                <p className="login__texts">Login with social networks</p>
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
          </div> 
        : <LoadingScreen/>}
        </>
    )
}
