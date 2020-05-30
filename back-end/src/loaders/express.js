import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import error from '../helpers/error';
import setRoutes from '../routes/index';
import middlewares from '../middlewares/index';

const expressLoader = server => {
  //conectamos todos los middleware de terceros
  server.use(cors());
  server.use(helmet());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  setRoutes(server);

  server.use(middlewares.notFoundHandler);

  server.use((err, req, res, next) => {
    error.handleError(err, res);
  });
}

export default expressLoader;