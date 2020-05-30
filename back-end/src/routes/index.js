import userRouter from './userRouter';
import roleRouter from './roleRouter';

const setRoutes = server => {
  userRouter(server);
  roleRouter(server);

  server.get('/', (req, res) => {
    res.status(200).send({
      message: 'test ok'
    })
  })
}

export default setRoutes;