import AuthService from '../services/AuthService';

const authService = new AuthService();

const ExtractBearerToken = (headers) => {
  if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
    return headers.authorization.split(' ')[1];
  }
}

class Auth {
  constructor(service) {
    this.service = service;
    this.isAuth = this.isAuth.bind(this);
  }

  async isAuth(req, res, next) {
    try {
      const token = ExtractBearerToken(req.headers);

      let response = await this.service.isAuth(token);

      req.user = response.data;
      next();
    } catch (err) {
      next(err)
    }
  }
}

export default new Auth(authService);