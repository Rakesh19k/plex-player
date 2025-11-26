import { configureStore } from '@reduxjs/toolkit'
import homeSliceReducer from './reducers/homeReducer'
import authSliceReducer from './reducers/userReducer'


export const store = configureStore({
  reducer: {
    authReducer: authSliceReducer,
    homeReducer: homeSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch