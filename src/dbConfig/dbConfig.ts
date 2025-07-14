import mongoose from 'mongoose';

// Track connection status
let isConnected = false;

const connect = async () => {
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is not defined in environment variables');
        throw new Error('MONGO_URI is not defined');
    }

    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error: ' + err);
            isConnected = false;
        });

        connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            isConnected = false;
        });

        console.log('MongoDB connection state:', mongoose.connection.readyState);
        return connection;

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        isConnected = false;
        throw error;
    }
};

// Function to check connection status
export const checkConnection = () => {
    return {
        isConnected,
        readyState: mongoose.connection.readyState
    };
};

export default connect;