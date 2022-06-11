import { configureStore } from '@reduxjs/toolkit'
import Reducers from './Actions'

export const Store = configureStore({
  reducer: {
    counter: Reducers,
    
  },
})