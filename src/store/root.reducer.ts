import { combineReducers } from '@reduxjs/toolkit'
import actionSlice from 'utils/action.slice'
import modalSlice from 'utils/modal.slice'

export const rootReducer = combineReducers({
  modal: modalSlice,
  action: actionSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
