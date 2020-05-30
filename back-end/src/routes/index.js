const setRoutes = server => {
  server.get('/', (req, res) => {
    res.status(200).send({
      message: 'test ok'
    })
  })
}

export default setRoutes;