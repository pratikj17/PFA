import { createClient } from "redis";
import dotenv from 'dotenv';
dotenv.config();

const generateRedisClient=async()=>{
    try {
        const client = await createClient({
            url: process.env.REDIS_DB_URI,
        })
        client.on('error', err => console.log('Redis Client Error', err));
        await client.connect();
        return client;
    } catch (error) {
        console.log('Redis Client Error', error);
    }
}

export default generateRedisClient;