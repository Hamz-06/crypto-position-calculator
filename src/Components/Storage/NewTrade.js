
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value: null,
}

 const newTradeSlice = createSlice({
  name: 'tradeInfo',
  initialState,
  reducers: {
    setNewTrade: (state,action) => {
      
      state.value = action.payload
    },

  },
})


// Action creators are generated for each case reducer function
export const { setNewTrade } = newTradeSlice.actions

export default newTradeSlice.reducer
