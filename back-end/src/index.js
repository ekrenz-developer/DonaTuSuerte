import 'dotenv/config';
import express from 'express';
import setLoaders from './loaders/index';
import config from '../config/index';

const startServer = async () => {
  const server = express();
  const port = process.env.PORT || config.PORT;

  await setLoaders(server);

  server.listen(port, () => {
    console.log('Server is up in port ' + port)
  })
}

startServer();