import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BasicMovie } from '../../entities/Movie'
import { Omdb } from '../../services/Omdb'
import { LoadingState } from '../../utilities/LoadingState'
import { setErrorMessage } from './errorSlice'

export interface MovieListState {
  value: BasicMovie[],
  loading: LoadingState
}

const initialState: MovieListState = {
  value: [],
  loading: LoadingState.idle,
}

export const movieListSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchMovies.fulfilled, (state, action: PayloadAction<BasicMovie[] | undefined>) => {
      state.value = action.payload ?? [];
      state.loading = LoadingState.idle;
    }),
    builder.addCase(searchMovies.pending, (state) => {
      state.loading = LoadingState.pending;
    })
    builder.addCase(searchMovies.rejected, (state) => {
      state.loading = LoadingState.idle;
    })
  },
})

export default movieListSlice.reducer;

export const searchMovies = createAsyncThunk(
  'searchMovies',
  async (query: string, {dispatch}) => {
    try {
      const omdb = new Omdb();
      const movieList = await omdb.searchMovies(query);
      return movieList
    } catch (error) {
      dispatch(setErrorMessage(error as Error))
      throw error
    }

  }
)