import mongoose from 'mongoose';
import config from './config.js';

const connectDB = () => {
    mongoose.connect(config.ATLAS_DB, { useNewUrlParser: true, useUnifiedTopology: true });

    const mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
    mongodb.once('open', () => {
        console.log("Connection successful");
    });

    return mongodb;
};

export default connectDB;
