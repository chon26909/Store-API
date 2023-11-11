import { createClient } from 'redis';
const redisClient = createClient({
    url: process.env.REDIS_HOST,
    database: Number(process.env.REDIS_DATABASE)
});
redisClient.connect();

export default redisClient;
