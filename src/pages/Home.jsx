import React, { useState, useEffect } from 'react'
import { Ticket ,User} from 'lucide-react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'

// Import your images (adjust the paths according to your directory structure)
import Image1 from '../assets/img1.jpg'
import Image2 from '../assets/img2.jpg'
import Image3 from '../assets/img3.jpg'
import Image4 from '../assets/logo.jpg'

const Home = () => {
  const [ticketId, setTicketId] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)

  // Slideshow images from your directory
  const slides = [
    {
      image: Image3,
      title: "Contibute to the society",
      description: "Your reports help us make our community a better place for everyone"
    },
    {
      image: Image1,
      title: "Raise a issue",
      description: "Report problems in your locality and help us improve the community together"
    },
    {
      image: Image2,
      title: "Raise issue by a click",
      description: "Quickly and easily report issues with just a few taps on your phone"
    },
    {
      image: Image4,
      title: "Voice of the people",
      description: "We're available around the clock to help you with any issues you might encounter."
    }
  ]

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-sm mx-auto bg-white min-h-screen">
          {/* Header Section */}
          <div className="px-4 py-6">
            {/* Profile and Greeting */}
            <div className="flex items-center space-x-3 mb-4">
              <Link to="/Profile">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User/>
              </div>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Hey, Welcome!</h1>
                <p className="text-sm text-gray-500">Have a nice day today</p>
              </div>
            </div>

            {/* Slideshow Container */}
            <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg">
              <div
                className="h-48 bg-cover bg-center relative transition-all duration-500"
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slides[currentSlide].image})` 
                }}
              >
                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-6">
                  <h2 className="text-white text-xl font-bold mb-2">{slides[currentSlide].title}</h2>
                  <p className="text-white text-sm opacity-90 leading-relaxed">
                    {slides[currentSlide].description}
                  </p>
                </div>
                
                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Have an issue Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Have an issue?</h3>

              {/* Raise a ticket button */}
              <Link
                to="/RaiseATicket"
                className="w-full bg-[#FFF1E5] hover:bg-orange-200 rounded-xl p-4 flex items-center justify-between transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="font-medium text-gray-800">Raise a Issue</span>
                </div>
                <svg
                  className="w-5 h-5 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Ticket ID Input */}
              <div className="w-full bg-[#FFF1E5] mt-1 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="enter ticket id"
                      value={ticketId}
                      onChange={(e) => setTicketId(e.target.value)}
                      className="w-full bg-transparent font-medium text-gray-600 placeholder-gray-500 focus:outline-none border-none pb-1"
                    />
                    <div className="w-full h-0.5 bg-orange-300 mt-1"></div>
                  </div>
                </div>
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </>
  )
}

export default Home