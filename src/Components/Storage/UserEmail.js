
import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';

const initialState = {
  value: null,
}

 const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state,action) => {
      
      state.value = action.payload
     
      
    },

  },
})





// Action creators are generated for each case reducer function
export const { setUserData } = userDataSlice.actions

export default userDataSlice.reducer
