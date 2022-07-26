
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value:{
    price:'',
    time:''
  }
}

 const paramClickSlice = createSlice({
  name: 'ParamClicked',
  initialState,
  reducers: {
    setParamClick: (state,action) => {
      
      state.value = action.payload
    },

  },
})


// Action creators are generated for each case reducer function
export const { setParamClick } = paramClickSlice.actions

export default paramClickSlice.reducer
