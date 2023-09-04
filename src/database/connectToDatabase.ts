import mongoose from "mongoose";

const connectToDatabase = async (MongoDbUrl: string) => {
  await mongoose.connect(MongoDbUrl);
};

export default connectToDatabase;
