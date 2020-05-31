import Role from './Role';

const role = 3 //Organization

class OrganizationRole extends Role {
  constructor(role) {
    super(role);
  }
}

export default new OrganizationRole(role);