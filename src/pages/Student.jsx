import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import AddNewStudent from '@/components/AddNewStudent'
import { fetchStudents } from '@/redux/studentSlice'
import StudentListTable from '@/components/StudentListTable'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Student() {
  const dispatch = useDispatch()

  const studentList = useSelector((state) => state.students.students)
  const status = useSelector((state) => state.students.status)
  const error = useSelector((state) => state.students.error)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudents())
    }
  }, [dispatch, status])

  console.log(studentList)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl font-bold text-primary">Students</CardTitle>
          <AddNewStudent />
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <StudentListTable studentList={studentList} />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}