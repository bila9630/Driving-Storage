'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { MapPinCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ConfirmationPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const destination = searchParams.get('destination') || 'your destination'

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <MapPinCheck className="w-32 h-32 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-center">Booking Confirmed! 🎉</h1>
            <p className="text-lg text-gray-600">
                Your trip to {destination} has been confirmed
            </p>
            <Button
                className="mt-4"
                onClick={() => router.push('/user/search')}
            >
                Go to Home
            </Button>
        </div>
    );
}
