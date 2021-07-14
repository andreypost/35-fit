import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/root.reducer'

export interface ModalState {
  active: string
  burger: string
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState:{ active: '', burger: ''},
  reducers: {
    menuModal: state => {
      state.active = 'menuActive'
      state.burger = 'active'
    },
    loginModal: state => {
      state.active = 'loginActive'
      state.burger = 'active'
    },
    unsetModal: state => {
      state.active = ''
      state.burger = ''
    },
  },
})

export const {
  menuModal,
  loginModal,
  unsetModal,
} = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectModalActive = (state: RootState) => state.modal.active
export const selectBurgerValue = (state: RootState) => state.modal.burger

export default modalSlice.reducer