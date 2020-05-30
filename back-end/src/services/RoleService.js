import Service from './Service';
import Role from '../models/Role';

class RoleService extends Service {
  constructor() {
    super(Role);
  }
}

export default RoleService;