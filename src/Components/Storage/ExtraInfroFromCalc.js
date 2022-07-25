
// data used to pass from chart -> calc
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value: null,
}

 const extraInfoCalctSlice = createSlice({
  name: 'extraInfoCalc',
  initialState,
  reducers: {
    setCalcInfo: (state,action) => {
      
      state.value = action.payload
      
    },
  },
})


// Action creators are generated for each case reducer function
export const { setCalcInfo } = extraInfoCalctSlice.actions

export default extraInfoCalctSlice.reducer
