import Link from 'next/link'
import { Phone, Mail, MessageCircle } from 'lucide-react'

export default function ContactCTA() {
  return (
    <section className="py-16 hero-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            Need Help Choosing?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto font-medium">
            Our friendly team is here to help you find the perfect car for your needs. 
            Get in touch with us today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Contact Us</span>
            </Link>
            
            <div className="flex items-center space-x-6 text-primary-100">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>info@carrental.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
