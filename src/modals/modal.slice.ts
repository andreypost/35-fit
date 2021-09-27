import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/root.reducer'

export const modalSlice = createSlice({
  name: 'modal',
  initialState:{ burger: '', menuActive: '', dashActive: '', loginActive:'',  messageActive: '', messageValue: ''},
  reducers: {
    menuModal: state => {
      state.menuActive = 'menuActive'
      state.burger = 'active'
    },
    unsetMenuModal: state => {
      state.menuActive = ''
      state.burger = ''
    },
    loginModal: state => {
      state.menuActive = ''
      state.loginActive = 'loginActive'
      state.burger = 'active'
    },
    unsetLoginModal: state => {
      state.loginActive = ''
      state.burger = ''
    },
    dashModal: state => {
      state.menuActive = ''
      state.dashActive = 'dashboarActive'
      state.burger = 'active'
    },
    unsetDashModal: state => {
      state.dashActive = ''
      state.burger = ''
    },
    messageSuccessModal: state => {
      state.messageActive = 'messageActive',
      state.messageValue = 'You have successfully subscribed!.'
    },
    messageErrorModal: state => {
      state.messageActive = 'messageActive',
      state.messageValue = 'Sorry, but it is not possible to retrieve data at this time. Try later!'
    },
    unsetMessageModal: state => {
      state.messageActive = ''
      state.messageValue = ''
    },
    unsetAllModal: state => {
      state.menuActive = ''
      state.loginActive = ''
      state.dashActive = ''
      state.messageActive = ''
      state.messageValue = ''
      state.burger = ''
    },
  },
})

export const {
  menuModal,
  unsetMenuModal,
  loginModal,
  unsetLoginModal,
  dashModal,
  unsetDashModal,
  unsetAllModal,
  messageSuccessModal,
  messageErrorModal,
  unsetMessageModal,
} = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectBurgerValue = (state: RootState) => state.modal.burger
export const selectMenuModalActive = (state: RootState) => state.modal.menuActive
export const selectLoginModalActive = (state: RootState) => state.modal.loginActive
export const selectDashModalActive = (state: RootState) => state.modal.dashActive
export const selectMessageModalActive = (state: RootState) => state.modal.messageActive
export const selectMessageModalValue = (state: RootState) => state.modal.messageValue

export default modalSlice.reducer