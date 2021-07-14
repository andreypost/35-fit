import { combineReducers } from '@reduxjs/toolkit'
import modalSlice from 'modals/modal.slice'
import messageModalSlice from 'modals/message.modal.slice'

export const rootReducer = combineReducers({
  modal: modalSlice,
  messageModal: messageModalSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
