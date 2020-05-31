import StoreController from '../controllers/StoreController';
import middlewares from '../middlewares/index';

const storeRouter = server => {
  server.get(
    '/api/v1/stores/:_id',
    middlewares.Auth.isAuth,
    middlewares.Role.isOrganization,
    StoreController.get
  );
  server.post(
    '/api/v1/organizations/:_id/stores',
    middlewares.Auth.isAuth,
    middlewares.Role.isOrganization,
    StoreController.insert
  );
  server.put(
    '/api/v1/stores/:_id',
    middlewares.Auth.isAuth,
    middlewares.Role.isOrganization,
    StoreController.update
  );
  server.delete(
    '/api/v1/organizations/:idOrg/stores/:_id',
    middlewares.Auth.isAuth,
    middlewares.Role.isOrganization,
    StoreController.delete
  );
}

export default storeRouter;