import { createClient } from "redis";
const redisClient = createClient({
  database: 1,
});
redisClient.connect();

export default redisClient;
