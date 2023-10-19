import { createSlice } from '@reduxjs/toolkit';

const editRentalFormSlice = createSlice({
  name: 'editRentalForm',
  initialState: false, // Valor inicial
  reducers: {
    setIsEditingRentalForm: (state, action) => {
      return action.payload; // Cambia el valor de isEdit
    },
  },
});

export const { setIsEditingRentalForm } = editRentalFormSlice.actions;
export default editRentalFormSlice.reducer;
