# CarRental - Premium Car Rental Website

A modern, responsive car rental website built with Next.js 15, TypeScript, and Tailwind CSS. This project provides a complete frontend solution for a car rental business with booking management, contact forms, and admin functionality.

## 🚀 Features

### Pages
- **Home Page** - Hero section with search functionality, featured cars carousel, benefits section, and contact CTA
- **Car Listing** - Grid of cars with pagination, advanced filters, and sorting options
- **Car Detail** - Photo gallery, full specifications, pricing, and booking request form
- **Contact Us** - Contact form with business information and map placeholder
- **My Bookings** - Booking history with status tracking (Login required)

### Key Components
- **HeroSection** - Search form with pickup/return dates, location, and keyword search
- **FeaturedCars** - Interactive carousel showcasing popular vehicles
- **CarCard** - Reusable card component for car listings
- **FilterPanel** - Advanced filtering by model, price, year, transmission, seats
- **ImageGallery** - High-quality image gallery with lightbox functionality
- **BookingForm** - Comprehensive booking request form with validation
- **Header/Footer** - Responsive navigation and footer with contact information

### Technical Features
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **TypeScript** - Full type safety throughout the application
- **Form Validation** - Client-side validation with error handling
- **Loading States** - Graceful loading indicators and error messages
- **SEO Optimized** - Meta tags, semantic HTML, and accessibility features
- **API Integration** - RESTful API routes for bookings and contact forms
- **Authentication Required** - Login mandatory for booking requests and viewing booking history

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Date Picker**: React DatePicker
- **Carousel**: Swiper.js
- **Images**: Next.js Image Optimization

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd carrental
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── bookings/      # Booking API endpoints
│   │   └── contact/       # Contact form API endpoints
│   ├── cars/              # Car listing and detail pages
│   ├── contact/           # Contact page
│   ├── bookings/          # My bookings page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── HeroSection.tsx    # Home page hero
│   ├── FeaturedCars.tsx   # Car carousel
│   ├── CarCard.tsx        # Car listing card
│   ├── FilterPanel.tsx    # Search filters
│   ├── ImageGallery.tsx   # Photo gallery
│   └── BookingForm.tsx    # Booking request form
├── data/                  # Sample data
│   └── cars.ts           # Car seed data
└── types/                # TypeScript type definitions
    └── index.ts          # Application types
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database (when implementing backend)
DATABASE_URL=your_database_url

# Email Service (for notifications)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# Cloud Storage (for images)
CLOUDINARY_URL=your_cloudinary_url
# or
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_bucket_name
```

### Image Storage
The application is configured to work with cloud image storage. Update the `next.config.js` file to include your image domains:

```javascript
module.exports = {
  images: {
    domains: ['your-image-domain.com', 'images.unsplash.com'],
  },
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Deploy the `.next` folder to your hosting platform

## 🔌 Backend Integration

### Database Setup
To connect to a real database, you'll need to:

1. **Choose a database** (PostgreSQL, MySQL, MongoDB)
2. **Set up your schema** for cars, bookings, and contacts
3. **Update API routes** to use your database instead of mock data
4. **Add authentication** if needed

### Email Service
For email notifications, integrate with:
- **SendGrid** - `npm install @sendgrid/mail`
- **Nodemailer** - `npm install nodemailer`
- **AWS SES** - `npm install aws-sdk`

### Payment Integration
For payment processing, consider:
- **Stripe** - `npm install stripe`
- **PayPal** - `npm install @paypal/checkout-server-sdk`
- **Square** - `npm install squareup`

## 📱 Features Overview

### Search & Filtering
- Location-based search
- Date range selection
- Keyword search
- Advanced filters (model, price, year, transmission, seats)
- Sorting options (price, newest)

### Booking System
- Date validation
- Price calculation
- Form validation
- Email notifications
- Status tracking

### Responsive Design
- Mobile-first approach
- Touch-friendly interfaces
- Optimized images
- Fast loading times

### Accessibility
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- High contrast support

## 🎨 Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update `src/app/globals.css` for global styles
- Use Tailwind utility classes throughout components

### Content
- Update `src/data/cars.ts` for car inventory
- Modify contact information in `src/components/Footer.tsx`
- Customize business information in contact pages

### Functionality
- Add new filter options in `FilterPanel.tsx`
- Extend booking form fields in `BookingForm.tsx`
- Add new car features and specifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@carrental.com
- Phone: +1 (555) 123-4567
- Documentation: [Project Wiki](link-to-wiki)

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added booking management and status tracking
- **v1.2.0** - Enhanced filtering and search capabilities
- **v1.3.0** - Improved mobile responsiveness and accessibility

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
