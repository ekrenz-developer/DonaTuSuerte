import expressLoader from './express';
import mongooseLoader from './mongoose';

const setLoaders = async (server) => {
  const mongoConnection = await mongooseLoader();
  await expressLoader(server);
}

export default setLoaders;