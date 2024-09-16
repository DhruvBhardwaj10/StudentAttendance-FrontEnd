import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import MonthSelection from '@/components/MonthSelection'
import GradeSelection from '@/components/GradeSelection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudentsByGradeAndMonth } from '@/redux/studentSlice'
import moment from 'moment'
import AttendanceGrid from '@/components/AttendanceGrid'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState()
  const [selectedGrade, setSelectedGrade] = useState()
  const [attendanceList, setAttendanceList] = useState([])
  const dispatch = useDispatch()

  const studentData = useSelector((state) => state.students.students)
  const isLoading = useSelector((state) => state.students.status === 'loading')
  const error = useSelector((state) => state.students.error)

  useEffect(() => {
    console.log('Student Data:', studentData)
    console.log('Is Loading:', isLoading)
    console.log('Error:', error)

    if (studentData && studentData.length > 0) {
      setAttendanceList(studentData)
    }
  }, [studentData, isLoading, error])

  const searchHandler = () => {
    if (!selectedMonth || !selectedGrade) {
      console.error('Month or Grade not selected')
      return
    }

    const formattedMonth = moment(selectedMonth).format('MMMM YYYY').trim()
    const cleanGrade = selectedGrade.toString().trim()

    console.log('Selected Month:', formattedMonth)
    console.log('Selected Grade:', cleanGrade)

    dispatch(fetchStudentsByGradeAndMonth({ grade: cleanGrade, month: formattedMonth }))
  }

  useEffect(() => {
    if (selectedMonth && selectedGrade) {
      searchHandler()
    }
  }, [selectedMonth, selectedGrade])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-5 my-5"
          >
            <div className="flex gap-2 items-center">
              <label className="font-medium text-foreground">Select Month:</label>
              <MonthSelection selectedMonth={setSelectedMonth} />
            </div>
            <div className="flex gap-2 items-center">
              <label className="font-medium text-foreground">Select Grade:</label>
              <GradeSelection selectedGrade={setSelectedGrade} />
            </div>
            <Button onClick={searchHandler} className="bg-primary hover:bg-primary/90 transition-colors duration-200">
              Search
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth} />
      </motion.div>
    </motion.div>
  )
}