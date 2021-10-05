import { connect, Mongoose } from 'mongoose';

import { MONGO_DB_URL } from 'src/config';

import cachegoose from 'cachegoose';

let connection: Mongoose;

export const connectMongo = async (): Promise<Mongoose> => {
  connection = connection || (await connect(MONGO_DB_URL));
  cachegoose(connection);
  return connection;
};

export const getMongooseInstance = async (): Promise<Mongoose> => {
  const mongooseInstance = await connect(MONGO_DB_URL);
  cachegoose(mongooseInstance);
  return mongooseInstance;
};
