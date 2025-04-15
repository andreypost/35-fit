import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from 'store'

export interface UserData {
  name: string
  id: number
  country: string
  earnings: string
}

interface FileDataState {
  slFileList: UserData[]
  slFilteredList: UserData[]
  slFileSortedList: UserData[]
  slFileListLoading: boolean
  slFileListError: { message: string } | null
}

const initialState: FileDataState = {
  slFileList: [],
  slFilteredList: [],
  slFileSortedList: [],
  slFileListLoading: false,
  slFileListError: null,
}

export const fetchFileData = createAsyncThunk<UserData[]>(
  'fileData/fetchFileData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/file/json/read`,
        {
          withCredentials: true,
        }
      )
      return response.data
    } catch (error: any) {
      console.error(error?.response?.data)
      return rejectWithValue(error.response?.data || 'Error fetching file data')
    }
  }
)

const fileDataSlice = createSlice({
  name: 'fileData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFileData.pending, (state) => {
        state.slFileListLoading = true
        state.slFileListError = null
      })
      .addCase(
        fetchFileData.fulfilled,
        (state, action: PayloadAction<UserData[]>) => {
          state.slFileListLoading = false
          state.slFileList = action.payload

          state.slFilteredList = state.slFileList.filter(
            ({ country }) => country !== 'Russian Federation'
          )

          state.slFileSortedList = state.slFilteredList.sort(
            (a, b) =>
              parseFloat(a.earnings.replace('$', '')) -
              parseFloat(b.earnings.replace('$', ''))
          )
        }
      )
      .addCase(fetchFileData.rejected, (state, action) => {
        state.slFileListLoading = true
        state.slFileListError = action.payload as { message: string }
      })
  },
})

export const setSlSortedList = (state: RootState) => state.fileData

export default fileDataSlice.reducer
