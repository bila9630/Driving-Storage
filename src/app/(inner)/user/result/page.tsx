'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, ArrowRight, CarFront, Goal } from 'lucide-react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"

interface RouteResult {
    id: string
    start: string
    destination: string
    date: string
    startTime: string
    endTime: string
    duration: string
    distance: string
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

interface ResultCardProps {
    result: RouteResult;
    expandedResult: string | null;
    setExpandedResult: (id: string | null) => void;
    isMostSavings: boolean;
    isShortestDuration: boolean;
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
        const fetchResults = async () => {
            const actualDuration = searchParams.get('duration') || '';
            const actualDurationValue = parseInt(searchParams.get('durationValue') || '0');
            const actualDistance = searchParams.get('distance') || '';
            const actualStartTime = searchParams.get('startTime') || '8:00';

            // Helper function to add minutes to a time string
            const addMinutes = (time: string, minutesToAdd: number) => {
                const [hours, minutes] = time.split(':').map(Number);
                const totalMinutes = hours * 60 + minutes + minutesToAdd;
                const newHours = Math.floor(totalMinutes / 60) % 24;
                const newMinutes = totalMinutes % 60;
                return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
            };

            // Calculate end time based on start time and duration in seconds
            const calculateEndTime = (startTime: string, durationSeconds: number) => {
                const [hours, minutes] = startTime.split(':').map(Number);
                const durationHours = Math.floor(durationSeconds / 3600);
                const durationMinutes = Math.floor((durationSeconds % 3600) / 60);
                let endHours = hours + durationHours;
                let endMinutes = minutes + durationMinutes;
                if (endMinutes >= 60) {
                    endHours += Math.floor(endMinutes / 60);
                    endMinutes = endMinutes % 60;
                }
                endHours = endHours % 24;
                return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
            };

            // Add new helper function to calculate intermediate times
            const calculateIntermediateTime = (startTime: string, endTime: string, portion: number) => {
                const [startHours, startMinutes] = startTime.split(':').map(Number);
                const [endHours, endMinutes] = endTime.split(':').map(Number);

                const startTotalMinutes = startHours * 60 + startMinutes;
                let endTotalMinutes = endHours * 60 + endMinutes;

                // Adjust if end time is on next day
                if (endTotalMinutes < startTotalMinutes) {
                    endTotalMinutes += 24 * 60;
                }

                const totalMinutes = startTotalMinutes + (endTotalMinutes - startTotalMinutes) * portion;
                const hours = Math.floor(totalMinutes / 60) % 24;
                const minutes = Math.floor(totalMinutes % 60);

                return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            };

            const mockResults: RouteResult[] = [
                {
                    id: '1', // Shortest duration (1 break)
                    start: searchParams.get('start') || '',
                    destination: searchParams.get('destination') || '',
                    date: searchParams.get('date') || '',
                    startTime: addMinutes(actualStartTime, -30), // 30 minutes earlier
                    endTime: calculateEndTime(addMinutes(actualStartTime, -30), actualDurationValue - 1800), // 30 min shorter
                    duration: actualDuration,
                    distance: actualDistance,
                    breaks: 1,
                    breakHours: 45,
                    saving: 4,
                    tripDetails: [
                        { time: addMinutes(actualStartTime, -30), city: searchParams.get('start') || '', duration: '3h' },
                        {
                            time: calculateIntermediateTime(
                                addMinutes(actualStartTime, -30),
                                calculateEndTime(addMinutes(actualStartTime, -30), actualDurationValue - 1800),
                                0.5
                            ),
                            city: 'Rest Stop A',
                            breakDuration: '45 mins break'
                        },
                        { time: calculateEndTime(addMinutes(actualStartTime, -30), actualDurationValue - 1800), city: searchParams.get('destination') || '' },
                    ]
                },
                {
                    id: '2', // Most savings route (3 breaks)
                    start: searchParams.get('start') || '',
                    destination: searchParams.get('destination') || '',
                    date: searchParams.get('date') || '',
                    startTime: addMinutes(actualStartTime, 30), // 30 minutes later
                    endTime: calculateEndTime(addMinutes(actualStartTime, 30), actualDurationValue + 1800), // 30 min longer
                    duration: actualDuration,
                    distance: actualDistance,
                    breaks: 3,
                    breakHours: 120,
                    saving: 8,
                    tripDetails: [
                        { time: addMinutes(actualStartTime, 30), city: searchParams.get('start') || '', duration: '2h30m' },
                        {
                            time: calculateIntermediateTime(
                                addMinutes(actualStartTime, 30),
                                calculateEndTime(addMinutes(actualStartTime, 30), actualDurationValue + 1800),
                                0.25
                            ),
                            city: 'Rest Stop A',
                            breakDuration: '45 mins break'
                        },
                        {
                            time: calculateIntermediateTime(
                                addMinutes(actualStartTime, 30),
                                calculateEndTime(addMinutes(actualStartTime, 30), actualDurationValue + 1800),
                                0.5
                            ),
                            city: 'Rest Stop B',
                            breakDuration: '45 mins break'
                        },
                        {
                            time: calculateIntermediateTime(
                                addMinutes(actualStartTime, 30),
                                calculateEndTime(addMinutes(actualStartTime, 30), actualDurationValue + 1800),
                                0.75
                            ),
                            city: 'Rest Stop C',
                            breakDuration: '30 mins break'
                        },
                        { time: calculateEndTime(addMinutes(actualStartTime, 30), actualDurationValue + 1800), city: searchParams.get('destination') || '' },
                    ]
                },
                {
                    id: '3',
                    start: searchParams.get('start') || '',
                    destination: searchParams.get('destination') || '',
                    date: searchParams.get('date') || '',
                    startTime: actualStartTime,
                    endTime: calculateEndTime(actualStartTime, actualDurationValue),
                    duration: actualDuration,
                    distance: actualDistance,
                    breaks: 2,
                    breakHours: 90,
                    saving: 5,
                    tripDetails: [
                        { time: actualStartTime || '8:00', city: searchParams.get('start') || '', duration: actualDuration || '2h15m' },
                        { time: '10:15', city: 'Rest Stop A', breakDuration: '45 mins break' },
                        { time: '10:55', city: 'Rest Stop B', duration: '45 mins break' },
                        { time: calculateEndTime(actualStartTime, actualDurationValue), city: searchParams.get('destination') || '' },
                    ]
                },
                {
                    id: '4',
                    start: searchParams.get('start') || '',
                    destination: searchParams.get('destination') || '',
                    date: searchParams.get('date') || '',
                    startTime: addMinutes(actualStartTime, 60), // 60 minutes later
                    endTime: calculateEndTime(addMinutes(actualStartTime, 60), actualDurationValue + 900), // 15 min longer
                    duration: actualDuration,
                    distance: actualDistance,
                    breaks: 2,
                    breakHours: 85,
                    saving: 6,
                    tripDetails: [
                        { time: addMinutes(actualStartTime, 60), city: searchParams.get('start') || '', duration: '2h45m' },
                        { time: '15:45', city: 'Rest Stop A', breakDuration: '40 mins break' },
                        { time: '16:35', city: 'Rest Stop B', duration: '40 mins break' },
                        { time: calculateEndTime(addMinutes(actualStartTime, 60), actualDurationValue + 900), city: searchParams.get('destination') || '' },
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
        const match = duration.match(/(\d+)\s*Stunden,\s*(\d+)\s*Minute/)
        if (!match) return 0
        const [_, hours, minutes] = match
        return parseInt(hours) * 60 + parseInt(minutes)
    }

    // Calculate total duration including breaks
    const getTotalDuration = (result: RouteResult): number => {
        return parseDuration(result.duration) + result.breakHours
    }

    // Identify trips with the most savings and shortest duration
    const tripWithMostSavings = results.reduce((prev, current) =>
        current.saving > prev.saving ? current : prev, results[0])

    const tripWithShortestDuration = results.reduce((prev, current) =>
        getTotalDuration(current) < getTotalDuration(prev) ? current : prev, results[0])

    return (
        <div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4 mx-4 md:mx-0">
                <Select onValueChange={setStartTime} value={startTime}>
                    <SelectTrigger className="w-full md:w-[180px]">
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
                    <SelectTrigger className="w-full md:w-[180px]">
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
            {filteredResults.map((result) => (
                <ResultCard
                    key={result.id}
                    result={result}
                    expandedResult={expandedResult}
                    setExpandedResult={setExpandedResult}
                    isMostSavings={result.id === tripWithMostSavings?.id}
                    isShortestDuration={result.id === tripWithShortestDuration?.id}
                />
            ))}
        </div>
    );
}

const ResultCard = ({
    result,
    expandedResult,
    setExpandedResult,
    isMostSavings,
    isShortestDuration
}: ResultCardProps) => {
    const router = useRouter()

    // Update helper function to use English
    const formatTotalDuration = (duration: string, breakMinutes: number) => {
        const match = duration.match(/(\d+)\s*Stunden,\s*(\d+)\s*Minute/)
        if (!match) return duration

        const [_, hours, minutes] = match
        const totalMinutes = parseInt(hours) * 60 + parseInt(minutes) + breakMinutes

        const totalHours = Math.floor(totalMinutes / 60)
        const remainingMinutes = totalMinutes % 60

        return `${totalHours} hours, ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`
    }

    const handleContinue = () => {
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
    }

    return (
        <Card
            key={result.id}
            className={cn(
                "mb-4 mx-4 md:mx-0 transition-shadow duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
                isMostSavings ? 'border-2 border-green-500' : '',
                isShortestDuration ? 'border-2 border-blue-500' : ''
            )}
        >
            <CardContent className="p-4">
                {/* Mobile Layout */}
                <div className="md:hidden">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-xl font-semibold">{result.startTime}</div>
                        <div className="text-xl font-semibold">{result.endTime}</div>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                        <div>{result.start}</div>
                        <div className="text-right">{result.destination}</div>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                        Duration: {formatTotalDuration(result.duration, result.breakHours)} (including breaks)
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                        Distance: {result.distance} | Breaks: {result.breaks} | Break min: {result.breakHours} min
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                        saving: {result.saving} €
                    </div>
                    <div className="flex justify-between items-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setExpandedResult(expandedResult === result.id ? null : result.id)}
                            className="flex items-center"
                        >
                            More Info
                            {expandedResult === result.id ? (
                                <ChevronUp className="w-4 h-4 ml-1" />
                            ) : (
                                <ChevronDown className="w-4 h-4 ml-1" />
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleContinue}
                        >
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Desktop Layout - unchanged */}
                <div className="hidden md:block">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex flex-col items-start">
                            <span className="text-xl font-semibold">{result.startTime}</span>
                            <span className="text-sm">{result.start}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                            {formatTotalDuration(result.duration, result.breakHours)}
                        </span>
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
                            <div className="text-sm text-gray-500 flex items-center space-x-2">
                                <span>Distance: {result.distance} | Breaks: {result.breaks} | Break min: {result.breakHours} min</span>
                                {isMostSavings && (
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                        Most savings
                                    </span>
                                )}
                                {isShortestDuration && (
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                        Shortest duration
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-xl font-bold"><span className="text-sm text-gray-500">saving:</span> {result.saving} €</span>
                            <Button
                                variant="outline"
                                onClick={handleContinue}
                            >
                                Continue
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Trip Details - works for both layouts */}
                {expandedResult === result.id && <TripDetails result={result} />}
            </CardContent>
        </Card>
    )
}

// Main page component
const ResultPage: React.FC = () => {
    const router = useRouter()

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center mb-4 mx-4 md:mx-0">
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
