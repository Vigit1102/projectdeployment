import { configureStore } from '@reduxjs/toolkit'
import data from './action'

export const store = configureStore({
  reducer: {
    appStore:data
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 