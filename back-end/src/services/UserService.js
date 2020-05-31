import Service from './Service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import uploadClodinary from '../utils/uploadCloudinary';
import User from '../models/User';
import error from '../helpers/error'
import config from '../config/index';

const populate = {
  path: 'role',
}

class UserService extends Service {
  constructor() {
    super(User, populate);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async signIn(email, password) {
    try {
      const user = await this.model
        .findOne({ email: email })
        .populate(populate);

      if (!user) {
        throw new error.ErrorHandler('User not registered', 401);
      }

      const validPassword = await bcrypt.compare(password, user.password)
      if(!validPassword){
        throw new error.ErrorHandler('Invalid password', 401);
      }

      const payload = {
        sub: user.email,
        exp: Date.now() + parseInt(config.JWT_LIFETIME),
        firstName: user.firstName
      }
      const token = jwt.sign(JSON.stringify(payload), config.KEY);

      return {
        error: false,
        statusCode: 200,
        data: {
          user: user,
          token: token
        }
      }

    } catch (err) {
      throw err;
    }
  }

  async signUp(body, file) {
    try {
      let { email, password } = body;

      const user = await this.model.findOne({ email: email });

      if (user) {
        throw new error.ErrorHandler('User already registered', 404);
      }

      const hash = await bcrypt.hash(password, parseInt(config.BCRYPT_ROUNDS));

      let photo = '';
      if (file) {
        const options = {
          folder: config.CLOUDINARY_FOLDER,
          unique_filename: true,
          resource_type: 'image'
        };

        const result = await uploadClodinary(file, options);
        photo = result.secure_url;
      }

      let userCreated = await this.model.create({
        ...body,
        password: hash,
        photo: photo
      });

      if (!userCreated) {
        throw new error.ErrorHandler('User not registered', 500);
      }

      userCreated = await this.model.findById(userCreated._id).populate(populate);

      return {
        error: false,
        statusCode: 201,
        data: userCreated
      }
    } catch (err) {
      throw err;
    }
  }
};

export default UserService;