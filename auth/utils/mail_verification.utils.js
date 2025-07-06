import {transporter} from "../config/nodemailer.config.js";
import {cacheOTP} from "./cache_otp.utils.js";

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
        await cacheOTP(email,otp);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export {sendMailForVerification};