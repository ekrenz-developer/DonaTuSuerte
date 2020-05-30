import UserController from '../controllers/UserController';
import middlewares from '../middlewares/index';

const userRouter = server => {
  server.get(
    '/api/v1/users',
    middlewares.Auth.isAuth,
    UserController.getUser
  );
  server.post(
    '/api/v1/users/sign-in',
    UserController.signIn
  );
  server.post(
    '/api/v1/users/sign-up',
    middlewares.uploadMemory.single('photo'),
    UserController.signUp
  );
}

/*
router.post(
  '/v1/users/login',
  //middlewares.validation.userValidationRules(),
  //middlewares.validation.validate,
  userController.login
);
router.post(
  '/v1/users/register',
  middlewares.file.upload.single('photo'),
  middlewares.validation.userValidationRules(),
  middlewares.validation.validate,
  userController.register
);*/

export default userRouter;