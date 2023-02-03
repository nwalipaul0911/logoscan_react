import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name : 'result',
  initialState: [],
  reducers: {
    setResults : (state, action)=>{
      state = action.payload
    }
  }
})
export const { setResults } = resultSlice.actions;
export default resultSlice.reducer;