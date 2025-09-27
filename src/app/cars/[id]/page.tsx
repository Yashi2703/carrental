'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Users, Fuel, Settings, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { getCarById } from '@/data/cars'
import { Car } from '@/types'
import BookingForm from '@/components/BookingForm'
import ImageGallery from '@/components/ImageGallery'

export default function CarDetailPage() {
  const params = useParams()
//   const searchParams = useSearchParams()
  const [car, setCar] = useState<Car | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const carId = params.id as string
    const carData = getCarById(carId)
    setCar(carData || null)
    
    // Check if booking form should be shown
    // if (searchParams.get('booking') === 'true') {
    //   setShowBookingForm(true)
    // }
  }, [params.id])

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Car Not Found</h1>
          <Link href="/cars" className="btn-primary">
            Back to Cars
          </Link>
        </div>
      </div>
    )
  }

  const handleBookingClick = () => {
    setShowBookingForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/cars"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Cars
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <ImageGallery 
              images={car.images}
              currentIndex={currentImageIndex}
              onIndexChange={setCurrentImageIndex}
            />
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">
                {car.name} {car.model}
              </h1>
              <div className="flex items-center space-x-6 text-secondary-600 mb-4 overflow-x-auto pb-1">
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Calendar className="h-5 w-5" />
                  <span>{car.year}</span>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Users className="h-5 w-5" />
                  <span>{car.seats} seats</span>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Settings className="h-5 w-5" />
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Fuel className="h-5 w-5" />
                  <span>{car.fuel}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{car.location}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">${car.pricePerDay}</div>
                  <div className="text-sm text-gray-600">per day</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">${car.pricePerMonth}</div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-primary-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700">{car.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleBookingClick}
                disabled={!car.available}
                className={`btn-primary flex-1 py-3 ${
                  !car.available ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {car.available ? 'Request Booking' : 'Not Available'}
              </button>
              <Link
                href="/contact"
                className="btn-secondary flex-1 py-3 text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm
          car={car}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </div>
  )
}
