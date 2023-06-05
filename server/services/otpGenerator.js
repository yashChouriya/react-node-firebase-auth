
const totp=require('totp-generator');
// generating OTP 

function otpGenerator(otpDigitCount){
    const otp = totp("JBSWY3DPEHPK3PXP", {
        digits: otpDigitCount,
        algorithm: "SHA-512",
        period: 30,
    });
    
    return otp;

}

module.exports={otpGenerator};