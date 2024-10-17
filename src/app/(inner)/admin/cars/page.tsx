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
import { PlusCircle, Pencil, Trash2, Car, Battery, Pause, Heart } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Car {
    id: string
    model: string
    status: 'In Use' | 'Charging' | 'Idle'
    licensePlate: string
    batteryCapacity: string
    batteryHealth: 'Great' | 'Good'
    speed: string
}

export default function CarsPage() {
    const [cars, setCars] = useState<Car[]>([])

    useEffect(() => {
        // Simulating API call to fetch cars
        const fetchCars = async () => {
            // Replace this with actual API call
            const mockCars: Car[] = [
                { id: '15482', model: 'Ford-150', status: 'In Use', licensePlate: 'ABC123', batteryCapacity: '480 kWh', batteryHealth: 'Great', speed: '160 km/h' },
                { id: '12484', model: 'Fiat 500', status: 'Charging', licensePlate: 'XYZ789', batteryCapacity: '350 kWh', batteryHealth: 'Good', speed: '180 km/h' },
                { id: '18965', model: 'Tesla Model 3', status: 'Idle', licensePlate: 'DEF456', batteryCapacity: '520 kWh', batteryHealth: 'Great', speed: '200 km/h' },
                { id: '23571', model: 'Chevrolet Bolt', status: 'Charging', licensePlate: 'GHI789', batteryCapacity: '400 kWh', batteryHealth: 'Good', speed: '170 km/h' },
                { id: '31426', model: 'Nissan Leaf', status: 'In Use', licensePlate: 'JKL012', batteryCapacity: '380 kWh', batteryHealth: 'Good', speed: '150 km/h' },
                { id: '45698', model: 'BMW i3', status: 'Idle', licensePlate: 'MNO345', batteryCapacity: '420 kWh', batteryHealth: 'Great', speed: '190 km/h' },
                { id: '78932', model: 'Hyundai Kona', status: 'In Use', licensePlate: 'PQR678', batteryCapacity: '450 kWh', batteryHealth: 'Good', speed: '175 km/h' },
            ]
            setCars(mockCars)
        }

        fetchCars()
    }, [])

    const getStatusIcon = (status: Car['status']) => {
        switch (status) {
            case 'In Use':
                return <Car className="h-4 w-4 mr-1" />
            case 'Charging':
                return <Battery className="h-4 w-4 mr-1" />
            case 'Idle':
                return <Pause className="h-4 w-4 mr-1" />
        }
    }

    const getStatusStyle = (status: Car['status']) => {
        switch (status) {
            case 'In Use':
                return 'border-green-500 text-green-500'
            case 'Charging':
                return 'border-yellow-500 text-yellow-500'
            case 'Idle':
                return 'border-blue-500 text-blue-500'
        }
    }

    const getBatteryHealthStyle = (health: Car['batteryHealth']) => {
        switch (health) {
            case 'Great':
                return 'border-green-500 text-green-500'
            case 'Good':
                return 'border-green-500 text-green-500'
        }
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Cars</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Car
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cars</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>License plate</TableHead>
                        <TableHead>Battery Capacity</TableHead>
                        <TableHead>Battery Health</TableHead>
                        <TableHead>Speed</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cars.map((car) => (
                        <TableRow key={car.id}>
                            <TableCell>
                                <div className="flex items-center">
                                    <Avatar className="h-9 w-9 mr-2">
                                        <AvatarFallback>{car.model[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">#{car.id}</div>
                                        <div className="text-sm text-gray-500">{car.model}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    className={cn(
                                        "border bg-background hover:bg-background",
                                        getStatusStyle(car.status)
                                    )}
                                >
                                    {getStatusIcon(car.status)}
                                    {car.status}
                                </Button>
                            </TableCell>
                            <TableCell>{car.licensePlate}</TableCell>
                            <TableCell>{car.batteryCapacity}</TableCell>
                            <TableCell>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    className={cn(
                                        "border bg-background hover:bg-background",
                                        getBatteryHealthStyle(car.batteryHealth)
                                    )}
                                >
                                    <Heart className="h-4 w-4 mr-1" />
                                    {car.batteryHealth}
                                </Button>
                            </TableCell>
                            <TableCell>{car.speed}</TableCell>
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
