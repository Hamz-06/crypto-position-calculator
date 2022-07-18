
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
}

 const userIdSlice = createSlice({
  name: 'userId',
  initialState,
  reducers: {
    setUserId: (state,action) => {
  
      state.value = action.payload
           
    },

  },
})


// Action creators are generated for each case reducer function
export const { setUserId } = userIdSlice.actions

export default userIdSlice.reducer
