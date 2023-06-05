import React, { useState } from 'react';
import axios from 'axios';
import './styles/signup.css';

const SignUp = () => {

    const [values, setValues] = useState({
        email: '',
        name: '',
        password: ''
    });

    const [msg, setMsg] = useState({
        error: "",
        success: ""
    })

    const validateValues = () => {
        const { email, name, password } = values;
        let emailValid = document.getElementById('email').validity.valid;
        if (!email&&!name&&!password) {
            return setMsg({ error: "Fill All Details" })
        }
        if (!email) {
            return setMsg({ error: "Email is Required" })
        }
        if (!emailValid) {
            return setMsg({ error: "Email Format is not Valid" })
        }
        if (!name) {
            return setMsg({ error: "Name is Required" })
        }
        if (!password) {
            return setMsg({ error: "Password is Required" })
        }
        return true;
    }

    const handleSignup = async () => {
        const validValues = validateValues();
        if (!validValues) {
            return;
        }

        const {data:verified}=await axios.get('http://localhost:8001/signup/checkEmail/'+values.email);
        if(verified){
            return setMsg({error:"Email Already Exists"})
        }
        
        await axios.post('http://localhost:8001/signup', values);
        const otp={
            otp:parseInt(prompt("Enter The Verification OTP send to Your Mail ID"))
        }
        if(!otp.otp){
            return setMsg({error:"Enter OTP to Continue."})
        }
        if(otp){
            const response=await axios.post('http://localhost:8001/signup/verifyOtp',otp);
            if(response.data==="Invalid OTP"){
                return setMsg({error:"Invalid OTP Entered."})
            }else if(response.data===true){
                sessionStorage.setItem('token',response.headers['x-auth-token']);
                return setMsg({success:"Successfully Sign Up"});
            }else{
                 setMsg({error:response})
            }
        }
    }

    return (
        <div className="mt-2">
            <span className="sideIcon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
                </span><input type="text" className="mb-2" id="name" placeholder="Enter Username" onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))} /><br />

            <span className="sideIcon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
            </svg></span><input type="Email" className="mb-2" id="email" placeholder="Enter Email Address" onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))} required /><br />

            <span className="sideIcon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg></span><input type="password" id="password" placeholder="Enter Password" onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))} required />

            <span className="errorMsg">
                {msg.error ? msg.error : ""}
            </span>
            <span className="successMsg">
                {msg.success ? msg.success : ""}
            </span>
            <button className="btn btn-primary w-100 mt-2" onClick={handleSignup}>Sign Up</button>
          </div>
    )
}

export default SignUp;