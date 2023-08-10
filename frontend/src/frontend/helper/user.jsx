import { doc, getDoc } from "firebase/firestore";
import jwtDecode from "jwt-decode";
import { db } from "../../firebase/firebase";

const user = localStorage.getItem('token') || localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || localStorage.getItem('token')) : null;
let currentUser;


const getUser = async () => {
    if (user) {
        const docRef = doc(db, "users", user.user_id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            currentUser = docSnap.data();
            return currentUser;
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No User Login First!");
        }
    }
}

export default await getUser();