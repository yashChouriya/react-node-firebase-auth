const { firebase } = require('../services/firebase');
const { generateToken,verifyToken } = require('../services/authToken');
const { otpGenerator } = require('../services/otpGenerator');
const { sendEmail } = require('../services/nodemailer');

let OTP, user;

// funciton to send user otp for verification
async function addUser(req, res) {
  try {
    const { name, email, password } = req.body;
    OTP = parseInt(otpGenerator(6));
    user = {
      name: name,
      email: email,
      password: password
    }
    const emailSubject = 'OTP for Verification';
    const emailMsg = `Your Verification Otp is ${OTP}`;
    sendEmail(email, emailSubject, emailMsg);
    res.send("Email is send for Verification");
    
  }
  catch (err) {
    res.send(err.message);
  }
}

// function to add user by verify otp

async function verifyOtp(req, res) {
  try {
    const { otp } = req.body;
    if (otp !== OTP) {
      OTP="";
      return res.send("Invalid OTP");
    }
    if(otp===OTP){
      const userResponse = await firebase.auth().createUser({
        displayName: user.name,
        name:user.name,
        email: user.email,
        password: user.password,
        emailVerified: false,
        disabled: false
      });
      const token = generateToken(userResponse);
      res.header('x-auth-token', token).send(true);
      OTP = "";
    }
  }
  catch (err) {
    res.send(err.message);
  }
}

// function to get auth token user

async function getMe(req, res) {
  try {
    const token=req.headers['x-auth-token'];
    const decode=verifyToken(token);
    if(decode){
      await firebase.auth().getUser(decode.uid)
        .then(() => {res.send(decode) })
        .catch(err => res.send(err.message));
        console.log(decode);
    }
    else{
      res.send("Token is Invalid or not Found")
    }
  }
  catch (err) { res.send(err.message) }
}

// function to get a user by id in params

async function getUser(req, res) {
  try {
    await firebase.auth().getUser(req.params.id)
      .then((user) => {res.send(user) })
      .catch(err => res.send(err.message));
  }
  catch (err) { res.send(err.message) }
}

// function to update user details by id in params

async function updateUser(req, res) {
  try {
    await firebase.auth().updateUser(req.params.id, {
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      displayName: req.body.name,
    })
      .then(() => { res.send("User Updated Successfully") })
      .catch(err => res.send(err.message));
  }
  catch (err) { res.send(err.message) }
}

//function to delete a user by id in params 

async function deleteUser(req, res) {
  try {
    await firebase.auth().deleteUser(req.params.id)
      .then(() => { res.send("User Deleted Successfully") })
      .catch(err => res.send(err.message));
  }
  catch (err) { res.send(err.message) }
}

async function checkEmail(req,res){
  try {
    await firebase.auth().getUserByEmail(req.params.email)
      .then(() => res.send(true) )
      .catch(err => res.send(false));
  }
  catch (err) { res.send(err.message) }
}


//exporting all functions

module.exports = { addUser,verifyOtp,checkEmail, getUser,getMe,updateUser,deleteUser };