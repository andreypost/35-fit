import { combineReducers } from '@reduxjs/toolkit'
import modalSlice from 'slices/modal.slice'
import coachSlice from 'slices/coach.slice'
import actionSlice from 'slices/action.slice'

export const rootReducer = combineReducers({
  modal: modalSlice,
  action: actionSlice,
  coach: coachSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
