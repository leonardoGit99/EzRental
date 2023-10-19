import { configureStore } from '@reduxjs/toolkit';
import editRentalFormSlice from './slices/editRentalFormSlice';

export default configureStore({
    reducer: {
        editRentalForm: editRentalFormSlice,
    }
});
