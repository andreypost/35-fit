import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "store";

export interface UserData {
  name: string;
  id: number;
  country: string;
  earnings: string;
}

interface FileDataState {
  fileList: UserData[];
  fileFilteredList: UserData[];
  fileSortedList: UserData[];
  fileListLoading: boolean;
  fileListError: { message: string } | null;
}

const initialState: FileDataState = {
  fileList: [],
  fileFilteredList: [],
  fileSortedList: [],
  fileListLoading: false,
  fileListError: null,
};

export const fetchFileData = createAsyncThunk<UserData[]>(
  "fileData/fetchFileData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/file/read`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(error?.response?.data);
      return rejectWithValue(
        error.response?.data || "Error fetching file data"
      );
    }
  }
);

const fileDataSlice = createSlice({
  name: "fileData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFileData.pending, (state) => {
        state.fileListLoading = true;
        state.fileListError = null;
      })
      .addCase(
        fetchFileData.fulfilled,
        (state, action: PayloadAction<UserData[]>) => {
          state.fileListLoading = false;
          state.fileList = action.payload;

          state.fileFilteredList = state.fileList.filter(
            ({ country }) => country !== "Russian Federation"
          );

          state.fileSortedList = state.fileFilteredList.sort(
            (a, b) =>
              parseFloat(a.earnings.replace("$", "")) -
              parseFloat(b.earnings.replace("$", ""))
          );
        }
      )
      .addCase(fetchFileData.rejected, (state, action) => {
        state.fileListLoading = true;
        state.fileListError = action.payload as { message: string };
      });
  },
});

export const setSortedList = (state: RootState) => state.fileData;

export default fileDataSlice.reducer;
