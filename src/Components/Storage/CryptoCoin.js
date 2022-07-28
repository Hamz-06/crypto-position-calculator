
import { createSlice } from '@reduxjs/toolkit';
import { cryptoCoins } from '../ApiReq/PriceData'
const initialState = {
    value:{
        cryptoCoin: cryptoCoins[0].cryptoName,
        cryptoImage: cryptoCoins[0].cryptoImage
    }
}

 const cryptoCoinSlice = createSlice({
  name: 'cryptoCoin',
  initialState,
  reducers: {
    setCoin: (state,action) => {
      
      state.value = action.payload
    },

  },
})


// Action creators are generated for each case reducer function
export const { setCoin } = cryptoCoinSlice.actions

export default cryptoCoinSlice.reducer
