export type UserPrivilegesNumber = number

export class UserPrivileges {
  static readonly None = 0
  static readonly Administrator = 1
  static readonly BillingPeriodManager = 1 << 1
  static readonly GlobalSupervisor = 1 << 2
  static readonly ProjectCreator = 1 << 3

  private grantedPrivilegesNumber: UserPrivilegesNumber
  private deniedPrivilegesNumber: UserPrivilegesNumber

  constructor(
    privilegesNumber: UserPrivilegesNumber,
    deniedPrivilegesNumber: UserPrivilegesNumber
  ) {
    this.grantedPrivilegesNumber = privilegesNumber
    this.deniedPrivilegesNumber = deniedPrivilegesNumber
  }

  public hasGrantedPrivilege(privilegeNumber: UserPrivilegesNumber): boolean {
    if (this.hasDeniedPrivilege(privilegeNumber)) return false
    return (this.grantedPrivilegesNumber & privilegeNumber) === privilegeNumber
  }

  public hasDeniedPrivilege(privilegeNumber: UserPrivilegesNumber): boolean {
    return (this.deniedPrivilegesNumber & privilegeNumber) === privilegeNumber
  }

  public addGrantedPrivilege(privilegeNumber: UserPrivilegesNumber) {
    this.grantedPrivilegesNumber |= privilegeNumber
  }

  public addDeniedPrivilege(privilegeNumber: UserPrivilegesNumber) {
    this.deniedPrivilegesNumber |= privilegeNumber
  }

  public removeGrantedPrivilege(privilegeNumber: UserPrivilegesNumber) {
    this.grantedPrivilegesNumber &= ~privilegeNumber
  }

  public removeDeniedPrivilege(privilegeNumber: UserPrivilegesNumber) {
    this.deniedPrivilegesNumber &= ~privilegeNumber
  }
}
