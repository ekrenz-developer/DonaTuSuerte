import userRouter from './userRouter';
import roleRouter from './roleRouter';
import organizationRouter from './organizationRouter';
import storeRouter from './storeRouter';
import drawRouter from './drawRouter';

const setRoutes = server => {
  userRouter(server);
  roleRouter(server);
  organizationRouter(server);
  storeRouter(server);
  drawRouter(server);

  server.get('/', (req, res) => {
    res.status(200).send({
      message: 'test ok'
    })
  })
}

export default setRoutes;