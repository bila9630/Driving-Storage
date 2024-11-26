'use client'

import React, { useState, useEffect, useRef } from 'react'
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps'
import { format } from "date-fns"
import { CalendarIcon, ClockIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod" 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

const FormSchema = z.object({
  start: z.string().min(1, { message: "Start location is required." }),
  destination: z.string().min(1, { message: "Destination is required." }),
  date: z.date({
    required_error: "Date is required.",
  }),
  breaks: z.string().optional(),
  startTime: z.string().optional(),
})

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  placeholder: string;
}

const PlaceAutocomplete = ({ onPlaceSelect, placeholder }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
      if (!places || !inputRef.current) return;

      const options = {
          fields: ['geometry', 'name', 'formatted_address']
      };

      setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
      if (!placeAutocomplete) return;

      placeAutocomplete.addListener('place_changed', () => {
          onPlaceSelect(placeAutocomplete.getPlace());
      });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
      <input
          ref={inputRef}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={placeholder}
          type="text"
      />
  );
};

const SearchPage: React.FC = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
  })

  const [startPlace, setStartPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [destinationPlace, setDestinationPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [routeInfo, setRouteInfo] = useState<{
    distance?: string;
    duration?: string;
    durationValue?: number;
  }>({});

  // Update form values when places are selected
  useEffect(() => {
      if (startPlace?.formatted_address) {
          form.setValue('start', startPlace.formatted_address);
      }
  }, [startPlace, form]);

  useEffect(() => {
      if (destinationPlace?.formatted_address) {
          form.setValue('destination', destinationPlace.formatted_address);
      }
  }, [destinationPlace, form]);

  // Add this function to calculate route
  const calculateRoute = async (start: string, destination: string) => {
    const maps = google.maps;
    if (!maps) return;

    const directionsService = new maps.DirectionsService();
    
    try {
      const result = await directionsService.route({
        origin: start,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      if (result.routes[0]?.legs[0]) {
        const leg = result.routes[0].legs[0];
        setRouteInfo({
          distance: leg.distance?.text || '',
          duration: leg.duration?.text || '',
          durationValue: leg.duration?.value || 0
        });
      }
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  // Modify the onSubmit function
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const searchParams = new URLSearchParams({
      start: data.start,
      destination: data.destination,
      date: format(data.date, 'yyyy-MM-dd'),
      breaks: data.breaks || '',
      startTime: data.startTime || '',
      distance: routeInfo.distance || '',
      duration: routeInfo.duration || '',
      durationValue: routeInfo.durationValue?.toString() || '',
    })
    router.push(`/user/result?${searchParams.toString()}`)
  }

  // Effect to calculate route when both places are selected
  useEffect(() => {
    if (startPlace?.formatted_address && destinationPlace?.formatted_address) {
      calculateRoute(
        startPlace.formatted_address,
        destinationPlace.formatted_address
      );
    }
  }, [startPlace, destinationPlace]);

  return (
    <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
    >
        <Card className="w-full max-w-3xl mx-auto mt-8">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Search for the best route</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex space-x-4">
                            <FormField
                                control={form.control}
                                name="start"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <PlaceAutocomplete
                                                onPlaceSelect={setStartPlace}
                                                placeholder="Start"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="destination"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <PlaceAutocomplete
                                                onPlaceSelect={setDestinationPlace}
                                                placeholder="Destination"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="px-8">Search</Button>
                        </div>
                        {(routeInfo.distance || routeInfo.duration) && (
                            <div className="flex space-x-4 text-sm text-gray-600">
                                {routeInfo.distance && (
                                    <div>Distance: {routeInfo.distance}</div>
                                )}
                                {/* {routeInfo.duration && (
                                    <div>Duration: {routeInfo.duration}</div>
                                )} */}
                            </div>
                        )}
                        <div className="flex space-x-4">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] justify-start text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startTime"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <ClockIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? field.value : <span>Pick a start time</span>}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            {/* TIME PICKER OPTIONS */}
                                            <PopoverContent className="w-48 p-0" align="start">
                                                <ScrollArea className="h-72">
                                                    <div className="grid grid-cols-1 gap-2 p-4">
                                                        {Array.from({ length: 48 }, (_, i) => {
                                                            const hour = Math.floor(i / 2);
                                                            const minute = i % 2 === 0 ? "00" : "30";
                                                            const timeString = `${hour.toString().padStart(2, '0')}:${minute}`;
                                                            return (
                                                                <Button
                                                                    key={timeString}
                                                                    onClick={() => field.onChange(timeString)}
                                                                    variant="ghost"
                                                                    className="justify-start"
                                                                >
                                                                    {timeString}
                                                                </Button>
                                                            );
                                                        })}
                                                    </div>
                                                </ScrollArea>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="breaks"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Number of breaks" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {[0, 1, 2, 3, 4, 5].map((num) => (
                                                    <SelectItem key={num} value={num.toString()}>
                                                        {num} break{num !== 1 ? 's' : ''}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </APIProvider>
)
}

export default SearchPage
