'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowUpDown, Pencil, Trash2 } from "lucide-react"
import { pb } from '@/lib/pocketbase'

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
}

const TripsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [trips, setTrips] = useState<Trip[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const resultList = await pb.collection('trip').getList(1, 50, {
                    filter: 'driver = "John Doe"',
                    sort: '-start_date'
                });
                setTrips(resultList.items as Trip[])
            } catch (error) {
                console.error('Error fetching trips:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTrips()
    }, [])

    const filteredAndSortedTrips = trips
        .filter(trip =>
            (filterStatus === 'all' || trip.status === filterStatus) &&
            (trip.start_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                trip.end_location.toLowerCase().includes(searchTerm.toLowerCase()))
        )

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
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Scheduled">Scheduled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {loading ? (
                        <div>Loading trips...</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Start Location</TableHead>
                                    <TableHead>End Location</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAndSortedTrips.map((trip) => (
                                    <TableRow key={trip.id}>
                                        <TableCell>{new Date(trip.start_date).toLocaleDateString()}</TableCell>
                                        <TableCell>{trip.start_location}</TableCell>
                                        <TableCell>{trip.end_location}</TableCell>
                                        <TableCell>{getStatusBadge(trip.status)}</TableCell>
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
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default TripsPage
