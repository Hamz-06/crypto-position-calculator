import { configureStore } from '@reduxjs/toolkit'
import chartClickedReducer from './Chartclicked_data'
import userEmailReducer from './UserEmail'
import userIdSlicer from './UserId'
import newTradeSlice from './NewTrade'
import extraInfoSlice from './ExtraInfoFromChart'
import allTradesSlice from './AllTrades'
import paramClickSlice from './ParamClickChart'
import extraInfoCalctSlice from './ExtraInfroFromCalc'
import cryptoCoinSlice from './CryptoCoin'
import loadingSlice from './loading'
export const Store = configureStore({
  reducer: {
    chartClicked: chartClickedReducer,
    userData: userEmailReducer,
    userId: userIdSlicer,
    newTrade: newTradeSlice,
    extraInfo: extraInfoSlice,
    allTrades: allTradesSlice,
    paramClick: paramClickSlice,
    calcInfo: extraInfoCalctSlice,
    cryptoCoin: cryptoCoinSlice,
    loading: loadingSlice,

  },
})