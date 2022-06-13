
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value: true,
}

 const chartClickedSlice = createSlice({
  name: 'chartClicked',
  initialState,
  reducers: {
    displayChart: (state,action) => {
      
      state.value = action.payload
    },

  },
})


// Action creators are generated for each case reducer function
export const { displayChart } = chartClickedSlice.actions

export default chartClickedSlice.reducer
