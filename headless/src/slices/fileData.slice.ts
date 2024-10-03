import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from 'reducer'

export interface UserData {
  name: string
  id: number
  country: string
  earnings: string
}

interface FileDataState {
  fileList: UserData[]
  filteredList: UserData[]
  sortedList: UserData[]
  fileListloading: boolean
  fileListerror: { message: string } | null
}

const initialState: FileDataState = {
  fileList: [],
  filteredList: [],
  sortedList: [],
  fileListloading: false,
  fileListerror: null,
}

export const fetchFileData = createAsyncThunk<UserData[]>(
  'fileData/fetchFileData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/file/read`, {
        withCredentials: true,
      })
      return response.data
    } catch (error: any) {
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
        state.fileListloading = true
        state.fileListerror = null
      })
      .addCase(
        fetchFileData.fulfilled,
        (state, action: PayloadAction<UserData[]>) => {
          state.fileListloading = false
          state.fileList = action.payload

          state.filteredList = state.fileList.filter(
            ({ country }) => country !== 'Russian Federation'
          )

          state.sortedList = state.filteredList.sort(
            (a, b) =>
              parseFloat(a.earnings.replace('$', '')) -
              parseFloat(b.earnings.replace('$', ''))
          )
        }
      )
      .addCase(fetchFileData.rejected, (state, action) => {
        state.fileListloading = true
        state.fileListerror = action.payload as { message: string }
      })
  },
})

export const setSortedList = (state: RootState) => state.fileData

export default fileDataSlice.reducer
