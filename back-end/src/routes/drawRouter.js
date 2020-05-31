import DrawController from '../controllers/DrawController';
import middlewares from '../middlewares/index';

const drawRouter = server => {
  server.get(
    '/api/v1/draws',
    middlewares.Auth.isAuth,
    DrawController.getAll
  );
  server.get(
    '/api/v1/draws/:_id',
    middlewares.Auth.isAuth,
    DrawController.get
  );
  server.post(
    '/api/v1/stores/:idStore/draws',
    middlewares.uploadMemory.single('photo'),
    middlewares.Auth.isAuth,
    middlewares.Role.isOrganization,
    DrawController.insert
  );
  server.put(
    '/api/v1/draws/:_id',
    middlewares.uploadMemory.single('photo'),
    middlewares.Auth.isAuth,
    middlewares.Role.isOrganization,
    DrawController.update
  );
  server.delete(
    '/api/v1/stores/:idStore/draws/:_id',
    middlewares.Auth.isAuth,
    DrawController.delete
  );
  server.post(
    '/api/v1/draws/:_id/enter',
    middlewares.Auth.isAuth,
    middlewares.Role.isCompetitor,
    DrawController.enter
  );
  server.post(
    '/api/v1/draws/:_id/run',
    middlewares.Auth.isAuth,
    middlewares.Role.isOrganization,
    DrawController.run
  );
}

export default drawRouter;