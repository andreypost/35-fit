import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'

const actionSlice = createSlice({
  name: 'action',
  initialState: {
    spinnerState: false,
  },
  reducers: {
    spinnerIsVisibile: (state, action: PayloadAction<boolean>) => {
      state.spinnerState = action.payload
    },
  },
})

export const getSpinnerState = (state: RootState) => state.action
export const { spinnerIsVisibile } = actionSlice.actions
export default actionSlice.reducer
