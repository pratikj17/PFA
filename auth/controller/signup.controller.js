import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { sendMailForVerification } from "../utils/mail_verification.utils.js";

const handleSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // Check if user already exists
        const existingUserByUsername = await User.findOne({ username });
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByUsername || existingUserByEmail) {
            return res.status(409).json({ error: "User already exists" });
        }
        const mailSent=await sendMailForVerification(email);
        if(mailSent) console.log("mail sent to: ",email);
        else return res.status(400).json({error:"Error in sending verification mail ensure the entered mail is correct!"});
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        if(newUser) res.status(201).json({ message: "User signed up successfully", user: newUser });
        else res.status(500).json({message:"db error, maybe try again"});
    } catch (error) {
        res.status(500).json({ error: `An error occurred during signup,${error.message}` });
    }
}

export { handleSignup };