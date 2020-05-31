import Role from './Role';

const role = 4 //Checker

class CheckerRole extends Role {
  constructor(role) {
    super(role);
  }
}

export default new CheckerRole(role);