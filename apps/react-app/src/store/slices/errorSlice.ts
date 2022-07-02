import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ErrorState {
  message: string | undefined
}

const initialState: ErrorState = {
  message: undefined
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setErrorMessage(state, action: PayloadAction<Error>) {
      state.message = action.payload.message;
    },
    clearErrorMessage(state) {
      state.message = undefined;
    },
  },
})

export const { setErrorMessage, clearErrorMessage } = errorSlice.actions

export default errorSlice.reducer;