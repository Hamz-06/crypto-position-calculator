import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value: null,
}

 const allTradesSlice = createSlice({
  name: 'allTrades',
  initialState,
  reducers: {
    setAllTrades: (state,action) => {
      
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAllTrades } = allTradesSlice.actions

export default allTradesSlice.reducer
