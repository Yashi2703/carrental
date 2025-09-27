'use client'

import { useState } from 'react'
import { SearchFilters } from '@/types'
import { X, RotateCcw } from 'lucide-react'

interface FilterPanelProps {
  filters: SearchFilters
  onFilterChange: (filters: Partial<SearchFilters>) => void
  onClearFilters: () => void
}

export default function FilterPanel({ filters, onFilterChange, onClearFilters }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const models = ['BMW 3 Series', 'Audi A4', 'Mercedes-Benz C-Class', 'Toyota Camry', 'Honda Civic']
  const transmissions = ['Manual', 'Automatic']
  const seatOptions = [2, 4, 5, 7, 8]
  const years = [2023, 2022, 2021, 2020, 2019]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={onClearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Clear All</span>
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Search Keyword */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Car name or model"
              value={filters.keyword}
              onChange={(e) => onFilterChange({ keyword: e.target.value })}
              className="input-field"
            />
          </div>

          {/* Model Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model
            </label>
            <select
              value={filters.model || ''}
              onChange={(e) => onFilterChange({ model: e.target.value || undefined })}
              className="input-field"
            >
              <option value="">All Models</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range (per day)
            </label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange?.[0] || ''}
                  onChange={(e) => onFilterChange({ 
                    priceRange: [parseInt(e.target.value) || 0, filters.priceRange?.[1] || 1000] 
                  })}
                  className="input-field flex-1"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange?.[1] || ''}
                  onChange={(e) => onFilterChange({ 
                    priceRange: [filters.priceRange?.[0] || 0, parseInt(e.target.value) || 1000] 
                  })}
                  className="input-field flex-1"
                />
              </div>
              <div className="text-xs text-gray-500">
                ${filters.priceRange?.[0] || 0} - ${filters.priceRange?.[1] || 1000}
              </div>
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
            </label>
            <select
              value={filters.year || ''}
              onChange={(e) => onFilterChange({ year: parseInt(e.target.value) || undefined })}
              className="input-field"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Transmission Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transmission
            </label>
            <div className="space-y-2">
              {transmissions.map((transmission) => (
                <label key={transmission} className="flex items-center">
                  <input
                    type="radio"
                    name="transmission"
                    value={transmission}
                    checked={filters.transmission === transmission}
                    onChange={(e) => onFilterChange({ transmission: e.target.value })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{transmission}</span>
                </label>
              ))}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="transmission"
                  value=""
                  checked={!filters.transmission}
                  onChange={() => onFilterChange({ transmission: undefined })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">All</span>
              </label>
            </div>
          </div>

          {/* Seats Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Seats
            </label>
            <div className="grid grid-cols-2 gap-2">
              {seatOptions.map((seats) => (
                <label key={seats} className="flex items-center">
                  <input
                    type="radio"
                    name="seats"
                    value={seats}
                    checked={filters.seats === seats}
                    onChange={(e) => onFilterChange({ seats: parseInt(e.target.value) })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{seats} seats</span>
                </label>
              ))}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="seats"
                  value=""
                  checked={!filters.seats}
                  onChange={() => onFilterChange({ seats: undefined })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">All</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
