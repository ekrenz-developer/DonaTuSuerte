import error from '../../helpers/error';
import CompetitorRole from './CompetitorRole';
import OrganizationRole from './OrganizationRole';
import CheckerRole from './CheckerRole';

class Role {
  constructor() {
    this.CompetitorRole = CompetitorRole;
    this.OrganizationRole = OrganizationRole;
    this.CheckerRole = CheckerRole;
    this.isCompetitor = this.isCompetitor.bind(this);
    this.isOrganization = this.isOrganization.bind(this);
    this.isChecker = this.isChecker.bind(this);
  }

  async isCompetitor(req, res, next) {
    try {
      let currentRole = req.user.role.role;
      
      await this.CompetitorRole.isCorrectRole(currentRole);

      next();
    } catch (err) {
      next(err)
    }
  }

  async isOrganization(req, res, next) {
    try {
      let currentRole = req.user.role.role;
      
      await this.OrganizationRole.isCorrectRole(currentRole);

      next();
    } catch (err) {
      next(err)
    }
  }

  async isChecker(req, res, next) {
    try {
      let currentRole = req.user.role.role;
      
      await this.CheckerRole.isCorrectRole(currentRole);
      
      next();
    } catch (err) {
      next(err)
    }
  }
}

export default new Role();