import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { Search, Trash } from 'lucide-react'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDispatch, useSelector } from 'react-redux'
import { deleteStudent, fetchStudents } from '../redux/studentSlice'

export default function StudentListTable({ studentList }) {
    const dispatch = useDispatch()
    const { status, error } = useSelector((state) => state.students)
    const { toast } = useToast()

    const [selectedStudentId, setSelectedStudentId] = useState(null)

    const deleteRecord = (studentId) => {
        console.log("Deleting studentId:", studentId)

        const numericId = Number(studentId)
        if (!isNaN(numericId)) {
            console.log("Dispatching deleteStudent with numericId:", numericId)
            dispatch(deleteStudent(numericId))
            toast({
                title: "Student Record Deleted successfully"
            })
        } else {
            console.error("Invalid student ID:", studentId)
        }
    }

    const CustomButtons = (props) => {
        return (
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button variant="destructive"><Trash className="h-4 w-4" /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your record
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteRecord(props.data.studentId)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    const pagination = true
    const paginationPageSize = 10
    const paginationPageSizeSelector = [25, 50, 100]

    const [colDefs, setColDefs] = useState([
        { field: "studentId", headerName: "Student ID", filter: true },
        { field: "name", headerName: "Name", filter: true },
        { field: "address", headerName: "Address", filter: true },
        { field: "contact", headerName: "Contact", filter: true },
        { field: 'action', headerName: "Action", cellRenderer: CustomButtons, width: 100 }
    ])

    const [rowData, setRowData] = useState()
    const [searchInput, setSearchInput] = useState()

    const handleCellClick = (event) => {
        const studentId = event.data.studentId
        setSelectedStudentId(studentId)
        console.log("Selected student ID from row click:", studentId)
    }

    useEffect(() => {
        if (studentList) {
            const formattedData = studentList.map(student => ({
                ...student,
                studentId: Number(student.studentId)
            }))
            setRowData(formattedData)
        }
    }, [studentList])

    useEffect(() => {
        dispatch(fetchStudents())
    }, [dispatch])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='my-7'
        >
            <div
                className="ag-theme-alpine dark:ag-theme-alpine-dark"
                style={{ height: 500, width: '100%' }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm'
                >
                    <Search className="text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search on Anything..."
                        className='outline-none w-full bg-transparent'
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                </motion.div>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    quickFilterText={searchInput}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                    onCellClicked={handleCellClick}
                    animateRows={true}
                    defaultColDef={{
                        flex: 1,
                        minWidth: 100,
                        filter: true,
                    }}
                />
            </div>
        </motion.div>
    )
}