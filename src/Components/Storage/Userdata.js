
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value: '',
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
