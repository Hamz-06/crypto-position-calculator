
// data used to pass from chart -> calc
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value: null,
}

 const extraInfoChartSlice = createSlice({
  name: 'extraInfo',
  initialState,
  reducers: {
    setExtraInfo: (state,action) => {
      
      state.value = action.payload
    },

  },
})


// Action creators are generated for each case reducer function
export const { setExtraInfo } = extraInfoChartSlice.actions

export default extraInfoChartSlice.reducer
