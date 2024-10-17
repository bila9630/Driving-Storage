'use client'

import React, { useState } from 'react'
import { format } from "date-fns"
import { CalendarIcon, ClockIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const SearchPage: React.FC = () => {
  const [start, setStart] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [breaks, setBreaks] = useState('')
  const [startTime, setStartTime] = useState<string>('')

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Search with:', { start, destination, date, breaks, startTime })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Search for the best route</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Input
            placeholder="Start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch} className="px-8">Search</Button>
        </div>
        <div className="flex space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "flex-1 justify-start text-left font-normal",
                  !startTime && "text-muted-foreground"
                )}
              >
                <ClockIcon className="mr-2 h-4 w-4" />
                {startTime ? startTime : <span>Pick a start time</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0" align="start">
              <ScrollArea className="h-72">
                <div className="grid grid-cols-1 gap-2 p-4">
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <Button
                      key={hour}
                      onClick={() => setStartTime(`${hour.toString().padStart(2, '0')}:00`)}
                      variant="ghost"
                      className="justify-start"
                    >
                      {`${hour.toString().padStart(2, '0')}:00`}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
          <Select value={breaks} onValueChange={setBreaks}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Number of breaks" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>{num} break{num !== 1 ? 's' : ''}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

export default SearchPage
