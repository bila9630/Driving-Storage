'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

interface RouteResult {
    id: string
    start: string
    destination: string
    date: string
    startTime: string
    duration: string
    breaks: number
}

const ResultPage: React.FC = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [results, setResults] = useState<RouteResult[]>([])

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
                    startTime: searchParams.get('startTime') || '',
                    duration: '2h 30m',
                    breaks: parseInt(searchParams.get('breaks') || '0'),
                },
                // ... more mock results ...
            ]
            setResults(mockResults)
        }

        fetchResults()
    }, [searchParams])

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Search Results</h1>
            {results.map((result) => (
                <Card key={result.id} className="mb-4">
                    <CardHeader>
                        <CardTitle>{result.start} to {result.destination}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Date: {result.date}</p>
                        <p>Start Time: {result.startTime}</p>
                        <p>Duration: {result.duration}</p>
                        <p>Breaks: {result.breaks}</p>
                        {/* Add more details as needed */}
                    </CardContent>
                </Card>
            ))}
            <Button onClick={() => router.push('/user/search')}>New Search</Button>
        </div>
    )
}

export default ResultPage

