const http=require('http')
const dotenv = require('dotenv');
dotenv.config();
const port=process.env.PORT || 4000
const app=require('./app');
const server=http.createServer(app)
console.log(`Running on Port ${port}`);
server.listen(port)