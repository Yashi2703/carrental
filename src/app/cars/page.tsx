'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CarCard from '@/components/CarCard'
import FilterPanel from '@/components/FilterPanel'
import { getCars } from '@/data/cars'
import { Car, SearchFilters } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CARS_PER_PAGE = 6

export default function CarsPage() {
  const searchParams = useSearchParams()
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    pickupDate: '',
    returnDate: '',
    keyword: '',
    model: '',
    priceRange: [0, 1000],
    year: 0,
    transmission: '',
    seats: 0,
    sortBy: 'newest'
  })
  const [showFilters, setShowFilters] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setCars(getCars())
    setIsClient(true)
    
    // Initialize filters from URL params after client-side hydration
    if (searchParams) {
      setFilters({
        location: searchParams.get('location') || '',
        pickupDate: searchParams.get('pickupDate') || '',
        returnDate: searchParams.get('returnDate') || '',
        keyword: searchParams.get('keyword') || '',
        model: '',
        priceRange: [0, 1000],
        year: 0,
        transmission: '',
        seats: 0,
        sortBy: 'newest'
      })
    }
  }, [searchParams])

  useEffect(() => {
    let filtered = [...cars]

    // Apply filters
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase()
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(keyword) ||
        car.model.toLowerCase().includes(keyword) ||
        car.brand?.toLowerCase().includes(keyword)
      )
    }

    if (filters.model) {
      filtered = filtered.filter(car => car.model === filters.model)
    }

    if (filters.priceRange) {
      filtered = filtered.filter(car => 
        car.pricePerDay >= filters.priceRange![0] && 
        car.pricePerDay <= filters.priceRange![1]
      )
    }

    if (filters.year) {
      filtered = filtered.filter(car => car.year === filters.year)
    }

    if (filters.transmission) {
      filtered = filtered.filter(car => car.transmission === filters.transmission)
    }

    if (filters.seats) {
      filtered = filtered.filter(car => car.seats === filters.seats)
    }

    // Apply sorting
    if (filters.sortBy === 'price') {
      filtered.sort((a, b) => a.pricePerDay - b.pricePerDay)
    } else if (filters.sortBy === 'newest') {
      filtered.sort((a, b) => b.year - a.year)
    }

    setFilteredCars(filtered)
    setCurrentPage(1)
  }, [cars, filters])

  const totalPages = Math.ceil(filteredCars.length / CARS_PER_PAGE)
  const startIndex = (currentPage - 1) * CARS_PER_PAGE
  const endIndex = startIndex + CARS_PER_PAGE
  const currentCars = filteredCars.slice(startIndex, endIndex)

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      pickupDate: '',
      returnDate: '',
      keyword: '',
      model: '',
      priceRange: [0, 1000],
      year: 0,
      transmission: '',
      seats: 0,
      sortBy: 'newest'
    })
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cars...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Cars</h1>
          <p className="text-gray-600">
            {filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''} available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-primary w-full"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>
          </div>

          {/* Cars Grid */}
          <div className="lg:w-3/4">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value as 'price' | 'newest' })}
                  className="input-field w-40"
                >
                  <option value="newest">Newest First</option>
                  <option value="price">Price: Low to High</option>
                </select>
              </div>
            </div>

            {/* Cars Grid */}
            {currentCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {currentCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredCars.length)} of {filteredCars.length} results
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          page === currentPage
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
