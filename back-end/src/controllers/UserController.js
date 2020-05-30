import Controller from './Controller';
import UserService from '../services/UserService';

const userService = new UserService();

class UserController extends Controller {
  constructor(service) {
    super(service);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.getUser = this.getUser.bind(this);
  }
  
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      let response = await this.service.signIn(email, password);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      next(err)
    }
  }
  
  async signUp(req, res, next) {
    try {
      let response = await this.service.signUp(req.body, req.file);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res) {
    try {
      let response = {
        error: false,
        statusCode: 200,
        data: req.user
      };

      return res.status(response.statusCode).send(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController(userService);