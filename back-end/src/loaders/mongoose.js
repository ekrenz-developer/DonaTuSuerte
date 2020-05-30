import mongoose from 'mongoose';

const mongooseLoader = async () => {
  const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.MONGO_URL}`

  try {
    const connection = await mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    return connection.connection.db;
  } catch (err) {
    console.log(err.reason);
    process.exit(0);
  }
}

export default mongooseLoader;