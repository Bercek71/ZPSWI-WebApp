
export default class Roles {
  static ADMIN = 'ADMIN';
  static MANAGER = 'MANAGER';
  static USER = 'USER';
  static GUEST = 'GUEST';
  static ALL = [Roles.ADMIN, Roles.USER, Roles.MANAGER, Roles.GUEST];
  static ALL_BUT_GUEST = [Roles.ADMIN, Roles.USER, Roles.MANAGER];
}