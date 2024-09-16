import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import NavBar from './components/NavBar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Student from './pages/Student'
import Attendance from './pages/Attendance'
import { ThemeProvider } from "./components/ui/theme-provider"

function App() {
  const location = useLocation()

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="bg-background min-h-screen">
        <NavBar />
        <div className="ml-0 md:ml-64 p-4 transition-all duration-300 ease-in-out">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/students" element={<Student />} />
                <Route path="/dashboard/attendance" element={<Attendance />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App