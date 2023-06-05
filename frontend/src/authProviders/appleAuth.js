
import firebase from "../firebase/firebaseApple";

const handleAppleSignIn = async () => {
    const provider = new firebase.auth.OAuthProvider('apple.com');

    try {
        await firebase.auth().signInWithPopup(provider)
            .then(async (result) => {
                const user = result.user;
                console.log(user.multiFactor.user.accessToken);
            })
            .catch((error) => {
                console.error("Apple sign in error :", error);
            });
        // The user has been signed in with Apple

    } catch (error) {
        // Handle the error
        console.log(error);
    }
};

export default handleAppleSignIn;





