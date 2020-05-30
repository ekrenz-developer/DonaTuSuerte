import Controller from './Controller';
import RoleService from '../services/RoleService';

const roleService = new RoleService();

class RoleController extends Controller {
  constructor(service) {
    super(service);
  }
}

export default new RoleController(roleService);