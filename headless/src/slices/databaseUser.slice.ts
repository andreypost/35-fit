import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppDispatch, RootState } from 'store'
import { IAuth, IUserPrivileges } from 'types/interface'
import { errorModalMessage } from 'utils/errorModalMessage'
import { messageModal } from './modal.slice'
import { UserPrivileges } from 'utils/userRoles'

interface DatabaseUserState {
  databaseUser: IAuth | null
  databaseUserLoading: boolean
  databaseUserError: { message: string } | null
  isAdmin: boolean
}

const initialState: DatabaseUserState = {
  databaseUser: null,
  databaseUserLoading: false,
  databaseUserError: null,
  isAdmin: false,
}

const checkIsAdmin = (
  grantedPrivileges: IUserPrivileges['grantedPrivileges'],
  deniedPrivileges: IUserPrivileges['deniedPrivileges']
): boolean => {
  if (!grantedPrivileges) return false

  const isAdmin = (grantedPrivileges & UserPrivileges.Administrator) !== 0
  const isDenied = deniedPrivileges
    ? (deniedPrivileges & UserPrivileges.Administrator) !== 0
    : false

  return isAdmin && !isDenied
}

export const loginUserFromDatabase = createAsyncThunk<
  IAuth,
  { email: string; password: string },
  { dispatch: AppDispatch }
>(
  'databaseUser/loginUserFromDatabase',
  async (credentials, { dispatch }): Promise<IAuth> => {
    // dispatch is able in this obj
    try {
      const response = await axios.post(
        `${process.env.API_URL}/user/login`,
        credentials,
        { withCredentials: true }
      )
      dispatch(messageModal(response?.data?.message || 'Login successful.'))
      return response.data
    } catch (error: unknown) {
      errorModalMessage(error)
      throw error
    }
  }
)

export const validateAuthToken = createAsyncThunk<IUserPrivileges>(
  'databaseUser/validateAuthToken',
  async (
    _
    // thunkApi,
    // { dispatch }
  ): Promise<IUserPrivileges> => {
    try {
      const { data } = await axios.get(`${process.env.API_URL}/user/validate`, {
        withCredentials: true,
      })
      // const { dispatch } = thunkApi
      return data
    } catch (error: unknown) {
      throw error
    }
  }
)

export const logoutUserWithAuthToken = createAsyncThunk<
  void,
  { deleteAccount: boolean },
  { rejectValue: { message: string }; dispatch: any }
>(
  'databaseUser/logoutUserFromDatabase',
  async ({ deleteAccount }, { rejectWithValue, dispatch }): Promise<void> => {
    try {
      const logoutResponse = await axios.post(
        `${process.env.API_URL}/user/logout`,
        { deleteAccount },
        {
          withCredentials: true,
        }
      )
      dispatch(messageModal(logoutResponse?.data?.message))
    } catch (error: unknown) {
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

      const { grantedPrivileges, deniedPrivileges } = action.payload
      state.isAdmin = checkIsAdmin(grantedPrivileges, deniedPrivileges)
    },
    resetDatabaseUser(state) {
      state.databaseUser = null
      state.isAdmin = false
      state.databaseUserLoading = false
      state.databaseUserError = null
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

        const { grantedPrivileges, deniedPrivileges } = action.payload
        state.isAdmin = checkIsAdmin(grantedPrivileges, deniedPrivileges)
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

        const { grantedPrivileges, deniedPrivileges } = action.payload
        state.isAdmin = checkIsAdmin(grantedPrivileges, deniedPrivileges)
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
export const { addNewDatabaseUser, resetDatabaseUser } =
  databaseUserSlice.actions

export default databaseUserSlice.reducer
