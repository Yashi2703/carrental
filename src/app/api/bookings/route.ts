import { NextRequest, NextResponse } from 'next/server'
import { BookingRequest } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json()
    
    // Validate required fields
    if (!body.carId || !body.startDate || !body.endDate || !body.customerName || !body.customerEmail || !body.customerPhone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate dates
    const startDate = new Date(body.startDate)
    const endDate = new Date(body.endDate)
    
    if (endDate <= startDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      )
    }

    if (startDate < new Date()) {
      return NextResponse.json(
        { error: 'Start date cannot be in the past' },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Save the booking to a database
    // 2. Send email notifications
    // 3. Update car availability
    // 4. Generate booking confirmation

    const bookingId = `BK${Date.now()}`
    const booking: BookingRequest = {
      ...body,
      id: bookingId,
      status: 'Pending',
      createdAt: new Date().toISOString()
    }

    // Simulate email notification to admin
    console.log('Email notification to admin:', {
      to: 'admin@carrental.com',
      subject: 'New Booking Request',
      body: `New booking request received:\n\n${JSON.stringify(booking, null, 2)}`
    })

    // Simulate email notification to customer
    console.log('Email notification to customer:', {
      to: body.customerEmail,
      subject: 'Booking Request Received',
      body: `Thank you for your booking request. We'll review it and get back to you soon.\n\nBooking ID: ${bookingId}`
    })

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Booking request submitted successfully'
    })

  } catch (error) {
    console.error('Error processing booking request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // In a real application, you would fetch bookings from a database
  // For now, return a message indicating this endpoint is for POST requests
  return NextResponse.json({
    message: 'This endpoint is for submitting booking requests. Use POST method.'
  })
}
