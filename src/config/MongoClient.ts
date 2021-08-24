import { Connection, connect, connection } from "mongoose";

export const MongoClient = {
  async connect() {
    if(!connection.readyState){
      return connect(process.env.MONGO_URI || "mongodb://localhost:27017/test-socket", {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    }
  },
  async getConnection(): Promise<Connection> {
    return connection;
  },

  close() {
    return connection.close();
  },
};
