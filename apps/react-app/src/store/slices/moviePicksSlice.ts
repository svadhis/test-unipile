import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { setErrorMessage } from './errorSlice'
import { MoviePicker } from '../../MoviePicker/MoviePicker'
import { LocalMoviePickRepo } from '../../MoviePicker/LocalMoviePickRepo'
import DI from '../../utilities/DI'
import { MemoryMoviePickRepo } from '../../MoviePicker/MemoryMoviePickRepo'
import { MoviePickRepo } from '../../MoviePicker/MoviePickRepo'

export interface MoviePicksState {
  value: string[],
}

const initialState: MoviePicksState = {
  value: []
}
const moviePickRepo: MoviePickRepo = DI.get('MoviePickRepo', LocalMoviePickRepo);
const moviePicker: MoviePicker = DI.get('MoviePicker', MoviePicker);

export const moviePicksSlice = createSlice({
  name: 'moviePicks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPicks.fulfilled, (state, action: PayloadAction<string[] | undefined>) => {
      state.value = action.payload ?? [];
    }),
    builder.addCase(setPick.fulfilled, (state, action: PayloadAction<string[] | undefined>) => {
      state.value = action.payload ?? [];
    })
  }
})

export default moviePicksSlice.reducer;

export const getPicks = createAsyncThunk(
  'getPicks',
  async (undefined, {dispatch}) => {
    try {
      const moviePicks = await moviePicker.getPicks();
      return moviePicks;
    } catch (error) {
      dispatch(setErrorMessage(error as Error));
      throw error
    }

  }
)

export const setPick = createAsyncThunk(
  'setPick',
  async (movieName: string, {dispatch}) => {
    try {
      const moviePicks = await moviePicker.pick(movieName);
      return moviePicks;
    } catch (error) {
      dispatch(setErrorMessage(error as Error));
      throw error
    }

  }
)