import jwt from 'jsonwebtoken';

import User from '../models/User';
import error from '../helpers/error';
import config from '../config/index';

class AuthService {
  constructor() {
    this.model = User;
    this.isAuth = this.isAuth.bind(this);
  }

  async isAuth(jwtToken) {
    try {
      
      const payload = await jwt.verify(jwtToken, config.KEY);

      let { sub } = payload;
      
      let user = await this.model
        .findOne({ email: sub })
        .populate({
          path: 'draws role organizations',
          populate: {
            path: 'status store raffles winner stores',
          }
        })

      if (!user) {
        throw new error.ErrorHandler('Unauthorized', 403);
      }

      return {
        error: false,
        statusCode: 200,
        data: user
      }
    } catch (err) {
      throw err;
    }
  }
}

export default AuthService;