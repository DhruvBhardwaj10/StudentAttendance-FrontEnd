import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base API URL
const API_URL = 'https://studentattendance-backend.onrender.com/api/students'; // Adjust to your API endpoint

// Thunk to create a new student
export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, studentData);
      return response.data.student;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to fetch all students
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/get`);
      return response.data.students;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to delete a student by ID
export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (studentId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete/${studentId}`); // No conversion needed
      return studentId; // Return the numeric ID
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to fetch students by grade and month
export const fetchStudentsByGradeAndMonth = createAsyncThunk(
  'students/fetchStudentsByGradeAndMonth',
  async ({ grade, month }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/grade/${grade}/date/${month}`);
      console.log('API Response:', response.data); // Debug API response
      
      // Assuming response.data contains the list of students
      return response.data; // Return data directly if it is the list of students
    } catch (error) {
      console.error('Fetch Students Error:', error); // Debug fetch error
      return rejectWithValue(error.response.data);
    }
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handling createStudent actions
    builder
      .addCase(createStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students.push(action.payload); // Add the new student to the list
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Handling fetchStudents actions
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload; // Update state with fetched students
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Handling deleteStudent actions
    builder
      .addCase(deleteStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted student from the list by filtering
        state.students = state.students.filter(student => student.studentId !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Handling fetchStudentsByGradeAndMonth actions
    builder
      .addCase(fetchStudentsByGradeAndMonth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudentsByGradeAndMonth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Assuming response.data is the list of students
        state.students = action.payload; // Directly use payload if it is the list of students
      })
      .addCase(fetchStudentsByGradeAndMonth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
