import userRouter from './userRouter';

const setRoutes = server => {
  userRouter(server);
  
  server.get('/', (req, res) => {
    res.status(200).send({
      message: 'test ok'
    })
  })
}

export default setRoutes;