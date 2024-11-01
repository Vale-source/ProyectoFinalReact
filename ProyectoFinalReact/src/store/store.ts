import { configureStore } from "@reduxjs/toolkit";
import asideSlice from "../features/asideSlice/asideSlice";
import sucursalesReducer from '../features/sucursalSlice/sucursalesSlice';
import conectCompanyBranchSlice from "../features/conectCompanyBranchSlice/conectCompanyBranchSlice";

// ...

export const store = configureStore({
	reducer: {
		asideSlice: asideSlice.reducer,
		sucursales: sucursalesReducer,
		conectCompanyBranchSlice: conectCompanyBranchSlice
	}	
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
