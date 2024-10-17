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

interface Car {
    id: number
    make: string
    model: string
    year: number
    licensePlate: string
}

export default function CarsPage() {
    const [cars, setCars] = useState<Car[]>([])

    useEffect(() => {
        // Simulating API call to fetch cars
        const fetchCars = async () => {
            // Replace this with actual API call
            const mockCars: Car[] = [
                { id: 1, make: 'Toyota', model: 'Camry', year: 2020, licensePlate: 'ABC123' },
                { id: 2, make: 'Honda', model: 'Civic', year: 2019, licensePlate: 'XYZ789' },
                { id: 3, make: 'Ford', model: 'F-150', year: 2021, licensePlate: 'DEF456' },
            ]
            setCars(mockCars)
        }

        fetchCars()
    }, [])

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <h1 className="text-3xl font-bold">Cars</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Car
            </Button>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Make</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>License Plate</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cars.map((car) => (
                        <TableRow key={car.id}>
                            <TableCell>{car.make}</TableCell>
                            <TableCell>{car.model}</TableCell>
                            <TableCell>{car.year}</TableCell>
                            <TableCell>{car.licensePlate}</TableCell>
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

