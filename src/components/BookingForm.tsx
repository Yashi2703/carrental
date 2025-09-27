'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, Calendar, User, Mail, Phone, DollarSign, MessageSquare, LogIn } from 'lucide-react'
import { Car, BookingRequest } from '@/types'
import Link from 'next/link'

interface BookingFormProps {
  car: Car
  onClose: () => void
}

export default function BookingForm({ car, onClose }: BookingFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    offerPrice: '',
    remarks: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail')
      const name = localStorage.getItem('userName')
      
      if (email && name) {
        setIsLoggedIn(true)
        setUserEmail(email)
        setUserName(name)
        setBookingData(prev => ({
          ...prev,
          customerEmail: email,
          customerName: name
        }))
      }
    }
  }, [])

  const calculateTotal = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0
    
    const start = new Date(bookingData.startDate)
    const end = new Date(bookingData.endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    
    return days * car.pricePerDay
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!bookingData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    
    if (!bookingData.endDate) {
      newErrors.endDate = 'End date is required'
    }
    
    if (bookingData.startDate && bookingData.endDate) {
      const start = new Date(bookingData.startDate)
      const end = new Date(bookingData.endDate)
      
      if (end <= start) {
        newErrors.endDate = 'End date must be after start date'
      }
      
      if (start < new Date()) {
        newErrors.startDate = 'Start date cannot be in the past'
      }
    }
    
    if (!bookingData.customerName.trim()) {
      newErrors.customerName = 'Name is required'
    }
    
    if (!bookingData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(bookingData.customerEmail)) {
      newErrors.customerEmail = 'Email is invalid'
    }
    
    if (!bookingData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone is required'
    }
    
    if (bookingData.offerPrice && isNaN(Number(bookingData.offerPrice))) {
      newErrors.offerPrice = 'Offer price must be a valid number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const bookingRequest: BookingRequest = {
        carId: car.id,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        customerName: bookingData.customerName,
        customerEmail: bookingData.customerEmail,
        customerPhone: bookingData.customerPhone,
        offerPrice: bookingData.offerPrice ? Number(bookingData.offerPrice) : undefined,
        estimatedTotal: calculateTotal(),
        remarks: bookingData.remarks,
        status: 'Pending'
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Save user email for future bookings (optional login)
      if (typeof window !== 'undefined') {
        localStorage.setItem('userEmail', bookingData.customerEmail)
      }
      
      // In a real app, you would POST to /api/bookings
      console.log('Booking request:', bookingRequest)
      
      setShowConfirmation(true)
    } catch (error) {
      console.error('Error submitting booking:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const estimatedTotal = calculateTotal()

  // Show login prompt if not logged in
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Login Required</h3>
            <p className="text-gray-600 mb-6">
              Please sign in to your account to make a booking request.
            </p>
            <div className="space-y-3">
              <Link
                href={`/login?returnUrl=${encodeURIComponent(window.location.pathname + '?booking=true')}`}
                className="btn-primary w-full"
              >
                Sign In
              </Link>
              <button
                onClick={onClose}
                className="btn-secondary w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Request Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your booking request. Our admin will review it and you'll receive an email confirmation shortly.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowConfirmation(false)
                  onClose()
                  router.push('/cars')
                }}
                className="btn-primary w-full"
              >
                Continue Browsing
              </button>
              <button
                onClick={() => {
                  setShowConfirmation(false)
                  onClose()
                }}
                className="btn-secondary w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Request Booking - {car.name} {car.model}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={bookingData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className={`input-field ${errors.startDate ? 'border-red-500' : ''}`}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  End Date
                </label>
                <input
                  type="date"
                  value={bookingData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className={`input-field ${errors.endDate ? 'border-red-500' : ''}`}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                )}
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={bookingData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  className={`input-field ${errors.customerName ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={bookingData.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                    className={`input-field ${errors.customerEmail ? 'border-red-500' : ''}`}
                    placeholder="your@email.com"
                  />
                  {errors.customerEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={bookingData.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                    className={`input-field ${errors.customerPhone ? 'border-red-500' : ''}`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.customerPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Price per day:</span>
                  <span>${car.pricePerDay}</span>
                </div>
                {estimatedTotal > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span>Number of days:</span>
                      <span>{Math.ceil((new Date(bookingData.endDate).getTime() - new Date(bookingData.startDate).getTime()) / (1000 * 60 * 60 * 24))}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Estimated Total:</span>
                        <span>${estimatedTotal}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="inline h-4 w-4 mr-1" />
                  Offer Price (Optional)
                </label>
                <input
                  type="number"
                  value={bookingData.offerPrice}
                  onChange={(e) => handleInputChange('offerPrice', e.target.value)}
                  className={`input-field ${errors.offerPrice ? 'border-red-500' : ''}`}
                  placeholder="Enter your offer price"
                />
                {errors.offerPrice && (
                  <p className="text-red-500 text-sm mt-1">{errors.offerPrice}</p>
                )}
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="inline h-4 w-4 mr-1" />
                Additional Remarks (Optional)
              </label>
              <textarea
                value={bookingData.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
                rows={3}
                className="input-field"
                placeholder="Any special requests or additional information..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
