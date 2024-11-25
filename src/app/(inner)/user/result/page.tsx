'use client'

import React, { useEffect, useState, Suspense } from 'react'
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

// Separate the results display into its own component
const ResultsDisplay: React.FC = () => {
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
                    saving: 5,
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
                    saving: 7,
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
                    saving: 4,
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
                    saving: 6,
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

    // Filter results based on selected breaks and start time
    const filteredResults = results.filter(result => {
        const breakMatch = breaks === "all" || !breaks ? true : result.breaks === parseInt(breaks);
        const timeMatch = startTime === "all" || !startTime ? true : result.startTime === startTime;
        return breakMatch && timeMatch;
    });

    // Get unique start times and break counts from results
    const uniqueStartTimes = Array.from(new Set(results.map(r => r.startTime)))
        .sort((a, b) => {
            // Convert times to minutes for proper comparison
            const getMinutes = (time: string) => {
                const [hours, minutes] = time.split(':').map(Number);
                return hours * 60 + minutes;
            };
            return getMinutes(a) - getMinutes(b);
        });
    const uniqueBreakCounts = Array.from(new Set(results.map(r => r.breaks))).sort();

    const parseDuration = (duration: string): number => {
        const [hours, minutes] = duration.split('h').map(part => parseInt(part.replace('m', ''), 10) || 0)
        return hours * 60 + minutes
    }

    // Identify trips with the most savings and shortest duration
    const tripWithMostSavings = results.reduce((prev, current) => (current.saving > prev.saving ? current : prev), results[0])
    const tripWithShortestDuration = results.reduce((prev, current) =>
        parseDuration(current.duration) < parseDuration(prev.duration) ? current : prev, results[0]
    )
    
    return (
        <div>
            <div className="flex space-x-4 mb-4">
                <Select onValueChange={setStartTime} value={startTime}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All times</SelectItem>
                        {uniqueStartTimes.map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={setBreaks} value={breaks}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Number of breaks" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All breaks</SelectItem>
                        {uniqueBreakCounts.map(count => (
                            <SelectItem key={count} value={count.toString()}>
                                {count} {count === 1 ? 'break' : 'breaks'}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {filteredResults.map((result) => {
                const isMostSavings = result.id === tripWithMostSavings?.id;
                const isShortestDuration = result.id === tripWithShortestDuration?.id;

                return (
                    <Card
                        key={result.id}
                        className={`mb-4 transition-shadow duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] ${
                            isMostSavings ? 'border-2 border-green-500' : ''
                        } ${isShortestDuration ? 'border-2 border-blue-500' : ''}`}
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
                                        More Info
                                        {expandedResult === result.id ? (
                                            <ChevronUp className="w-4 h-4 ml-1" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4 ml-1" />
                                        )}
                                    </Button>
                                    <div className="text-sm text-gray-500">
                                        <span>Breaks: {result.breaks} | Break min: {result.breakHours} min</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-xl font-bold"><span className="text-sm text-gray-500">saving:</span> {result.saving} €</span>
                                    <Button variant="outline"
                                        onClick={() => {
                                            const routeParams = new URLSearchParams({
                                                id: result.id,
                                                start: result.start,
                                                destination: result.destination,
                                                date: result.date,
                                                startTime: result.startTime,
                                                endTime: result.endTime,
                                                duration: result.duration,
                                                breaks: result.breaks.toString(),
                                                breakHours: result.breakHours.toString(),
                                                saving: result.saving.toString(),
                                                tripDetails: JSON.stringify(result.tripDetails)
                                            });
                                            router.push(`/user/result-detail?${routeParams.toString()}`);
                                        }}>
                                        Continue
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            {expandedResult === result.id && <TripDetails result={result} />}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

// Main page component
const ResultPage: React.FC = () => {
    const router = useRouter()

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Result</h1>
                <Button onClick={() => router.push('/user/search')}>
                    <PlusCircle className="mr-2 h-4 w-4" />New Search
                </Button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <ResultsDisplay />
            </Suspense>
        </div>
    )
}

export default ResultPage
