import { configureStore } from "@reduxjs/toolkit";
import componenteSlice from "./slices/componentSlice";


const store = configureStore({
  reducer: {
    componente: componenteSlice, // Añade el reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;