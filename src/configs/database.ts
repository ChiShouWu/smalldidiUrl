import mongoose from 'mongoose';
import winston from 'winston';

// Build the connection string
const dbURI = process.env.MONGO_URI;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

winston.debug(dbURI);

// Create the database connection
mongoose
  .connect(dbURI!, options)
  .then(() => {
    winston.info('Mongoose connection done');
  })
  .catch((e) => {
    winston.info('Mongoose connection error');
    winston.error(e);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  winston.info(`Mongoose default connection open to ${dbURI}`);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  winston.error(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  winston.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    winston.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
