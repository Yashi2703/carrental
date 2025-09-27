'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star, Users, Calendar, Fuel, Settings } from 'lucide-react'
import { getCars } from '@/data/cars'
import { Car } from '@/types'

export default function FeaturedCars() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    setCars(getCars().slice(0, 4)) // Show first 4 cars as featured
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cars.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cars.length) % cars.length)
  }

  if (cars.length === 0) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
            Featured Cars
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and highly-rated vehicles
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {cars.map((car) => (
                <div key={car.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Car Image */}
                    <div className="relative h-80 lg:h-96">
                      <Image
                        src={car.images[0]}
                        alt={car.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-600">
                        ${car.pricePerDay}/day
                      </div>
                    </div>

                    {/* Car Details */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">
                          {car.name} {car.model}
                        </h3>
                        <div className="flex items-center space-x-4 text-secondary-600 overflow-x-auto pb-1">
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            <Calendar className="h-4 w-4" />
                            <span>{car.year}</span>
                          </div>
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            <Users className="h-4 w-4" />
                            <span>{car.seats} seats</span>
                          </div>
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            <Settings className="h-4 w-4" />
                            <span>{car.transmission}</span>
                          </div>
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            <Fuel className="h-4 w-4" />
                            <span>{car.fuel}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600">{car.description}</p>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Key Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {car.features.slice(0, 4).map((feature, index) => (
                            <span
                              key={index}
                              className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Link
                          href={`/cars/${car.id}`}
                          className="btn-primary flex-1 text-center"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/cars/${car.id}?booking=true`}
                          className="btn-secondary flex-1 text-center"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200"
            aria-label="Previous car"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200"
            aria-label="Next car"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {cars.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide ? 'bg-primary-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Cars Button */}
        <div className="text-center mt-12">
          <Link
            href="/cars"
            className="btn-primary text-lg px-8 py-3"
          >
            View All Cars
          </Link>
        </div>
      </div>
    </section>
  )
}
