import { configureStore } from '@reduxjs/toolkit'
import movieDetailsReducer from './slices/movieDetailsSlice'
import movieListReducer from './slices/movieListSlice'
import errorReducer from './slices/errorSlice'
import moviePicksReducer from './slices/moviePicksSlice'

export const store = configureStore({
  reducer: {
    movieDetails: movieDetailsReducer,
    movieList: movieListReducer,
    moviePicks: moviePicksReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch