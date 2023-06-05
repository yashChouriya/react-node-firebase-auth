
import firebase from "../firebase/firebaseGoogle";

const handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider)
        .then(async (result) => {
            const user = result.user;
            sessionStorage.setItem('token',user.multiFactor.user.accessToken);
        })
        .catch((error) => {
            console.error("Google sign-in error:", error);
        });
};

export default handleGoogleSignIn;





