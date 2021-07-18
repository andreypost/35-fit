import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/root.reducer'

export interface ModalState {
  active: string
  burger: string
  messageActive: string
  messageValue: string
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState:{ active: '', burger: '',  messageActive: '', messageValue: ''},
  reducers: {
    menuModal: state => {
      state.active = 'menuActive'
      state.burger = 'active'
    },
    loginModal: state => {
      state.active = 'loginActive'
      state.burger = 'active'
    },
    dashboardModal: state => {
      state.active = 'dashboarActive'
      state.burger = 'active'
    },
    unsetModal: state => {
      state.active = ''
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
  },
})

export const {
  menuModal,
  loginModal,
  dashboardModal,
  unsetModal,
  messageSuccessModal,
  messageErrorModal,
  unsetMessageModal,
} = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectModalActive = (state: RootState) => state.modal.active
export const selectBurgerValue = (state: RootState) => state.modal.burger
export const selectMessageModalActive = (state: RootState) => state.modal.messageActive
export const selectMessageModalValue = (state: RootState) => state.modal.messageValue

export default modalSlice.reducer