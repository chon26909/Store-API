import { createClient } from 'redis';
const redisClient = createClient({
    database: 0
});
redisClient.connect();

export default redisClient;
