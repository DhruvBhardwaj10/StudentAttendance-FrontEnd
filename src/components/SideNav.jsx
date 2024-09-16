import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Hand, LayoutIcon, BookOpen } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function SideNav() {
    const location = useLocation()
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutIcon,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Students',
            icon: GraduationCap,
            path: '/dashboard/students'
        },
        {
            id: 3,
            name: 'Attendance',
            icon: Hand,
            path: '/dashboard/attendance'
        },
    ]

    return (
        <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-full bg-card text-card-foreground shadow-lg"
        >
            <div className="flex items-center justify-center h-16 border-b border-border">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold text-primary">EduTrack</span>
            </div>
            <nav className="flex-1 overflow-y-auto">
                {menuList.map((menu) => (
                    <Link to={menu.path} key={menu.id}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center px-4 py-3 text-sm font-medium ${
                                location.pathname === menu.path
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            } transition-colors duration-200`}
                        >
                            <menu.icon className="h-5 w-5 mr-3" />
                            {menu.name}
                        </motion.div>
                    </Link>
                ))}
            </nav>
        </motion.div>
    )
}