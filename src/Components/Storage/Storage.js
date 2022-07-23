import { configureStore } from '@reduxjs/toolkit'
import chartClickedReducer from './Chartclicked_data'
import userEmailReducer from './UserEmail'
import userIdSlicer from './UserId'
import newTradeSlice from './NewTrade'
import extraInfoSlice from './ExtraInfo'
import allTradesSlice from './AllTrades'

export const Store = configureStore({
  reducer: {
    chartClicked: chartClickedReducer,
    userData: userEmailReducer,
    userId:userIdSlicer,
    newTrade:newTradeSlice,
    extraInfo:extraInfoSlice,
    allTrades:allTradesSlice

  },
})