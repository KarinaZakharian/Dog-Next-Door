const { createClient } = require('redis');

// Initialisation du client redis
let redisClient = createClient();
redisClient.connect().catch(console.error);

module.exports = redisClient;