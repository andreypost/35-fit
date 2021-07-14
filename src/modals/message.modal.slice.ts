import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/root.reducer'

export interface MessageModalState {
  active: string
  value: string
}

export const messageModalSlice = createSlice({
  name: 'messageModal',
  initialState:{ active: '', value: ''},
  reducers: {
    messageSuccessModal: state => {
      state.active = 'messageActive',
      state.value = 'You have successfully subscribed!.'
    },
    messageErrorModal: state => {
      state.active = 'messageActive',
      state.value = 'Sorry, but it is not possible to retrieve data at this time. Try later!'
    },
    unsetMessageModal: state => {
      state.active = ''
      state.value = ''
    },
  },
})

export const {
  messageSuccessModal,
  messageErrorModal,
  unsetMessageModal,
} = messageModalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMessageActive = (state: RootState) => state.messageModal.active
export const selectMessageValue = (state: RootState) => state.messageModal.value

export default messageModalSlice.reducer