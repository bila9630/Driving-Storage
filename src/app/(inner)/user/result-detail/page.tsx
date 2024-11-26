'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CarFront, Goal } from 'lucide-react'
import GoogleMap from '@/components/google-map'
import { pb } from '@/lib/pocketbase'

interface RouteResult {
    id: string
    start: string
    destination: string
    date: string
    startTime: string
    endTime: string
    duration: string
    breaks: number
    breakHours: number
    saving: number
    tripDetails: TripDetail[]
}
interface TripDetail {
    time: string
    city: string
    duration?: string
    breakDuration?: string
}
const ResultDetailContent: React.FC = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Add loading state
    const [isLoading, setIsLoading] = useState(false)

    // Get and parse all parameters from URL
    const routeDetail: RouteResult = {
        id: searchParams.get('id') || '',
        start: searchParams.get('start') || '',
        destination: searchParams.get('destination') || '',
        date: searchParams.get('date') || '',
        startTime: searchParams.get('startTime') || '',
        endTime: searchParams.get('endTime') || '',
        duration: searchParams.get('duration') || '',
        breaks: Number(searchParams.get('breaks')) || 0,
        breakHours: Number(searchParams.get('breakHours')) || 0,
        saving: Number(searchParams.get('saving')) || 0,
        // Parse the tripDetails from the URL
        tripDetails: JSON.parse(searchParams.get('tripDetails') || '[]')
    }

    // Validate required data
    if (!routeDetail.id || !routeDetail.start || !routeDetail.destination) {
        router.push('/user/result')
        return null
    }

    const handleProceedToBooking = async () => {
        setIsLoading(true)
        try {
            // Format the date and time for PocketBase
            const startDateTime = new Date(`${routeDetail.date} ${routeDetail.startTime}`).toISOString()

            const tripData = {
                start_location: routeDetail.start,
                end_location: routeDetail.destination,
                start_date: startDateTime,
                status: "Scheduled",
                driver: "John Doe"
            }

            await pb.collection('trip').create(tripData)
            router.push(`/user/confirmation?destination=${routeDetail.destination}`)
        } catch (error) {
            console.error('Failed to create trip:', error)
            setIsLoading(false) // Reset loading state if there's an error
        }
    }

    return (
        <div className="container mx-auto mt-8">
            <div className="flex items-center mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold">Trip Details</h1>
            </div>
            <Card className="mb-6">
                <CardContent className="p-6">
                    {/* Departure, Duration and Arrival  */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div>
                            <h3 className="font-semibold mb-1">Departure</h3>
                            <p className="text-xl">{routeDetail.startTime}</p>
                            <p className="text-gray-500">{routeDetail.start}</p>
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold mb-1">Duration</h3>
                            <p className="text-xl">{routeDetail.duration}</p>
                            <p className="text-gray-500">{routeDetail.breaks} breaks</p>
                        </div>
                        <div className="text-right">
                            <h3 className="font-semibold mb-1">Arrival</h3>
                            <p className="text-xl">{routeDetail.endTime}</p>
                            <p className="text-gray-500">{routeDetail.destination}</p>
                        </div>
                    </div>

                    {/* Saving */}
                    <div className="mb-6">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center gap-2">
                                <p className="text-gray-500 text-sm">Saving: </p>
                                <p className="font-bold">€{routeDetail.saving}</p>
                            </div>
                        </div>
                    </div>

                    {/* Trip Timeline  */}
                    <div className="border-t pt-4">
                        <h3 className="font-semibold mb-4">Trip Timeline</h3>
                        <div className="flex space-x-8 overflow-x-auto pb-4">
                            {routeDetail.tripDetails.map((detail, index) => (
                                <div key={index} className="flex flex-col items-center min-w-[150px]">
                                    <div className="text-sm mb-2">
                                        {detail.time}
                                    </div>
                                    <div className="relative">
                                        <div className="flex items-center justify-center w-5">
                                            {index === 0 ? (
                                                <div className="flex items-center justify-center h-3">
                                                    <CarFront className="w-5 h-5" />
                                                </div>
                                            ) : index === routeDetail.tripDetails.length - 1 ? (
                                                <div className="flex items-center justify-center h-3">
                                                    <Goal className="w-5 h-5" />
                                                </div>
                                            ) : (
                                                <div className="w-3 h-3 rounded-full border-2 border-gray-300 bg-white" />
                                            )}
                                        </div>
                                        {index < routeDetail.tripDetails.length - 1 && (
                                            <div className="absolute top-1/2 left-[130%] h-[2px] w-[150px] bg-gray-300 -translate-y-1/2" />
                                        )}
                                    </div>
                                    <div className="mt-2 text-center">
                                        <span className="text-sm font-medium block">{detail.city}</span>
                                        <div className="text-sm text-gray-500">
                                            {detail.duration && <div>{detail.duration}</div>}
                                            {detail.breakDuration && <div>{detail.breakDuration}</div>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Google Map  */}
                    <div className="border-t mt-6 pt-6">
                        <h3 className="font-semibold mb-4">Route Overview</h3>
                        <div className="h-[670px] w-full rounded-lg overflow-hidden border shadow-sm">
                            <GoogleMap
                                origin={routeDetail.start}
                                destination={routeDetail.destination}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-end mb-8">
                <Button
                    size="lg"
                    onClick={handleProceedToBooking}
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : "Proceed to Booking"}
                </Button>
            </div>
        </div>
    )
}

const ResultDetailPage: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultDetailContent />
        </Suspense>
    )
}

export default ResultDetailPage