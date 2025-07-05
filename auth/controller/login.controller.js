import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const handleLogin=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const targetUser=await User.findOne({username: username});
        if(!targetUser) return res.status(404).json({error: "No user found with the requested username"});
        const passwordMatch=await bcrypt.compare(password,targetUser.password);
        if(passwordMatch) return res.json({message: "login successful!"});
        return res.json({error: "password didn't match!"});
    } catch (error) {
        return res.json({error: error.message});
    }
}

export {handleLogin};