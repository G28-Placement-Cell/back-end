const mongoose = require('mongoose');

console.log(process.env.MONGO_URI);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(e)
    {
        console.log(e);
        process.exit(1);
    }
}

module.exports = connectDB;