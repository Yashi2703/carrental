import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Users, Fuel, Settings, Star } from 'lucide-react'
import { Car } from '@/types'

interface CarCardProps {
  car: Car
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <div className="card-hover overflow-hidden">
      {/* Car Image */}
      <div className="relative h-48">
        <Image
          src={car.images[0]}
          alt={car.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-full text-sm font-semibold text-primary-600 shadow-soft">
          ${car.pricePerDay}/day
        </div>
        {!car.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-error-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-soft">
              Not Available
            </span>
          </div>
        )}
      </div>

      {/* Car Details */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-secondary-900 mb-1 font-display">
            {car.name} {car.model}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-secondary-600 overflow-x-auto pb-1">
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

        <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
          {car.description}
        </p>

        {/* Key Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {car.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="bg-primary-50 text-primary-700 px-2 py-1 rounded-lg text-xs font-medium"
              >
                {feature}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-lg text-xs font-medium">
                +{car.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            href={`/cars/${car.id}`}
            className="btn-primary flex-1 text-center text-sm py-2"
          >
            View Details
          </Link>
          <Link
            href={`/cars/${car.id}?booking=true`}
            className={`btn-secondary flex-1 text-center text-sm py-2 ${
              !car.available ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={(e) => !car.available && e.preventDefault()}
          >
            {car.available ? 'Book Now' : 'Unavailable'}
          </Link>
        </div>
      </div>
    </div>
  )
}
