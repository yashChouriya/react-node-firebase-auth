
import { doc, setDoc } from "firebase/firestore";
import firebase from "../firebase/firebaseGoogle";
import { db } from "../firebase/firebase";

const handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider)
        .then(async (result) => {
            const user = result.user;
            await setDoc(doc(db, "users", user.multiFactor.user.uid), {
                uid: user.multiFactor.user.uid, name: user.multiFactor.user.displayName, email: user.multiFactor.user.email, photoURL: user.multiFactor.user.photoURL
            });
            await setDoc(doc(db, 'userChats', user.multiFactor.user.uid, ),{});

            localStorage.setItem('token',user.multiFactor.user.accessToken);
        })
        .catch((error) => {
            console.error("Google sign-in error:", error);
        });
};

export default handleGoogleSignIn;





