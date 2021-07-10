import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/root.reducer'

export interface ModalState {
  style: string
  value: string
  burger: string
}

const initialState: ModalState = {
  style: '',
  value: '',
  burger: ''
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    menuModal: (state) => {
      state.style = 'menuActive'
      state.burger = 'active'
    },
    loginModal: (state) => {
      state.style = 'loginActive'
      state.burger = 'active'
    },
    messageSuccessModal: (state) => {
      state.style = 'messageActive',
      state.value = 'You have successfully subscribed!.'
      state.burger = 'active'
    },
    messageErrorModal: (state) => {
      state.style = 'messageActive',
      state.value = 'Sorry, but it is not possible to retrieve data at this time. Try later!'
      state.burger = 'active'
    },
    unsetModal: (state) => {
      state.style = ''
      state.value = ''
      state.burger = ''
    },
  },
})

export const {
  menuModal,
  loginModal,
  messageSuccessModal,
  messageErrorModal,
  unsetModal,
} = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectModalActive = (state: RootState) => state.modal.style
export const selectBurgerValue = (state: RootState) => state.modal.burger
export const selectModalValue = (state: RootState) => state.modal.value

export default modalSlice.reducer