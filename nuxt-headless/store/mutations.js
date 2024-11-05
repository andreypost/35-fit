export default {
  menuModal(state) {
    state.menuActive = 'menuActive'
    state.burger = 'active'
  },
  unsetMenuModal: (state) => {
    state.menuActive = ''
    state.burger = ''
  },
  loginModal: (state) => {
    state.menuActive = ''
    state.loginActive = 'loginActive'
    state.burger = 'active'
  },
  unsetLoginModal: (state) => {
    state.loginActive = ''
    state.burger = ''
  },
  dashModal: (state) => {
    state.menuActive = ''
    state.dashActive = 'dashboarActive'
    state.burger = 'active'
  },
  unsetDashModal: (state) => {
    state.dashActive = ''
    state.burger = ''
  },
  messageModal: (state, action) => {
    state.messageActive = 'messageActive'
    state.messageValue = action.payload
  },
  unsetMessageModal: (state) => {
    state.messageActive = ''
    state.messageValue = ''
  },
  unsetAllModal: (state) => {
    state.menuActive = ''
    state.loginActive = ''
    state.dashActive = ''
    state.messageActive = ''
    state.messageValue = ''
    state.burger = ''
  },
}
