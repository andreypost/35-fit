export type UserPrivilegesNumber = number;

export class UserPrivileges {
  static None = 0;
  static Administrator = 1;
  static BillingPeriodManager = 1 << 1;
  static GlobalSupervisor = 1 << 2;
  static ProjectCreator = 1 << 3;

  grantedPrivilegesNumber: UserPrivilegesNumber;
  deniedPrivilegesNumber: UserPrivilegesNumber;

  constructor(
    privilegesNumber: UserPrivilegesNumber,
    deniedPrivilegesNumber: UserPrivilegesNumber,
  ) {
    this.grantedPrivilegesNumber = privilegesNumber;
    this.deniedPrivilegesNumber = deniedPrivilegesNumber;
  }

  hasGrantedPrivilege(privilegeNumber: UserPrivilegesNumber): boolean {
    if (this.hasDeniedPrivilege(privilegeNumber)) return false;
    return (this.grantedPrivilegesNumber & privilegeNumber) === privilegeNumber;
  }

  hasDeniedPrivilege(privilegeNumber: UserPrivilegesNumber): boolean {
    return (this.deniedPrivilegesNumber & privilegeNumber) === privilegeNumber;
  }

  addGrantedPrivilege(privilegeNumber: UserPrivilegesNumber) {
    this.grantedPrivilegesNumber |= privilegeNumber;
  }

  addDeniedPrivilege(privilegeNumber: UserPrivilegesNumber) {
    this.deniedPrivilegesNumber |= privilegeNumber;
  }

  removeGrantedPrivilege(privilegeNumber: UserPrivilegesNumber) {
    this.grantedPrivilegesNumber &= ~privilegeNumber;
  }

  removeDeniedPrivilege(privilegeNumber: UserPrivilegesNumber) {
    this.deniedPrivilegesNumber &= ~privilegeNumber;
  }

  static isAdminEmail(email: string): boolean {
    return ['admin@email.com', 'super@email.com'].includes(email);
  }
}
