import { configureStore } from '@reduxjs/toolkit'
import chartClickedReducer from './Chartclicked_data'
import userDataReducer from './Userdata'
import userIdSlicer from './UserId'
import newTradeSlice from './NewTrade'
import extraInfoSlice from './ExtraInfo'

export const Store = configureStore({
  reducer: {
    chartClicked: chartClickedReducer,
    userData: userDataReducer,
    userId:userIdSlicer,
    newTrade:newTradeSlice,
    extraInfo:extraInfoSlice,
  },
})