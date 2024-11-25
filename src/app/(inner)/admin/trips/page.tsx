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

interface Trip {
  id: number
  driverName: string
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
        { id: 1, driverName: 'John Doe', startLocation: 'Berlin', endLocation: 'Hamburg', startDate: '2023-05-01', status: 'Completed' },
        { id: 2, driverName: 'Jane Smith', startLocation: 'Munich', endLocation: 'Frankfurt', startDate: '2023-05-15', status: 'In Progress' },
        { id: 3, driverName: 'Mike Johnson', startLocation: 'Cologne', endLocation: 'Stuttgart', startDate: '2023-05-30', status: 'Scheduled' },
      ]
      setTrips(mockTrips)
    }

    fetchTrips()
  }, [])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h1 className="text-3xl font-bold">Trips</h1>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" /> Add New Trip
      </Button>
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
              <TableCell>{trip.driverName}</TableCell>
              <TableCell>{trip.startLocation}</TableCell>
              <TableCell>{trip.endLocation}</TableCell>
              <TableCell>{trip.startDate}</TableCell>
              <TableCell>{trip.status}</TableCell>
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

