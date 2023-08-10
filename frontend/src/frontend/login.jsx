import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase/firebase";
import './styles/login.css';
import SnackBar from './utils/snackbarNotify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    //storing our input fields data
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate=useNavigate();

    const [showPF, setshowPF] = useState(false);
    const [validEmail, setValidEmail] = useState();
    //error and success messages
    const [msg, setMsg] = useState({
        errorMsg: "",
        success: ""
    });

    const [showSnack, setSnack] = useState(false);

    const emailValidity = () => {
        var emailValid = document.getElementById('email').validity.valid;
        if (!values.email) {
            return setValidEmail(" ")
        }
        if (values.email) {
            setValidEmail(emailValid);
        }
    }

    // Verifying Values of input fields
    const verifyValues = () => {
        var emailValid = document.getElementById('email').validity.valid;
        setValidEmail(emailValid);
        if (!values.email) {
            return setMsg({ errorMsg: "Email is Required" })
        }
        if (!emailValid) {
            return setMsg({ errorMsg: "Email Format is not Valid" })
        }
        return true;
    }

    // handling submit button for Login with Email / Password
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setMsg({ errorMsg: "" });
            const verifiedValues = verifyValues();
            if (!verifiedValues) {
                return;
            }

            if (validEmail === false) {
                setMsg({ errorMsg: "Email Format is not Valid" })
                return setshowPF(false);
            }
            if (showPF === false) {
                if (validEmail === true) {
                    return setshowPF(true);
                }
            }
            if (!values.password) {
                return setMsg({ errorMsg: "Password is Required" })
            }

            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    localStorage.setItem('token', user.accessToken);
                    // setuserId(user.uid);
                    setMsg({ success: "Login Successfully" })
                    setSnack(true);
                    setTimeout(() => {
                        setSnack(false);
                    }, 2000);
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 3000);
                })
                .catch((error) => {
                    const errorMsg = error.message;
                    setMsg({ errorMsg });
                });
            setMsg({ errorMsg: "" });
            
        }
        catch (err) { console.log(err.message) }

    }

    return (
        <div className="mt-2">{showSnack && (
            <SnackBar text="Successfully Login" />
        )}
            <span className="sideIcon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
            </svg></span>
            <input type="email" className="mb-3" id="email" placeholder="Enter Email Address" onChange={(e) => { emailValidity(); setValues((prev) => ({ ...prev, email: e.target.value })) }} required />
            {validEmail === true ? (<span className="verifyIcon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
            </svg></span>) : validEmail === false ? <span className="unverifyIcon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg></span> : ""}
            {showPF === true ?
                <React.Fragment><br />
                    <span className="sideIcon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
                        <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    </svg></span><input type="password" id="password" placeholder="Enter Password" onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))} />
                </React.Fragment> : ""}
            <span className="errorMsg">
                {msg.errorMsg === "Firebase: Error (auth/user-not-found)." ? "User Not Found" : msg.errorMsg === "Firebase: Error (auth/wrong-password)." ? "Invalid Password" : msg.errorMsg === "Firebase: Error (auth/invalid-email)." ? "Invalid Email" : msg.errorMsg}
            </span>
            <span className="successMsg">
                {msg.success ? msg.success : ""}
            </span>
            <button className="btn btn-primary w-100 mt-2" onClick={handleSubmit}>Continue</button>
        </div>
    )
}

export default Login;