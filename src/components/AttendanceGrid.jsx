import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { createAttendance, deleteAttendanceByStudentIdAndDayAndDate } from '../redux/attendanceSlice'
import { useToast } from "@/components/ui/use-toast"

export default function AttendanceGrid({ attendanceList, selectedMonth }) {
  const [rowData, setRowData] = useState([])
  const [colDefs, setColDefs] = useState([
    { field: 'studentId', headerName: 'Student ID', filter: true },
    { field: 'name', headerName: 'Name', filter: true }
  ])
  
  const pagination = true
  const paginationPageSize = 10
  const paginationPageSizeSelector = [25, 50, 100]

  const dispatch = useDispatch()
  const { toast } = useToast()

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const numberOfDays = daysInMonth(
    moment(selectedMonth).format('YYYY'),
    moment(selectedMonth).format('MM') - 1
  )

  const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1)

  const isPresent = (studentId, day) => {
    const student = attendanceList.find(item => item.studentId === studentId)
    if (!student || !student.attendanceDetails) return false
    const attendanceForDay = student.attendanceDetails.find(detail => detail.day === day)
    return attendanceForDay ? attendanceForDay.present : false
  }

  const updateAttendanceList = (list) => {
    return list.map((obj) => {
      const newObj = { ...obj }
      daysArray.forEach((date) => {
        newObj[date] = isPresent(obj.studentId, date)
      })
      return newObj
    })
  }

  const onMarkAttendance = (day, studentId, presentStatus) => {
    const date = moment(selectedMonth).format('MMMM YYYY')
    if (presentStatus) {
      const attendanceData = {
        day,
        present: presentStatus,
        date,
      }
      dispatch(createAttendance({ studentId, attendanceData }))
      toast({
        title: `Attendance Marked`,
        description: `Student ID: ${studentId} marked as ${presentStatus ? 'Present' : 'Absent'} for ${day} ${date}`,
      })
    } else {
      dispatch(deleteAttendanceByStudentIdAndDayAndDate({ studentId, day, date }))
      toast({
        title: `Attendance Deleted`,
        description: `Attendance record for Student ID: ${studentId} on ${day} ${date} has been deleted.`,
      })
    }
  }

  useEffect(() => {
    if (attendanceList && attendanceList.length > 0) {
      const updatedAttendanceList = updateAttendanceList(attendanceList)
      setRowData(updatedAttendanceList)

      setColDefs([
        { field: 'studentId', headerName: 'Student ID' },
        { field: 'name', headerName: 'Name' },
        ...daysArray.map((date) => ({
          field: date.toString(),
          headerName: date.toString(),
          width: 50,
          editable: true,
          cellRendererFramework: (params) => (
            <input
              type="checkbox"
              checked={params.value || false}
              onChange={() => {
                const newValue = !params.value
                const updatedData = { ...params.data }
                updatedData[params.colDef.field] = newValue
                params.api.applyTransaction({ update: [updatedData] })
              }}
            />
          ),
        })),
      ])
    }
  }, [attendanceList, selectedMonth])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="ag-theme-quartz"
        style={{ height: 500 }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          onCellValueChanged={(e) => {
            const day = parseInt(e.colDef.field, 10)
            const studentId = e.data.studentId
            const presentStatus = e.newValue
            onMarkAttendance(day, studentId, presentStatus)
          }}
          defaultColDef={{
            editable: true,
            resizable: true,
            sortable: true,
          }}
        />
      </div>
    </motion.div>
  )
}