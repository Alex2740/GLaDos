import React from 'react';
import './Header.css';
import * as firebase from 'firebase';
import config from '../config';

class Header extends React.Component {
    constructor() {
        super()
        firebase.initializeApp(config);
    }
    
   signOut() {
       firebase.auth().signOut().then(function () {
           console.log('Signed Out');
       }, function (error) {
           console.error('Sign Out Error', error);
       });
   }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                //var displayName = user.displayName;
                //var email = user.email;
                //var emailVerified = user.emailVerified;
                //var photoURL = user.photoURL;
                //var uid = user.uid;
                //var phoneNumber = user.phoneNumber;
                //var providerData = user.providerData;
                user.getIdToken().then(function (accessToken) {
                    document.getElementById('sign-in-status').textContent = 'Profil';
                    document.getElementById('sign-in').textContent = 'Sign out';
                });
            } else {
                // User is signed out.
                document.getElementById('sign-in-status').textContent = 'Sign up';
                document.getElementById('sign-in').textContent = 'Sign in';
            }
        }, function (error) {
            console.log(error);
        });
    }
    
    render() {
        return (
            <div className="top-bar">
                <div className="container">
                    <div className="top-bar-left">
                        <a href="http://localhost:3000/"><h3>GLaDOS</h3></a>
                    </div>
                    <div className="top-bar-right">
                        <a href="#" id="sign-in-status"></a>
                        <a href="#" onClick={this.signOut} id="sign-in"></a>
                    </div>
                </div>  
            </div>
        )
    }
}

export default Header;