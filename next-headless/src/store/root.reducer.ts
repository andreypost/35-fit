import { combineReducers } from "@reduxjs/toolkit";
import modalSlice from "slices/modal.slice";
import coachSlice from "slices/coach.slice";
import actionSlice from "slices/action.slice";
import fileDataSlice from "slices/fileData.slice";
import databaseUserSlice from "slices/databaseUser.slice";

export const rootReducer = combineReducers({
  modal: modalSlice,
  action: actionSlice,
  coach: coachSlice,
  fileData: fileDataSlice,
  databaseUser: databaseUserSlice,
});

export default rootReducer;
