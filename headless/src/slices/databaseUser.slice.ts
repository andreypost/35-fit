import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppDispatch, RootState } from 'store'
import { IAuth, IUser } from 'types/interface'
import { errorModalMessage } from 'utils/errorModalMessage'
import { messageModal } from './modal.slice'

interface DatabaseUserState {
  databaseUser: IAuth | null
  databaseUserLoading: boolean
  databaseUserError: { message: string } | null
}

const initialState: DatabaseUserState = {
  databaseUser: null,
  databaseUserLoading: false,
  databaseUserError: null,
}

export const loginUserFromDatabase = createAsyncThunk<
  IAuth,
  { email: string; password: string },
  { dispatch: AppDispatch }
>('databaseUser/loginUserFromDatabase', async (credentials, { dispatch }) => {
  // dispatch is able in this obj
  try {
    const response = await axios.post(
      `${process.env.API_URL}/user/login`,
      credentials,
      { withCredentials: true }
    )
    dispatch(messageModal(response?.data?.message || 'Login successful.'))
    return response.data
  } catch (error: any) {
    errorModalMessage(error)
    throw error
  }
})

export const validateAuthToken = createAsyncThunk<IAuth>(
  'databaseUser/validateAuthToken',
  async () => {
    try {
      const { data } = await axios.get(`${process.env.API_URL}/user/validate`, {
        withCredentials: true,
      })
      return data
    } catch (error: any) {
      throw error
    }
  }
)

export const logoutUserWithAuthToken = createAsyncThunk<
  void,
  { deleteAccount: boolean },
  { rejectValue: { message: string } }
>(
  'databaseUser/logoutUserFromDatabase',
  async ({ deleteAccount }, { rejectWithValue, dispatch }) => {
    try {
      const logoutResponse = await axios.post(
        `${process.env.API_URL}/user/logout`,
        { deleteAccount },
        {
          withCredentials: true,
        }
      )
      dispatch(messageModal(logoutResponse?.data?.message))
    } catch (error: any) {
      errorModalMessage(error)
      // return rejectWithValue(
      //   error?.response?.data || { message: 'Logout failed' }
      // )
    }
  }
)

const databaseUserSlice = createSlice({
  name: 'databaseUser',
  initialState,
  reducers: {
    addNewDatabaseUser(state, action) {
      state.databaseUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserFromDatabase.pending, (state) => {
        state.databaseUserLoading = true
        state.databaseUserError = null
      })
      .addCase(loginUserFromDatabase.fulfilled, (state, action) => {
        state.databaseUserLoading = false
        state.databaseUser = action.payload
        state.databaseUserError = null
      })
      .addCase(loginUserFromDatabase.rejected, (state, action) => {
        state.databaseUserLoading = false
        state.databaseUserError = action.payload as { message: string }
      })
      .addCase(validateAuthToken.pending, (state) => {
        state.databaseUserLoading = true
        state.databaseUserError = null
      })
      .addCase(validateAuthToken.fulfilled, (state, action) => {
        state.databaseUserLoading = false
        state.databaseUser = action.payload
        state.databaseUserError = null
      })
      .addCase(validateAuthToken.rejected, (state, action) => {
        state.databaseUserLoading = false
        state.databaseUserError = action.payload as { message: string }
      })
      .addCase(logoutUserWithAuthToken.pending, (state) => {
        state.databaseUserLoading = true
        state.databaseUserError = null
      })
      .addCase(logoutUserWithAuthToken.fulfilled, (state) => {
        state.databaseUserLoading = false
        state.databaseUser = null
        state.databaseUserError = null
      })
      .addCase(logoutUserWithAuthToken.rejected, (state, action) => {
        state.databaseUserLoading = false
        state.databaseUserError = action.payload as { message: string }
      })
  },
})

export const setDatabaseUser = (state: RootState) => state.databaseUser
export const { addNewDatabaseUser } = databaseUserSlice.actions

export default databaseUserSlice.reducer
