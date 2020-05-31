import Role from './Role';

const role = 2 //Competitor

class CompetitorRole extends Role {
  constructor(role) {
    super(role);
  }
}

export default new CompetitorRole(role);