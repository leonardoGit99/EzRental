import { createSlice } from '@reduxjs/toolkit';

const editSlice = createSlice({
  name: 'edit',
  initialState: false, // Valor inicial
  reducers: {
    setIsEditing: (state, action) => {
      return action.payload; // Cambia el valor de isEdit
    },
  },
});

export const { setIsEditing } = editSlice.actions;
export default editSlice.reducer;