import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'

export const actionSlice = createSlice({
  name: 'action',
  initialState: { first: false, second: false, third: false },
  reducers: {
    firstBlockVisible: (state, action: PayloadAction<boolean>) => {
      // --> dispatch = useAppDispatch() --> dispatch(firstBlockVisible(true))
      state.first = action.payload
    },
    secondBlockVisible: (state) => {
      state.second = true
    },
    thirdBlockVisible: (state) => {
      state.third = true
    },
  },
})

export const { firstBlockVisible, secondBlockVisible, thirdBlockVisible } =
  actionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFirstBlock = (state: RootState) => state.action.first
export const selectSecondBlock = (state: RootState) => state.action.second
export const selectThirdBlock = (state: RootState) => state.action.third

export default actionSlice.reducer
