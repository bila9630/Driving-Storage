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

interface Driver {
    id: number
    name: string
    licenseNumber: string
    vehicleType: string
}

export default function DriversPage() {
    const [drivers, setDrivers] = useState<Driver[]>([])

    useEffect(() => {
        // Simulating API call to fetch drivers
        const fetchDrivers = async () => {
            // Replace this with actual API call
            const mockDrivers: Driver[] = [
                { id: 1, name: 'John Doe', licenseNumber: 'DL12345', vehicleType: 'Sedan' },
                { id: 2, name: 'Jane Smith', licenseNumber: 'DL67890', vehicleType: 'SUV' },
                { id: 3, name: 'Mike Johnson', licenseNumber: 'DL54321', vehicleType: 'Van' },
            ]
            setDrivers(mockDrivers)
        }

        fetchDrivers()
    }, [])

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <h1 className="text-3xl font-bold ">Drivers</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Driver
            </Button>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>License Number</TableHead>
                        <TableHead>Vehicle Type</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {drivers.map((driver) => (
                        <TableRow key={driver.id}>
                            <TableCell>{driver.name}</TableCell>
                            <TableCell>{driver.licenseNumber}</TableCell>
                            <TableCell>{driver.vehicleType}</TableCell>
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
