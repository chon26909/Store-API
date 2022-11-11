import { createClient } from 'redis';
const redisClient = createClient({
    url: '192.168.1.150',
    database: 0
});
redisClient.connect();

export default redisClient;
