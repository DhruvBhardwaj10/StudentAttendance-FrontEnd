import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base API URL
const API_URL = 'https://studentattendance-backend.onrender.com/api/attendance'; // Adjust to your API endpoint

// Thunk to create a new attendance record
export const createAttendance = createAsyncThunk(
  'attendance/createAttendance',
  async ({ studentId, attendanceData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create/${studentId}`, attendanceData);
      return response.data; // Return the entire response data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to fetch all attendance records
export const fetchAttendances = createAsyncThunk(
  'attendance/fetchAttendances',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/get`);
      return response.data; // Return the entire response data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to fetch attendance by studentId
export const fetchAttendanceByStudentId = createAsyncThunk(
  'attendance/fetchAttendanceByStudentId',
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/get/${studentId}`);
      return response.data; // Return the entire response data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to delete attendance by studentId, day, and date
export const deleteAttendanceByStudentIdAndDayAndDate = createAsyncThunk(
  'attendance/deleteAttendanceByStudentIdAndDayAndDate',
  async ({ studentId, day, date }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${studentId}`, { data: { day, date } });
      return { studentId, day, date, message: response.data.message }; // Return studentId, day, date, and success message
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to fetch total present count by day and date
export const fetchTotalPresentCountByDayAndDate = createAsyncThunk(
  'attendance/fetchTotalPresentCountByDayAndDate',
  async ({ grade, day, date }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/total-present-count`, {
        params: {
          grade,
          day,
          date
        }
      });
      return response.data; // Return the total count
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to get present count for the first 7 days of the month based on grade
export const getPresentCountForMonth = createAsyncThunk(
  'attendance/getPresentCountForMonth',
  async ({ grade, month }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/getPresentCountForMonth`, { grade, date: month });
      console.log("Present Count",response);
      return response.data; // Return the present count for each day
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    attendances: [],
    totalPresentCount: 0,
    presentCountByDay: [], // New state for present count by day
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Add any synchronous actions here if needed
  },
  extraReducers: (builder) => {
    // Handling createAttendance actions
    builder
      .addCase(createAttendance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.attendances.push(action.payload); // Add the new attendance record to the list
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Handling fetchAttendances actions
    builder
      .addCase(fetchAttendances.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAttendances.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.attendances = action.payload; // Update state with fetched attendance records
      })
      .addCase(fetchAttendances.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Handling fetchAttendanceByStudentId actions
    builder
      .addCase(fetchAttendanceByStudentId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAttendanceByStudentId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update specific attendance or add if not exist
        const existingIndex = state.attendances.findIndex(
          (attendance) => attendance.studentId === action.payload.studentId
        );
        if (existingIndex >= 0) {
          state.attendances[existingIndex] = action.payload;
        } else {
          state.attendances.push(action.payload);
        }
      })
      .addCase(fetchAttendanceByStudentId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Handling deleteAttendanceByStudentIdAndDayAndDate actions
    builder
      .addCase(deleteAttendanceByStudentIdAndDayAndDate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAttendanceByStudentIdAndDayAndDate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.attendances = state.attendances.filter(
          (attendance) => !(attendance.studentId === action.payload.studentId && attendance.day === action.payload.day && attendance.date === action.payload.date)
        ); // Remove the deleted attendance from state based on studentId, day, and date
      })
      .addCase(deleteAttendanceByStudentIdAndDayAndDate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Handling fetchTotalPresentCountByDayAndDate actions
    builder
      .addCase(fetchTotalPresentCountByDayAndDate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTotalPresentCountByDayAndDate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.totalPresentCount = action.payload.count; // Update the total present count
      })
      .addCase(fetchTotalPresentCountByDayAndDate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Handling getPresentCountForMonth actions
    builder
      .addCase(getPresentCountForMonth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPresentCountForMonth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.presentCountByDay = action.payload; // Update state with present count by day
      })
      .addCase(getPresentCountForMonth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
