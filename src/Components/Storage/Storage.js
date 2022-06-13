import { configureStore } from '@reduxjs/toolkit'
import Reducers from './Chartclicked_data'
//import Reducers from "./Calculator_data";
export const Store = configureStore({
  reducer: {
    chartClicked: Reducers,

    
  },
})