import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root.reducer";

export const store = configureStore({
  reducer: rootReducer,
});

// debug redux actions
// store.subscribe(() => {
//   console.log("Action dispatched:", store.getState());
// });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

/* 
export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
 */
