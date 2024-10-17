'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowUpDown } from "lucide-react"

interface Trip {
    id: string
    date: string
    startLocation: string
    endLocation: string
    distance: number
    status: 'completed' | 'in-progress' | 'scheduled'
}

const TripsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('date')
    const [filterStatus, setFilterStatus] = useState('all')

    // Mock data - replace with actual API call
    const trips: Trip[] = [
        { id: '1', date: '2023-04-01', startLocation: 'Home', endLocation: 'Office', distance: 15.5, status: 'completed' },
        { id: '2', date: '2023-04-03', startLocation: 'Office', endLocation: 'Home', distance: 16.2, status: 'completed' },
        { id: '3', date: '2023-04-05', startLocation: 'Home', endLocation: 'Client Site', distance: 30.0, status: 'in-progress' },
        { id: '4', date: '2023-04-10', startLocation: 'Home', endLocation: 'Airport', distance: 45.7, status: 'scheduled' },
    ]

    const filteredAndSortedTrips = trips
        .filter(trip =>
            (filterStatus === 'all' || trip.status === filterStatus) &&
            (trip.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                trip.endLocation.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime()
            if (sortBy === 'distance') return b.distance - a.distance
            return 0
        })

    const getStatusBadge = (status: Trip['status']) => {
        switch (status) {
            case 'completed':
                return <Badge className="bg-green-500">Completed</Badge>
            case 'in-progress':
                return <Badge className="bg-blue-500">In Progress</Badge>
            case 'scheduled':
                return <Badge className="bg-yellow-500">Scheduled</Badge>
        }
    }

    return (
        <div className="container mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">My Trips</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-2 mb-4">
                        <Input
                            placeholder="Search trips..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="scheduled">Scheduled</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={() => setSortBy(sortBy === 'date' ? 'distance' : 'date')}>
                            Sort by {sortBy === 'date' ? 'Distance' : 'Date'}
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Start Location</TableHead>
                                <TableHead>End Location</TableHead>
                                <TableHead>Distance (km)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAndSortedTrips.map((trip) => (
                                <TableRow key={trip.id}>
                                    <TableCell>{trip.date}</TableCell>
                                    <TableCell>{trip.startLocation}</TableCell>
                                    <TableCell>{trip.endLocation}</TableCell>
                                    <TableCell>{trip.distance}</TableCell>
                                    <TableCell>{getStatusBadge(trip.status)}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm">View Details</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default TripsPage
