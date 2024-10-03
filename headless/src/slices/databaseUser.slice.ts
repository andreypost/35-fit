import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from 'reducer'
import { IAuth } from 'types/interface'

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
>(
  'databaseUser/loginUserFromDatabase',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/auth/login`,
        credentials,
        { withCredentials: true }
      )
      console.log('/auth/login:', response.data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'Login failed')
    }
  }
)

const databaseUserSlice = createSlice({
  name: 'databaseUser',
  initialState,
  reducers: {
    logoutDatabaseUser(state) {
      state.databaseUser = null
      state.databaseUserError = null
    },
  },
  extraReducers(builder) {
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
  },
})

export const setDatabaseUser = (state: RootState) => state.databaseUser
export const { logoutDatabaseUser } = databaseUserSlice.actions

export default databaseUserSlice.reducer
