import { Car } from '@/types'

export const sampleCars: Car[] = [
  {
    id: '1',
    name: 'BMW 3 Series',
    model: '320i',
    year: 2023,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    pricePerDay: 120,
    pricePerMonth: 3000,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    ],
    features: ['GPS Navigation', 'Bluetooth', 'Air Conditioning', 'Leather Seats'],
    description: 'Luxury sedan with premium features and excellent fuel efficiency.',
    available: true,
    location: 'Downtown Office'
  },
  {
    id: '2',
    name: 'Audi A4',
    model: 'A4 Quattro',
    year: 2022,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    pricePerDay: 110,
    pricePerMonth: 2800,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    ],
    features: ['All-Wheel Drive', 'Premium Sound', 'Heated Seats', 'Sunroof'],
    description: 'Sophisticated luxury sedan with quattro all-wheel drive.',
    available: true,
    location: 'Airport Branch'
  },
  {
    id: '3',
    name: 'Mercedes-Benz C-Class',
    model: 'C300',
    year: 2023,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    pricePerDay: 130,
    pricePerMonth: 3200,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    ],
    features: ['MBUX Infotainment', 'Ambient Lighting', 'Wireless Charging', 'Parking Assist'],
    description: 'Elegant luxury sedan with cutting-edge technology.',
    available: true,
    location: 'Downtown Office'
  },
  {
    id: '4',
    name: 'Toyota Camry',
    model: 'LE',
    year: 2022,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    pricePerDay: 80,
    pricePerMonth: 2000,
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    ],
    features: ['Hybrid Engine', 'Lane Departure Warning', 'Adaptive Cruise Control', 'Apple CarPlay'],
    description: 'Reliable and fuel-efficient hybrid sedan perfect for city driving.',
    available: true,
    location: 'Airport Branch'
  },
  {
    id: '5',
    name: 'Honda Civic',
    model: 'Sport',
    year: 2023,
    seats: 5,
    transmission: 'Manual',
    fuel: 'Petrol',
    pricePerDay: 70,
    pricePerMonth: 1800,
    images: [
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
    ],
    features: ['Sport Mode', 'Honda Sensing', '7-inch Display', 'Remote Start'],
    description: 'Sporty and fun-to-drive compact car with excellent fuel economy.',
    available: false,
    location: 'Downtown Office'
  }
]

export const getCars = () => sampleCars
export const getCarById = (id: string) => sampleCars.find(car => car.id === id)
