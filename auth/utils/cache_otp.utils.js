import generateRedisClient from "../config/redis.config.js";
const redisClient=await generateRedisClient();

const cacheOTP=async(key,value)=>{
    try {
        await redisClient.set(key, value,{
            EX: 300
        });
    } catch (error) {
        console.log("Error caching the otp: ",error.message);
    }
}

const verifyOTP=async(key,value)=>{
    try {
        const exists = await redisClient.exists(key);
        // console.log(exists);
        if(exists==0) return -1;
        const dbOTP = await redisClient.get(key)
        // console.log(dbOTP);;
        if(dbOTP==value) return 1;
        return 0;
    } catch (error) {
        console.log("Error while verifying the otp: ",error);
    }
}

export {cacheOTP,verifyOTP};