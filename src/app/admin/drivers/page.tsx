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
import { PlusCircle, Pencil, Trash2, Sun, Moon, Car, Coffee, Power } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Driver {
    id: number
    name: string
    role: string
    avatar: string
    status: 'Driving' | 'On Break' | 'Off Duty'
    location: string
    workingHours: string
    phoneNumber: string
    preferredDrivingTime: ('Morning' | 'Night')[]
}

export default function DriversPage() {
    const [drivers, setDrivers] = useState<Driver[]>([])

    useEffect(() => {
        // Simulating API call to fetch drivers
        const fetchDrivers = async () => {
            // Replace this with actual API call
            const mockDrivers: Driver[] = [
                { 
                    id: 1, 
                    name: 'John Doe', 
                    role: 'Senior Driver',
                    avatar: '/avatars/01.png',
                    status: 'Driving', 
                    location: 'Frankfurt',
                    workingHours: '40 hours',
                    phoneNumber: '+491524578541',
                    preferredDrivingTime: ['Morning', 'Night']
                },
                { 
                    id: 2, 
                    name: 'Jane Smith', 
                    role: 'Junior Driver',
                    avatar: '/avatars/02.png',
                    status: 'On Break', 
                    location: 'Berlin',
                    workingHours: '35 hours',
                    phoneNumber: '+491765432198',
                    preferredDrivingTime: ['Morning']
                },
                { 
                    id: 3, 
                    name: 'Mike Johnson', 
                    role: 'Senior Driver',
                    avatar: '/avatars/03.png',
                    status: 'Off Duty', 
                    location: 'Munich',
                    workingHours: '38 hours',
                    phoneNumber: '+491234567890',
                    preferredDrivingTime: ['Night']
                },
                { 
                    id: 4, 
                    name: 'Emily Brown', 
                    role: 'Junior Driver',
                    avatar: '/avatars/04.png',
                    status: 'Driving', 
                    location: 'Hamburg',
                    workingHours: '42 hours',
                    phoneNumber: '+499876543210',
                    preferredDrivingTime: ['Morning', 'Night']
                },
                { 
                    id: 5, 
                    name: 'Alex Lee', 
                    role: 'Senior Driver',
                    avatar: '/avatars/05.png',
                    status: 'On Break', 
                    location: 'Cologne',
                    workingHours: '37 hours',
                    phoneNumber: '+491357924680',
                    preferredDrivingTime: ['Morning']
                }
            ]
            setDrivers(mockDrivers)
        }

        fetchDrivers()
    }, [])

    const getStatusIcon = (status: Driver['status']) => {
        switch (status) {
            case 'Driving':
                return <Car className="h-4 w-4 mr-1" />
            case 'On Break':
                return <Coffee className="h-4 w-4 mr-1" />
            case 'Off Duty':
                return <Power className="h-4 w-4 mr-1" />
        }
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Drivers</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Driver
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Person</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Working hours</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Preferred Driving Time</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {drivers.map((driver) => (
                        <TableRow key={driver.id}>
                            <TableCell>
                                <div className="flex items-center">
                                    <Avatar className="mr-2">
                                        <AvatarImage src={driver.avatar} alt={`${driver.name}'s avatar`} />
                                        <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div>{driver.name}</div>
                                        <div className="text-sm text-gray-500">{driver.role}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                >
                                    {getStatusIcon(driver.status)}
                                    {driver.status}
                                </Button>
                            </TableCell>
                            <TableCell>{driver.location}</TableCell>
                            <TableCell>{driver.workingHours}</TableCell>
                            <TableCell>{driver.phoneNumber}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    {driver.preferredDrivingTime.includes('Morning') && (
                                        <Button variant="outline" size="sm">
                                            <Sun className="h-4 w-4 mr-1" /> Morning
                                        </Button>
                                    )}
                                    {driver.preferredDrivingTime.includes('Night') && (
                                        <Button variant="outline" size="sm">
                                            <Moon className="h-4 w-4 mr-1" /> Night
                                        </Button>
                                    )}
                                </div>
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
