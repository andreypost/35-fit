import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, RootState } from "store";
import { IAuth } from "types/interface";
import { errorModalMessage } from "utils/errorModalMessage";
import { messageModal } from "./modal.slice";

interface DatabaseUserState {
  databaseUser: IAuth | null;
  databaseUserLoading: boolean;
  databaseUserError: { message: string } | null;
}

const initialState: DatabaseUserState = {
  databaseUser: null,
  databaseUserLoading: false,
  databaseUserError: null,
};

export const loginUserFromDatabase = createAsyncThunk<
  IAuth,
  { email: string; password: string },
  { dispatch: AppDispatch }
>("databaseUser/loginUserFromDatabase", async (credentials, { dispatch }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      credentials,
      { withCredentials: true }
    );
    dispatch(messageModal(response?.data?.message || "Login successful."));
    return response.data;
  } catch (error: any) {
    errorModalMessage(error);
    throw error;
  }
});

export const validateAuthToken = createAsyncThunk<
  IAuth,
  { firstLoad: boolean },
  { dispatch: AppDispatch }
>("databaseUser/validateAuthToken", async ({ firstLoad }, { dispatch }) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/validate`,
      {
        withCredentials: true,
      }
    );
    !firstLoad &&
      dispatch(messageModal(response?.data?.message || "Login successful."));
    return response.data;
  } catch (error: any) {
    !firstLoad && errorModalMessage(error);
    throw error;
  }
});

export const logoutUserWithAuthToken = createAsyncThunk<
  void,
  void,
  { rejectValue: { message: string } }
>(
  "databaseUser/logoutUserFromDatabase",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, null, {
        withCredentials: true,
      });
      dispatch(messageModal("You have successfully logged out."));
    } catch (error: any) {
      console.error(error?.response?.data);
      return rejectWithValue(error?.response?.data || "Logout failed");
    }
  }
);

const databaseUserSlice = createSlice({
  name: "databaseUser",
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
        state.databaseUserLoading = true;
        state.databaseUserError = null;
      })
      .addCase(loginUserFromDatabase.fulfilled, (state, action) => {
        state.databaseUserLoading = false;
        state.databaseUser = action.payload;
        state.databaseUserError = null;
      })
      .addCase(loginUserFromDatabase.rejected, (state, action) => {
        state.databaseUserLoading = false;
        state.databaseUserError = action.payload as { message: string };
      })
      .addCase(validateAuthToken.pending, (state) => {
        state.databaseUserLoading = true;
        state.databaseUserError = null;
      })
      .addCase(validateAuthToken.fulfilled, (state, action) => {
        state.databaseUserLoading = false;
        state.databaseUser = action.payload;
        state.databaseUserError = null;
      })
      .addCase(validateAuthToken.rejected, (state, action) => {
        state.databaseUserLoading = false;
        state.databaseUserError = action.payload as { message: string };
      })
      .addCase(logoutUserWithAuthToken.pending, (state) => {
        state.databaseUserLoading = true;
        state.databaseUserError = null;
      })
      .addCase(logoutUserWithAuthToken.fulfilled, (state) => {
        state.databaseUserLoading = false;
        state.databaseUser = null;
        state.databaseUserError = null;
      })
      .addCase(logoutUserWithAuthToken.rejected, (state, action) => {
        state.databaseUserLoading = false;
        state.databaseUserError = action.payload as { message: string };
      });
  },
});

export const setDatabaseUser = (state: RootState) => state.databaseUser;
// export const { logoutDatabaseUser } = databaseUserSlice.actions

export default databaseUserSlice.reducer;
