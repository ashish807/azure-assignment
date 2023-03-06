const mongoose = require('mongoose');


const demoSchema = mongoose.Schema({
    Name: { type: String, required: true },
});
module.exports = mongoose.model('demo', demoSchema);