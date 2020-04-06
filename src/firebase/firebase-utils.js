import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBmEZ-nAV5qOKorWonBbiJ6XXdMP0U18oQ",
    authDomain: "clotingstore-db.firebaseapp.com",
    databaseURL: "https://clotingstore-db.firebaseio.com",
    projectId: "clotingstore-db",
    storageBucket: "clotingstore-db.appspot.com",
    messagingSenderId: "865355537267",
    appId: "1:865355537267:web:b4a98b7d17bfadf106c306",
    measurementId: "G-B7QNQXNCV5"
}

firebase.initializeApp(config);

// Store the authenticated user to our Database
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth)
        return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;