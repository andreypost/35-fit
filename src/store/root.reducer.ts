import { combineReducers } from '@reduxjs/toolkit'
import modalSlice from 'modals/modal.slice'

export const rootReducer = combineReducers({
  modal: modalSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
