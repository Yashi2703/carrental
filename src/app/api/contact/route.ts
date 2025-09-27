import { NextRequest, NextResponse } from 'next/server'
import { ContactForm } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: ContactForm = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Save the contact form to a database
    // 2. Send email notifications to admin
    // 3. Send auto-reply to customer
    // 4. Integrate with CRM system

    // Simulate email notification to admin
    console.log('Contact form submission to admin:', {
      to: 'admin@carrental.com',
      subject: 'New Contact Form Submission',
      body: `New contact form submission received:\n\nName: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone}\nMessage: ${body.message}`
    })

    // Simulate auto-reply to customer
    console.log('Auto-reply to customer:', {
      to: body.email,
      subject: 'Thank you for contacting us',
      body: `Dear ${body.name},\n\nThank you for contacting us. We have received your message and will get back to you within 24 hours.\n\nBest regards,\nCarRental Team`
    })

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully'
    })

  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // In a real application, you might want to return contact information
  return NextResponse.json({
    message: 'This endpoint is for submitting contact forms. Use POST method.'
  })
}
