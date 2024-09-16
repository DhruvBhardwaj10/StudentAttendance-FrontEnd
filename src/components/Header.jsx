'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { UserButton, SignInButton, SignUpButton, useUser } from '@clerk/clerk-react'
import { Button } from './ui/button'
import { CalendarCheck, Users, BarChart, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Header() {
  const { isSignedIn } = useUser()

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 shadow-sm border-b border-border flex justify-between items-center h-16 bg-background"
    >
      <div className="flex items-center space-x-4">
        {!isSignedIn ? (
          <>
            <SignUpButton mode="modal">
              <Button variant="outline">Sign Up</Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <UserButton afterSignOutUrl="/" />
            <h2 className="text-xl font-bold">My Account</h2>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
        >
          <CalendarCheck className="h-4 w-4" />
          <span className="text-sm font-medium">Today's Attendance</span>
        </motion.div>
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <Link to="/dashboard/students">
            <Users className="h-5 w-5 text-green-500" />
            <span className="text-xs font-medium mt-1">Students</span>
            </Link>
          </motion.div>
       
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <Link to="/dashboard">
            <BarChart className="h-5 w-5 text-purple-500" />
            <span className="text-xs font-medium mt-1">Dashboard</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <Link to="/dashboard/attendance">
            <GraduationCap className="h-5 w-5 text-orange-500" />
            <span className="text-xs font-medium mt-1">Attendance</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}