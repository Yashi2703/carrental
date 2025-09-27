export default function ThemeDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4 font-display">
            New Color Theme Demo
          </h1>
          <p className="text-xl text-secondary-600">
            Modern, professional color palette for car rental business
          </p>
        </div>

        {/* Color Palette */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Primary Colors */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Primary Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-lg"></div>
                <span className="text-sm text-secondary-600">Primary 500</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600 rounded-lg"></div>
                <span className="text-sm text-secondary-600">Primary 600</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-700 rounded-lg"></div>
                <span className="text-sm text-secondary-600">Primary 700</span>
              </div>
            </div>
          </div>

          {/* Secondary Colors */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Secondary Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-500 rounded-lg"></div>
                <span className="text-sm text-secondary-600">Secondary 500</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-600 rounded-lg"></div>
                <span className="text-sm text-secondary-600">Secondary 600</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-700 rounded-lg"></div>
                <span className="text-sm text-secondary-600">Secondary 700</span>
              </div>
            </div>
          </div>

          {/* Accent Colors */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Accent Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-500 rounded-lg"></div>
                <span className="text-sm text-secondary-600">Accent 500</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-600 rounded-lg"></div>
                <span className="text-sm text-secondary-600">Accent 600</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-700 rounded-lg"></div>
                <span className="text-sm text-secondary-600">Accent 700</span>
              </div>
            </div>
          </div>

          {/* Status Colors */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Status Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success-500 rounded-lg"></div>
                <span className="text-sm text-secondary-600">Success</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-warning-500 rounded-lg"></div>
                <span className="text-sm text-secondary-600">Warning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-error-500 rounded-lg"></div>
                <span className="text-sm text-secondary-600">Error</span>
              </div>
            </div>
          </div>
        </div>

        {/* Button Examples */}
        <div className="card p-8 mb-12">
          <h3 className="text-2xl font-bold text-secondary-900 mb-6 font-display">Button Styles</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
            <button className="btn-accent">Accent Button</button>
          </div>
        </div>

        {/* Card Examples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card-hover p-6">
            <h4 className="text-lg font-semibold text-secondary-900 mb-2">Hover Card</h4>
            <p className="text-secondary-600">This card has hover effects and transforms on interaction.</p>
          </div>
          <div className="card p-6">
            <h4 className="text-lg font-semibold text-secondary-900 mb-2">Regular Card</h4>
            <p className="text-secondary-600">Standard card with subtle shadows and rounded corners.</p>
          </div>
          <div className="card p-6 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
            <h4 className="text-lg font-semibold text-primary-900 mb-2">Gradient Card</h4>
            <p className="text-primary-700">Card with gradient background using primary colors.</p>
          </div>
        </div>

        {/* Typography */}
        <div className="card p-8">
          <h3 className="text-2xl font-bold text-secondary-900 mb-6 font-display">Typography</h3>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-secondary-900 font-display">Display Heading</h1>
            <h2 className="text-3xl font-semibold text-secondary-800">Section Heading</h2>
            <h3 className="text-2xl font-medium text-secondary-700">Subsection Heading</h3>
            <p className="text-lg text-secondary-600">Large paragraph text with good readability.</p>
            <p className="text-base text-secondary-600">Regular paragraph text for body content.</p>
            <p className="text-sm text-secondary-500">Small text for captions and metadata.</p>
            <p className="text-gradient text-2xl font-bold">Gradient text for special emphasis.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
