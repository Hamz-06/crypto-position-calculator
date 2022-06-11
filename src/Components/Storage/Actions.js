
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value: true,
}




 const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    decrement: (state,action) => {
      
      state.value = action.payload
    },

  },
})


// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
