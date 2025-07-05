import {transporter} from "../config/nodemailer.config.js";

const generateOTP=()=>{
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendMailForVerification=async(email)=>{
    try {
        const otp=generateOTP();
        await transporter.sendMail({
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP is ${otp}`,
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export {sendMailForVerification};