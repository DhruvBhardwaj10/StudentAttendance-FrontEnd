import React from 'react'
import { motion } from 'framer-motion'
import { UserButton } from '@clerk/clerk-react'
import SideNav from './SideNav'
import Header from './Header'

export default function NavBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="md:w-64 fixed hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
      </div>
    </motion.div>
  )
}