'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
    APIProvider,
    useMapsLibrary,

} from '@vis.gl/react-google-maps';


const AutoPage = () => {
    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);

    return (
        <APIProvider
            // @ts-expect-error default example
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
        >
            <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
        </APIProvider>
    );
}

interface PlaceAutocompleteProps {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
    const [placeAutocomplete, setPlaceAutocomplete] =
        useState<google.maps.places.Autocomplete | null>(null);
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
        <div className="autocomplete-container mt-6 max-w-screen-lg mx-auto">
            <input 
                ref={inputRef}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Search for a location..."
                type="text"
            />
        </div>
    );
};

export default AutoPage