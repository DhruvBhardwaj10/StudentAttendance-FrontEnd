import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GradeSelection from '@/components/GradeSelection'
import MonthSelection from '@/components/MonthSelection'
import { useDispatch } from 'react-redux'
import { fetchStudentsByGradeAndMonth } from '../redux/studentSlice'
import { useToast } from "@/components/ui/use-toast"
import moment from 'moment'
import StatusList from '@/components/StatusList'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState()
  const [selectedGrade, setSelectedGrade] = useState()
  const [studentsData, setStudentsData] = useState([])
  const dispatch = useDispatch()
  const { toast } = useToast()

  const getStudentAttendance = () => {
    if (selectedMonth && selectedGrade) {
      const formattedMonth = moment(selectedMonth, 'YYYY-MM').format('MMMM YYYY')

      dispatch(fetchStudentsByGradeAndMonth({ month: formattedMonth, grade: selectedGrade }))
        .unwrap()
        .then(response => {
          setStudentsData(response)
          toast({
            title: 'Student Attendance Fetched',
            description: `Attendance data for ${selectedGrade} in ${formattedMonth} has been successfully fetched.`,
          })
        })
        .catch(error => {
          toast({
            title: 'Error',
            description: `Failed to fetch attendance data: ${error.message}`,
            variant: 'destructive',
          })
        })
    }
  }

  useEffect(() => {
    getStudentAttendance()
  }, [selectedMonth, selectedGrade])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <MonthSelection selectedMonth={setSelectedMonth} />
              <GradeSelection selectedGrade={setSelectedGrade} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <StatusList studentsData={studentsData} />
      </motion.div>
    </motion.div>
  )
}