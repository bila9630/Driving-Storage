'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

interface Route {
  id: string
  name: string
  startLocation: string
  endLocation: string
}

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Route[]>([])

  const handleSearch = async () => {
    // TODO: Replace this with actual API call to search for routes
    const mockResults: Route[] = [
      { id: '1', name: 'Route 1', startLocation: 'City A', endLocation: 'City B' },
      { id: '2', name: 'Route 2', startLocation: 'City C', endLocation: 'City D' },
    ]
    setSearchResults(mockResults)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Routes</h1>
      <div className="flex space-x-2 mb-4">
        <Input
          placeholder="Enter route name, start location, or end location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
      <div className="space-y-4">
        {searchResults.map((route) => (
          <Card key={route.id}>
            <CardHeader>
              <CardTitle>{route.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Start: {route.startLocation}</p>
              <p>End: {route.endLocation}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SearchPage

