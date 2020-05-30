import RoleController from '../controllers/RoleController';

const roleRouter = server => {
  server.get(
    '/api/v1/roles',
    RoleController.getAll
  );
}

export default roleRouter;