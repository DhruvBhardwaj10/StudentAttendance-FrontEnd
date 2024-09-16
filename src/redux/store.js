import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentSlice'; // Adjust the import path
import attendanceReducer from './attendanceSlice';
const store = configureStore({
  reducer: {
    students: studentReducer,
    attendance: attendanceReducer
   
  },
});

export default store;
