'use client'

import { useState } from 'react'
import { Search, Calendar, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()
  const [searchData, setSearchData] = useState({
    location: '',
    pickupDate: '',
    returnDate: '',
    keyword: ''
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const queryParams = new URLSearchParams()
    
    if (searchData.location) queryParams.set('location', searchData.location)
    if (searchData.pickupDate) queryParams.set('pickupDate', searchData.pickupDate)
    if (searchData.returnDate) queryParams.set('returnDate', searchData.returnDate)
    if (searchData.keyword) queryParams.set('keyword', searchData.keyword)
    
    router.push(`/cars?${queryParams.toString()}`)
  }

  return (
    <section className="relative hero-gradient text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display">
            Find Your Perfect
            <span className="block text-primary-200">Rental Car</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto font-medium">
            Choose from our premium selection of vehicles and enjoy a comfortable, 
            reliable ride for your next adventure.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-strong p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Pickup Location"
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  className="input-field pl-10"
                />
              </div>

              {/* Pickup Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  value={searchData.pickupDate}
                  onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
                  className="input-field pl-10"
                />
              </div>

              {/* Return Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  value={searchData.returnDate}
                  onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                  className="input-field pl-10"
                />
              </div>

              {/* Keyword */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Car Model or Brand"
                  value={searchData.keyword}
                  onChange={(e) => setSearchData({ ...searchData, keyword: e.target.value })}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary text-lg py-3 flex items-center justify-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Search Available Cars</span>
            </button>
          </form>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-200">500+</div>
            <div className="text-primary-100">Cars Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-200">50+</div>
            <div className="text-primary-100">Cities Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-200">10K+</div>
            <div className="text-primary-100">Happy Customers</div>
          </div>
        </div>
      </div>
    </section>
  )
}
