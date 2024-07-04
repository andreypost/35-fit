import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'reducer'

export const coachSlice = createSlice({
  name: 'coach',
  initialState: {
    coaches: [
      {
        name: 'Joyce Hallow',
        position: 'Head Coach',
        img: 'p_5_1',
        route: 'joyce',
      },
      { name: 'John Wayne', position: 'Coach', img: 'p_5_2', route: 'john' },
      {
        name: 'Samantha Jade',
        position: 'Coach',
        img: 'p_5_3',
        route: 'samantha',
      },
      {
        name: 'Cameron Horner',
        position: 'Head Coach',
        img: 'p_5_4',
        route: 'cameron',
      },
      { name: 'Marvin', position: 'Coach', img: 'p_5_5', route: 'marvin' },
      { name: 'Kayla', position: 'Coach', img: 'p_5_6', route: 'kayla' },
    ],
    currentCoach: null,
  },
  reducers: {
    setCurrentCoach: (state, action) => {
      state.currentCoach = action.payload
    },
  },
})

export const { setCurrentCoach } = coachSlice.actions

export const selectCoaches = (state: RootState) => state.coach.coaches

export default coachSlice.reducer
