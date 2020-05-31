import OrganizationController from '../controllers/OrganizationController';
import middlewares from '../middlewares/index';

const organizationRouter = server => {
  server.get(
    '/api/v1/organizations/:_id',
    middlewares.Auth.isAuth,
    OrganizationController.get
  );
  server.post(
    '/api/v1/organizations',
    middlewares.Auth.isAuth,
    middlewares.Role.isOrganization,
    OrganizationController.insert
  );
  server.put(
    '/api/v1/organizations/:_id',
    middlewares.Auth.isAuth,
    middlewares.Role.isOrganization,
    OrganizationController.update
  );
  server.delete(
    '/api/v1/organizations/:_id',
    middlewares.Auth.isAuth,
    middlewares.Role.isOrganization,
    OrganizationController.delete
  );
}

export default organizationRouter;