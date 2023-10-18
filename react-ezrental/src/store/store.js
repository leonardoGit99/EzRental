import { configureStore } from '@reduxjs/toolkit';
import editSlice from './slices/editSlice';

export default configureStore({
    reducer: {
        edit: editSlice,
    }
});
