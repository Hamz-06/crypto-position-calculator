import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    value: false,
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {

            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer
