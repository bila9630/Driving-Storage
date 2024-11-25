"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Trip {
  id: number
  driverName: string
  driverRole: string
  driverAvatar: string
  startLocation: string
  endLocation: string
  startDate: string
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled'
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([])

  useEffect(() => {
    // Simulating API call to fetch trips
    const fetchTrips = async () => {
      // Replace this with actual API call
      const mockTrips: Trip[] = [
        { 
          id: 1, 
          driverName: 'John Doe',
          driverRole: 'Senior Driver',
          driverAvatar: '/avatars/01.png',
          startLocation: 'Berlin', 
          endLocation: 'Hamburg', 
          startDate: '2023-05-01', 
          status: 'Completed' 
        },
        { id: 2, driverName: 'Jane Smith', driverRole: 'Junior Driver', driverAvatar: '/avatars/02.png', startLocation: 'Munich', endLocation: 'Frankfurt', startDate: '2023-05-15', status: 'In Progress' },
        { id: 3, driverName: 'Mike Johnson', driverRole: 'Mid-Level Driver', driverAvatar: '/avatars/03.png', startLocation: 'Cologne', endLocation: 'Stuttgart', startDate: '2023-05-30', status: 'Scheduled' },
      ]
      setTrips(mockTrips)
    }

    fetchTrips()
  }, [])

  const getStatusStyle = (status: Trip['status']) => {
    switch (status) {
      case 'Completed':
        return 'border-gray-500 text-gray-500'
      case 'In Progress':
        return 'border-yellow-500 text-yellow-500'
      case 'Scheduled':
        return 'border-indigo-500 text-indigo-500'
      case 'Cancelled':
        return 'border-red-500 text-red-500'
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Trips</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Trip
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Driver</TableHead>
            <TableHead>Start Location</TableHead>
            <TableHead>End Location</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip.id}>
              <TableCell>
                <div className="flex items-center">
                  <Avatar className="mr-2">
                    <AvatarImage src={trip.driverAvatar} alt={`${trip.driverName}'s avatar`} />
                    <AvatarFallback>{trip.driverName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{trip.driverName}</div>
                    <div className="text-sm text-gray-500">{trip.driverRole}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{trip.startLocation}</TableCell>
              <TableCell>{trip.endLocation}</TableCell>
              <TableCell>{trip.startDate}</TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={cn(
                    "border bg-background hover:bg-background",
                    getStatusStyle(trip.status)
                  )}
                >
                  {trip.status}
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="icon" className="mr-2">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

