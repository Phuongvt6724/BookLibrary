import { createSlice } from "@reduxjs/toolkit";

const suggestSlice = createSlice({
  name: "suggest",
  initialState: {
    selectedSuggest: false,
  },
  reducers: {
    setSuggest: (state, action) => {
      state.selectedSuggest = action.payload;
    },
  },
});

export const { setSuggest } = suggestSlice.actions;
export default suggestSlice.reducer;
