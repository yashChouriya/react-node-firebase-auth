
import firebase from "../firebase/firebaseFacebook";

const handleFacebookSignIn = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    
    await firebase.auth().signInWithPopup(provider)
        .then(async (result) => {
            const user = result.user;
            sessionStorage.setItem('token',user.multiFactor.user.accessToken);
        })
        .catch((error) => {
            console.error("Facebook sign in error :", error);
        });
};

export default handleFacebookSignIn;





