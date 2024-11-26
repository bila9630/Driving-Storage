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
import { Badge } from "@/components/ui/badge"
import { pb } from '@/lib/pocketbase'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Add this driver mapping
const DRIVER_DETAILS: Record<string, { role: string; avatar: string }> = {
    'John Doe': {
        role: 'Senior Driver',
        avatar: '/avatars/02.png'
    },
    'Jane Smith': {
        role: 'Junior Driver',
        avatar: '/avatars/03.png'
    },
    'Mike Johnson': {
        role: 'Mid-Level Driver',
        avatar: '/avatars/04.png'
    }
}

interface Trip {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    start_location: string
    end_location: string
    start_date: string
    status: 'Completed' | 'In Progress' | 'Scheduled'
    driver: string
    // Virtual properties
    driverRole?: string
    driverAvatar?: string
}

export default function TripsPage() {
    const [trips, setTrips] = useState<Trip[]>([])
    const [loading, setLoading] = useState(true)
    const [tripToDelete, setTripToDelete] = useState<string | null>(null)

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const resultList = await pb.collection('trip').getList<Trip>(1, 50, {
                    sort: '-start_date'
                });
                
                // Enhance trips with driver details
                const enhancedTrips = resultList.items.map(trip => ({
                    ...trip,
                    driverRole: DRIVER_DETAILS[trip.driver]?.role || 'Unknown Role',
                    driverAvatar: DRIVER_DETAILS[trip.driver]?.avatar || '/avatars/default.png'
                }));
                
                setTrips(enhancedTrips)
            } catch (error) {
                console.error('Error fetching trips:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTrips()
    }, [])

    const getStatusBadge = (status: Trip['status']) => {
        switch (status) {
            case 'Completed':
                return <Badge className="bg-green-500">Completed</Badge>
            case 'In Progress':
                return <Badge className="bg-blue-500">In Progress</Badge>
            case 'Scheduled':
                return <Badge className="bg-yellow-500">Scheduled</Badge>
        }
    }

    const handleDelete = async () => {
        if (!tripToDelete) return

        try {
            await pb.collection('trip').delete(tripToDelete)
            setTrips(trips.filter(trip => trip.id !== tripToDelete))
        } catch (error) {
            console.error('Error deleting trip:', error)
        } finally {
            setTripToDelete(null)
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
                                        <AvatarImage src={trip.driverAvatar} alt={`${trip.driver}'s avatar`} />
                                        <AvatarFallback>{trip.driver.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div>{trip.driver}</div>
                                        <div className="text-sm text-gray-500">{trip.driverRole}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{trip.start_location}</TableCell>
                            <TableCell>{trip.end_location}</TableCell>
                            <TableCell>{new Date(trip.start_date).toLocaleDateString()}</TableCell>
                            <TableCell>
                                {getStatusBadge(trip.status)}
                            </TableCell>
                            <TableCell>
                                <Button variant="outline" size="icon" className="mr-2">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="icon"
                                    onClick={() => setTripToDelete(trip.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <AlertDialog open={!!tripToDelete} onOpenChange={(open) => !open && setTripToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the trip
                            from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

