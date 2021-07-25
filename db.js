import mongoose from 'mongoose';

let dbURI = 'mongodb://localhost:27017/msgs_db';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', (err) =>{
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () =>{
    console.log('Mongoose disconnected');
});

import './models/message-schema.js';
import './models/user-schema.js';
import './models/labs-schema.js';
