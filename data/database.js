import { MongoClient } from 'mongodb';

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb://${dbUser}:${dbPassword}@${clusterAddress}/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { connectTimeoutMS: 60000 });

console.log('Trying to connect to db');

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log('Connected successfully to server');
} catch (error) {
  console.log('Connection failed.');
  await client.close();
  console.log('Connection closed.');
  throw new Error(error.message);
}

const database = client.db(dbName);

export default database;
