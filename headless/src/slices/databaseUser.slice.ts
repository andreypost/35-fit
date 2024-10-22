import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from 'reducer'
import { IAuth } from 'types/interface'
import { errorModalMessage } from 'utils/errorModalMessage'

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
  { email: string; password: string }
>('databaseUser/loginUserFromDatabase', async (credentials, { dispatch }) => {
  // dispatch is able in this obj
  try {
    const response = await axios.post(
      `${process.env.API_URL}/auth/login`,
      credentials,
      { withCredentials: true }
    )
    return response.data
  } catch (error: any) {
    errorModalMessage(error)
  }
})

export const validateAuthToken = createAsyncThunk<
  IAuth,
  { firstLoad: boolean },
  { rejectValue: { message: string } }
>(
  'databaseUser/validateAuthToken',
  async ({ firstLoad }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/auth/validate`, {
        withCredentials: true,
      })
      return response.data
    } catch (error: any) {
      // !firstLoad && errorModalMessage(error)
      console.error(error?.response?.data)
      return rejectWithValue(error?.response?.data || 'Token validation failed')
    }
  }
)

export const logoutUserWithAuthToken = createAsyncThunk<
  void,
  { rejectValue: { message: string } }
>('databaseUser/logoutUserFromDatabase', async (_, { rejectWithValue }) => {
  try {
    await axios.post(`${process.env.API_URL}/auth/logout`, null, {
      withCredentials: true,
    })
  } catch (error: any) {
    console.error(error?.response?.data)
    return rejectWithValue(error?.response?.data || 'Logout failed')
  }
})

const databaseUserSlice = createSlice({
  name: 'databaseUser',
  initialState,
  reducers: {
    // logoutDatabaseUser(state) {
    //   state.databaseUser = null
    //   state.databaseUserError = null
    // },
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
// export const { logoutDatabaseUser } = databaseUserSlice.actions

export default databaseUserSlice.reducer
