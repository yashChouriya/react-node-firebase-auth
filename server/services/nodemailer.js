const nodemailer = require('nodemailer');
const {apiKey}=require('../config/sendInBlue.json');
const sendinBlueTransport = require('nodemailer-sendinblue-transport');

// setup nodemailer for sendInBlue

const transporter = nodemailer.createTransport(
    new sendinBlueTransport({
        apiKey: apiKey
    })
);

async function sendEmail(receiver, subject, msg) {
    try {
        const mailOptions = {
            from: 'sonkum236@gmail.com',
            to: receiver,
            subject: subject,
            text: msg
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error('Error sending email: ' + error);
    }
}


module.exports={sendEmail};
