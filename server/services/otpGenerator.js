
// generating OTP 

function otpGenerator(otpDigitCount){
    const digits='0123456789';
    let OTP='';
    for(var i=0;i<otpDigitCount;i++){
        OTP+=digits[Math.floor(Math.random()*10)];
    }
    return OTP;
}

module.exports={otpGenerator};