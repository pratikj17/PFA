import generateRedisClient from "../config/redis.config.js";

const cacheOTP=async(key,value)=>{
    try {
        const redisClient=await generateRedisClient();
        await redisClient.set(key, value,{
            EX: 300
        });
    } catch (error) {
        console.log("Error caching the otp: ",error.message);
    }
}

export default cacheOTP;