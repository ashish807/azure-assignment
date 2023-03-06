const mongoose = require('mongoose');

module.exports = (DATABASE_KEY)=>{

    mongoose.set('strictQuery', false);
    mongoose.connect(DATABASE_KEY, { useNewUrlParser: true, useUnifiedTopology: true });

    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("DATABASE CONNECTED");
    });
}