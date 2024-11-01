'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CarFront, Goal } from 'lucide-react'

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
    price: number
    earning: number
    saving: number
    tripDetails: TripDetail[]
}

interface TripDetail {
    time: string
    city: string
    duration?: string
    breakDuration?: string
}

const ResultDetailPage: React.FC = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const routeId = searchParams.get('routeId')
    const [routeDetail, setRouteDetail] = useState<RouteResult | null>(null)

    useEffect(() => {
        // TODO: Replace with actual API call
        const fetchRouteDetail = async () => {
            // This is mock data - replace with actual API call
            const mockResult: RouteResult = {
                id: '1',
                start: 'Berlin',
                destination: 'Munich',
                date: '2024-03-20',
                startTime: '8:00',
                endTime: '14:30',
                duration: '6h30m',
                breaks: 2,
                breakHours: 95,
                price: 25,
                earning: 5,
                saving: 8,
                tripDetails: [
                    { time: '8:00', city: 'Berlin', duration: '2h15m' },
                    { time: '10:15', city: 'Break City', breakDuration: '40 mins break' },
                    { time: '10:55', city: 'Break City', duration: '4h25m' },
                    { time: '14:30', city: 'Munich' },
                ]
            }
            setRouteDetail(mockResult)
        }

        if (routeId) {
            fetchRouteDetail()
        }
    }, [routeId])

    if (!routeDetail) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto mt-8">
            <div className="flex items-center mb-6">
                <Button 
                    variant="ghost" 
                    onClick={() => router.back()}
                    className="mr-4"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
                <h1 className="text-2xl font-bold">Trip Details</h1>
            </div>

            <Card className="mb-6">
                <CardContent className="p-6">
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

                    <div className="border-t pt-4">
                        <h3 className="font-semibold mb-4">Trip Timeline</h3>
                        <div className="space-y-8">
                            {routeDetail.tripDetails.map((detail, index) => (
                                <div key={index} className="flex relative min-h-[20px]">
                                    <div className="w-20 text-sm">
                                        {detail.time}
                                    </div>

                                    <div className="relative mx-4">
                                        <div className="absolute left-1/2 -translate-x-1/2">
                                            {index === 0 ? (
                                                <CarFront className="w-5 h-5" />
                                            ) : index === routeDetail.tripDetails.length - 1 ? (
                                                <Goal className="w-5 h-5" />
                                            ) : (
                                                <div className="w-3 h-3 rounded-full border-2 border-gray-300 bg-white" />
                                            )}
                                        </div>
                                        {index < routeDetail.tripDetails.length - 1 && (
                                            <div className="absolute top-6 left-1/2 w-[2px] h-[40px] bg-gray-300 -translate-x-1/2" />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <span className="text-sm font-medium">{detail.city}</span>
                                        <div className="text-sm text-gray-500">
                                            {detail.duration && <div>{detail.duration}</div>}
                                            {detail.breakDuration && <div>{detail.breakDuration}</div>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t mt-6 pt-6">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-gray-500 mb-1">Price</p>
                                <p className="text-2xl font-bold">€{routeDetail.price}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Earning</p>
                                <p className="text-2xl font-bold">€{routeDetail.earning}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Saving</p>
                                <p className="text-2xl font-bold">€{routeDetail.saving}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button size="lg">
                    Proceed to Booking
                </Button>
            </div>
        </div>
    )
}

export default ResultDetailPage