'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, DollarSign, User, LogIn } from 'lucide-react'
import { BookingRequest } from '@/types'
import Link from 'next/link'

// Mock booking data
const mockBookings: BookingRequest[] = [
  {
    id: '1',
    carId: '1',
    startDate: '2024-01-15',
    endDate: '2024-01-18',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1 (555) 123-4567',
    estimatedTotal: 360,
    status: 'Approved',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    carId: '2',
    startDate: '2024-01-20',
    endDate: '2024-01-22',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1 (555) 123-4567',
    offerPrice: 200,
    estimatedTotal: 220,
    remarks: 'Need GPS navigation',
    status: 'Pending',
    createdAt: '2024-01-12T14:30:00Z'
  },
  {
    id: '3',
    carId: '3',
    startDate: '2024-01-05',
    endDate: '2024-01-07',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1 (555) 123-4567',
    estimatedTotal: 260,
    status: 'Completed',
    createdAt: '2023-12-28T09:15:00Z'
  }
]

const statusConfig = {
  Pending: {
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    label: 'Pending Review'
  },
  Approved: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    label: 'Approved'
  },
  Rejected: {
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    label: 'Rejected'
  },
  Completed: {
    icon: CheckCircle,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    label: 'Completed'
  }
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem('userEmail')
    const userName = localStorage.getItem('userName')
    setIsLoggedIn(!!(userEmail && userName))
    
    // Simulate loading
    setTimeout(() => {
      if (userEmail && userName) {
        // Show user's bookings
        setBookings(mockBookings)
      } else {
        // Show empty state
        setBookings([])
      }
      setIsLoading(false)
    }, 1000)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusIcon = (status: BookingRequest['status']) => {
    const config = statusConfig[status]
    const Icon = config.icon
    return <Icon className={`h-5 w-5 ${config.color}`} />
  }

  const getStatusBadge = (status: BookingRequest['status']) => {
    const config = statusConfig[status]
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.color}`}>
        {getStatusIcon(status)}
        <span className="ml-1">{config.label}</span>
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Track and manage your car rental bookings
          </p>
        </div>

        {!isLoggedIn ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <User className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Login to View Your Bookings</h3>
            <p className="text-gray-500 mb-6">
              Sign in to see your booking history and manage your reservations.
            </p>
            <div className="space-y-4">
              <Link
                href="/login"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
              <div className="text-sm text-gray-500">
                <p>Demo bookings shown below for preview</p>
              </div>
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500 mb-6">You haven't made any booking requests yet.</p>
            <Link
              href="/cars"
              className="btn-primary"
            >
              Browse Available Cars
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Booking #{booking.id}
                      </h3>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Start Date</p>
                        <p className="text-gray-900">{formatDate(booking.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">End Date</p>
                        <p className="text-gray-900">{formatDate(booking.endDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Duration</p>
                        <p className="text-gray-900">
                          {Math.ceil((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Amount</p>
                        <p className="text-gray-900 font-semibold">
                          ${booking.offerPrice || booking.estimatedTotal}
                        </p>
                      </div>
                    </div>

                    {booking.offerPrice && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Your Offer Price</p>
                        <p className="text-gray-900">${booking.offerPrice}</p>
                      </div>
                    )}

                    {booking.remarks && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Remarks</p>
                        <p className="text-gray-900">{booking.remarks}</p>
                      </div>
                    )}

                    <div className="text-sm text-gray-500">
                      Submitted on {formatDate(booking.createdAt!)}
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <div className="flex flex-col space-y-2">
                      {booking.status === 'Pending' && (
                        <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                          <AlertCircle className="h-4 w-4 inline mr-1" />
                          Your booking is under review. We'll notify you once it's processed.
                        </div>
                      )}
                      
                      {booking.status === 'Approved' && (
                        <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                          <CheckCircle className="h-4 w-4 inline mr-1" />
                          Your booking has been approved! Check your email for details.
                        </div>
                      )}
                      
                      {booking.status === 'Rejected' && (
                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                          <XCircle className="h-4 w-4 inline mr-1" />
                          Unfortunately, your booking was not approved. Please contact us for more information.
                        </div>
                      )}
                      
                      {booking.status === 'Completed' && (
                        <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                          <CheckCircle className="h-4 w-4 inline mr-1" />
                          This booking has been completed. Thank you for choosing us!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {bookings.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {bookings.length}
              </div>
              <div className="text-gray-600">Total Bookings</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {bookings.filter(b => b.status === 'Completed').length}
              </div>
              <div className="text-gray-600">Completed</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-2">
                {bookings.filter(b => b.status === 'Pending').length}
              </div>
              <div className="text-gray-600">Pending</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
