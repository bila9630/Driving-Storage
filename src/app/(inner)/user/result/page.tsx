'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, ArrowRight, CarFront, Goal } from 'lucide-react'
import { ChevronUp, ChevronDown } from 'lucide-react'

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

const TripDetails: React.FC<{ result: RouteResult }> = ({ result }) => {
    return (
        <div className="mt-8 space-y-8">
            {result.tripDetails.map((detail, index) => (
                <div key={index} className="flex relative min-h-[20px]">
                    {/* Time */}
                    <div className="w-12 text-sm">
                        {detail.time}
                    </div>

                    {/* Icon and Line */}
                    <div className="relative mx-4">
                        <div className="absolute left-1/2 -translate-x-1/2">
                            {index === 0 ? (
                                <CarFront className="w-5 h-5" />
                            ) : index === result.tripDetails.length - 1 ? (
                                <Goal className="w-5 h-5" />
                            ) : (
                                <div className="w-3 h-3 rounded-full border-2 border-gray-300 bg-white" />
                            )}
                        </div>
                        {/* Vertical line */}
                        {index < result.tripDetails.length - 1 && (
                            <div className="absolute top-6 left-1/2 w-[2px] h-[40px] bg-gray-300 -translate-x-1/2" />
                        )}
                    </div>

                    {/* City and Info */}
                    <div className="flex-1">
                        <span className="text-sm">{detail.city}</span>
                        <div className="flex flex-col text-sm text-gray-500">
                            {detail.duration && (
                                <span>{detail.duration}</span>
                            )}
                            {detail.breakDuration && (
                                <span>{detail.breakDuration}</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const ResultPage: React.FC = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [results, setResults] = useState<RouteResult[]>([])
    const [startTime, setStartTime] = useState<string>('')
    const [breaks, setBreaks] = useState<string>('')
    const [expandedResult, setExpandedResult] = useState<string | null>(null)

    useEffect(() => {
        // Fetch results based on search params
        const fetchResults = async () => {
            // TODO: Replace with actual API call
            const mockResults: RouteResult[] = [
                {
                    id: '1',
                    start: searchParams.get('start') || '',
                    destination: searchParams.get('destination') || '',
                    date: searchParams.get('date') || '',
                    startTime: '8:00',
                    endTime: '14:30',
                    duration: '6h30m',
                    breaks: 2,
                    breakHours: 95,
                    price: 25,
                    earning: 5,
                    saving: 8,
                    tripDetails: [
                        { time: '8:00', city: searchParams.get('start') || '', duration: '2h15m' },
                        { time: '10:15', city: 'Break City', breakDuration: '40 mins break' },
                        { time: '10:55', city: 'Break City', duration: '4h25m' },
                        { time: '14:30', city: searchParams.get('destination') || '' },
                    ]
                },
                {
                    id: '2',
                    start: searchParams.get('start') || '',
                    destination: searchParams.get('destination') || '',
                    date: searchParams.get('date') || '',
                    startTime: '9:30',
                    endTime: '16:45',
                    duration: '7h15m',
                    breaks: 3,
                    breakHours: 120,
                    price: 32,
                    earning: 8,
                    saving: 12,
                    tripDetails: [
                        { time: '9:30', city: searchParams.get('start') || '', duration: '2h30m' },
                        { time: '12:00', city: 'Rest Stop A', breakDuration: '45 mins break' },
                        { time: '12:45', city: 'Rest Stop A', duration: '2h' },
                        { time: '14:45', city: 'Rest Stop B', breakDuration: '30 mins break' },
                        { time: '15:15', city: 'Rest Stop B', duration: '1h30m' },
                        { time: '16:45', city: searchParams.get('destination') || '' },
                    ]
                },
                {
                    id: '3',
                    start: searchParams.get('start') || '',
                    destination: searchParams.get('destination') || '',
                    date: searchParams.get('date') || '',
                    startTime: '11:00',
                    endTime: '16:15',
                    duration: '5h15m',
                    breaks: 1,
                    breakHours: 45,
                    price: 28,
                    earning: 4,
                    saving: 6,
                    tripDetails: [
                        { time: '11:00', city: searchParams.get('start') || '', duration: '3h' },
                        { time: '14:00', city: 'Charging Station X', breakDuration: '45 mins break' },
                        { time: '14:45', city: 'Charging Station X', duration: '1h30m' },
                        { time: '16:15', city: searchParams.get('destination') || '' },
                    ]
                },
                {
                    id: '4',
                    start: searchParams.get('start') || '',
                    destination: searchParams.get('destination') || '',
                    date: searchParams.get('date') || '',
                    startTime: '13:00',
                    endTime: '19:30',
                    duration: '6h30m',
                    breaks: 2,
                    breakHours: 90,
                    price: 30,
                    earning: 6,
                    saving: 9,
                    tripDetails: [
                        { time: '13:00', city: searchParams.get('start') || '', duration: '2h45m' },
                        { time: '15:45', city: 'Service Area Y', breakDuration: '50 mins break' },
                        { time: '16:35', city: 'Service Area Y', duration: '2h' },
                        { time: '18:35', city: 'Quick Stop Z', breakDuration: '40 mins break' },
                        { time: '19:15', city: 'Quick Stop Z', duration: '15m' },
                        { time: '19:30', city: searchParams.get('destination') || '' },
                    ]
                }
            ]
            setResults(mockResults)
        }

        fetchResults()
    }, [searchParams])

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Result</h1>
                <Button onClick={() => router.push('/user/search')}>
                    <PlusCircle className="mr-2 h-4 w-4" />New Search
                </Button>
            </div>
            <div className="flex space-x-4 mb-4">
                <Select onValueChange={setStartTime} value={startTime}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="8:00">8:00</SelectItem>
                        <SelectItem value="9:00">9:00</SelectItem>
                        <SelectItem value="10:00">10:00</SelectItem>
                    </SelectContent>
                </Select>
                <Select onValueChange={setBreaks} value={breaks}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Number of breaks" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">0 breaks</SelectItem>
                        <SelectItem value="1">1 break</SelectItem>
                        <SelectItem value="2">2 breaks</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {results.map((result) => (
                <Card
                    key={result.id}
                    className="mb-4 transition-shadow duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                >
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex flex-col items-start">
                                <span className="text-xl font-semibold">{result.startTime}</span>
                                <span className="text-sm">{result.start}</span>
                            </div>
                            <span className="text-sm text-gray-500">{result.duration}</span>
                            <div className="flex flex-col items-end">
                                <span className="text-xl font-semibold">{result.endTime}</span>
                                <span className="text-sm">{result.destination}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setExpandedResult(expandedResult === result.id ? null : result.id)}
                                    className="flex items-center space-x-1"
                                >
                                    <span>{result.breaks} break{result.breaks !== 1 ? 's' : ''}</span>
                                    {expandedResult === result.id ? (
                                        <ChevronUp className="w-4 h-4 ml-1" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 ml-1" />
                                    )}
                                </Button>
                                <div className="text-sm text-gray-500">
                                    <span>Earning: {result.earning}€</span>
                                    <span className="ml-4">Saving: {result.saving}€</span>
                                    <span className="ml-4">Break min: {result.breakHours} min</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-xl font-bold">€{result.price}</span>
                                <Button variant="outline">
                                    Continue
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        {expandedResult === result.id && <TripDetails result={result} />}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default ResultPage
