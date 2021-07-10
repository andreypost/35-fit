import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './root.reducer'

export const store = configureStore({
  // reducer: {
  //     infoModal: infoModalSlice.reducer,
  // }
  reducer: rootReducer,
})

// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export type AppThunk<ReturnType = void> = ThunkAction<
// ReturnType,
// RootState,
// unknown,
// Action<string>
// >

export default store
