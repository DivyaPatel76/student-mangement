const mongoose = require('mongoose');

const mongo_url =  process.env.MONGODB_URI || 'mongodb://localhost:27017/USER'; 

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })