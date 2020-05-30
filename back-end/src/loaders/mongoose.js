import mongoose from 'mongoose';
import config from '../config/index';

const mongooseLoader = async () => {
  const url = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}${config.MONGO_URL}`

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