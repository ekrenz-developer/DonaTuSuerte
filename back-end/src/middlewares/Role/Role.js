import error from '../../helpers/error';

class Role {
  constructor(role) {
    this.role = role;
    this.isCorrectRole = this.isCorrectRole.bind(this);
  }

  async isCorrectRole(currentRole) {
    try {
      if (!currentRole) {
        throw new error.ErrorHandler('User role is not defined', 500);
      }
  
      if (this.role !== currentRole) {
        throw new error.ErrorHandler('Unauthorized', 403);
      }
    } catch (err) {
      throw err;
    }

  }
}

export default Role;