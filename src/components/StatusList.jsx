import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StatusList({ studentsData }) {
    const [totalStudents, setTotalStudents] = useState(0)
    const [presentPercentage, setPresentPercentage] = useState(0)

    useEffect(() => {
        if (studentsData && studentsData.length > 0) {
            const total = studentsData.length
            setTotalStudents(total)

            const today = new Date().getDate()
            const totalPresentDays = studentsData.reduce((acc, student) => {
                return acc + student.attendanceDetails.filter(detail => detail.present).length
            }, 0)

            const totalPossibleDays = total * today
            const percentage = (totalPresentDays / totalPossibleDays) * 100
            setPresentPercentage(percentage.toFixed(2))
        }
    }, [studentsData])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='grid grid-cols-1 md:grid-cols-3 gap-6'
        >
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                        className="text-2xl font-bold text-primary"
                    >
                        {totalStudents}
                    </motion.div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Present Percentage</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
                        className="text-2xl font-bold text-green-600"
                    >
                        {presentPercentage}%
                    </motion.div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Absent Percentage</CardTitle>
                    <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
                        className="text-2xl font-bold text-red-600"
                    >
                        {(100 - presentPercentage).toFixed(2)}%
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    )
}