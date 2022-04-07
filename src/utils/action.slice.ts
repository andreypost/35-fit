import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'reducer'

export const actionSlice = createSlice({
  name: 'action',
  initialState: { first: false, second: false, third: false },
  reducers: {
    firstBlockTrue: state => {
      state.first = true
    },
    firstBlockFalse: state => {
      state.first = false
    },
    secondBlockTrue: state => {
      state.second = true
    },
    secondBlockFalse: state => {
      state.second = false
    },
    thirdBlockTrue: state => {
      state.third = true
    },
    thirdBlockFalse: state => {
      state.third = false
    },
  },
})

export const {
  firstBlockTrue,
  firstBlockFalse,
  secondBlockTrue,
  secondBlockFalse,
  thirdBlockTrue,
  thirdBlockFalse
} = actionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFirstBlock = (state: RootState) => state.action.first
export const selectSecondBlock = (state: RootState) => state.action.second
export const selectThirdBlock = (state: RootState) => state.action.third

export default actionSlice.reducer