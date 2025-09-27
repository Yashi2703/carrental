export interface Car {
  id: string
  name: string
  model: string
  year: number
  seats: number
  transmission: 'Manual' | 'Automatic'
  fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'
  pricePerDay: number
  pricePerMonth: number
  images: string[]
  features: string[]
  description: string
  available: boolean
  location: string
  brand?: string
}

export interface BookingRequest {
  id?: string
  carId: string
  startDate: string
  endDate: string
  customerName: string
  customerEmail: string
  customerPhone: string
  offerPrice?: number
  estimatedTotal: number
  remarks?: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed'
  createdAt?: string
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
}

export interface SearchFilters {
  location: string
  pickupDate: string
  returnDate: string
  keyword: string
  model?: string
  priceRange?: [number, number]
  year?: number
  transmission?: string
  seats?: number
  sortBy?: 'price' | 'newest'
}
