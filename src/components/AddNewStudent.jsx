import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDispatch } from 'react-redux'
import { createStudent } from '@/redux/studentSlice'
import { useNavigate } from 'react-router-dom'
import { LoaderIcon } from 'lucide-react'

export default function AddNewStudent() {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    setLoading(true)
    dispatch(createStudent(data))
      .unwrap()
      .then(() => {
        console.log("Student added successfully")
        console.log("Student Data", data)
        reset()
        setLoading(false)
        setOpen(false)
        toast({
          title: "New Student Added"
        })
      })
      .catch((error) => {
        console.error("Error adding student:", error)
        setLoading(false)
        toast({
          title: "Error",
          description: "Failed to add student",
          variant: "destructive"
        })
      })
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add New Student</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-foreground">Full Name</label>
                  <Input
                    placeholder='Ex. DB Cooper'
                    {...register('name', { required: true })}
                    className="mt-1"
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">Name is required</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Select Grade</label>
                  <select
                    className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-input bg-background focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md'
                    {...register('grade', { required: true })}
                  >
                    <option value=''>Select Grade</option>
                    <option value='5th'>5th</option>
                    <option value='6th'>6th</option>
                    <option value='7th'>7th</option>
                  </select>
                  {errors.grade && <p className="text-destructive text-xs mt-1">Grade is required</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Contact Number</label>
                  <Input
                    type="number"
                    placeholder='Ex. 9372618364'
                    {...register('contact', { required: true })}
                    className="mt-1"
                  />
                  {errors.contact && <p className="text-destructive text-xs mt-1">Contact is required</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Address</label>
                  <Input
                    placeholder='Ex. 420 Street Lane'
                    {...register('address', { required: true })}
                    className="mt-1"
                  />
                  {errors.address && <p className="text-destructive text-xs mt-1">Address is required</p>}
                </div>
                <div className='flex gap-3 items-center justify-end mt-5'>
                  <Button type="button" onClick={() => setOpen(false)} variant="outline">Cancel</Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <LoaderIcon className='animate-spin mr-2' />
                    ) : null}
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </motion.form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}