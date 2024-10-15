const mongoose  = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_nodejs_dev');
        console.log('Connect to MongoDB success');
    } catch (error) {
        console.error('Error when connect to MongoDB:', error);
    }
}

module.exports = { connect }