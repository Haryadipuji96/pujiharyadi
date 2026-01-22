'use client'

import { useState, useEffect, useRef } from 'react'
import { Home, User, Code2, Briefcase, GraduationCap, Mail, Sparkles } from 'lucide-react'

const menuItems = [
  { name: 'Home', href: '#home', icon: <Home className="w-4 h-4" /> },
  { name: 'About', href: '#about', icon: <User className="w-4 h-4" /> },
  { name: 'Skills', href: '#skills', icon: <Sparkles className="w-4 h-4" /> },
  { name: 'Projects', href: '#projects', icon: <Code2 className="w-4 h-4" /> },
  { name: 'Experience', href: '#experience', icon: <Briefcase className="w-4 h-4" /> },
  { name: 'Education', href: '#education', icon: <GraduationCap className="w-4 h-4" /> },
  { name: 'Contact', href: '#contact', icon: <Mail className="w-4 h-4" /> },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false) // State untuk detect mobile
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Detect mobile on client side only
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkIfMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Update scroll progress
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      const progress = (currentScrollY / scrollHeight) * 100
      setScrollProgress(Math.min(progress, 100))
      
      // Glassmorphism effect saat scroll
      setIsScrolled(currentScrollY > 20)
      
      // Update active section
      const sections = menuItems.map(item => item.href.substring(1))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial check
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      })
      setIsMobileMenuOpen(false)
    }
  }

  // Navbar background style - FIXED untuk hydration
  const getNavbarBackground = () => {
    // Default untuk SSR - hanya background putih
    // Client-side nanti akan di-update oleh useEffect
    if (!isMobile && isScrolled) {
      // Desktop dengan glassmorphism saat scroll
      return 'bg-gradient-to-b from-blue-600/5 via-blue-500/5 to-cyan-500/5 backdrop-blur-xl shadow-lg'
    } else if (isMobile) {
      // Mobile: selalu background putih
      return isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm'
    }
    // Default untuk SSR dan desktop tidak discroll
    return 'bg-white md:bg-transparent'
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarBackground()}`}
        style={{
          borderBottom: isScrolled ? '1px solid rgba(59, 130, 246, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('#home')}
              className="flex items-center gap-3 group"
            >
              <div className={`relative w-10 h-10 rounded-xl transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gradient-to-br from-blue-600 to-cyan-500 shadow-md'
                  : 'bg-gradient-to-br from-blue-600 to-cyan-500'
              }`}>
                <div className={`absolute inset-0 rounded-xl flex items-center justify-center`}>
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent"></div>
              </div>
              <div className="text-left">
                <div className={`text-xl font-bold transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent'
                }`}>
                  Puji Haryadi
                </div>
                <div className={`text-xs transition-all duration-300 ${
                  isScrolled ? 'text-blue-500/80' : 'text-gray-500 group-hover:text-blue-600'
                }`}>
                  Portfolio
                </div>
              </div>
            </button>

            {/* Desktop Menu */}
            <div className={`hidden md:flex items-center space-x-1 rounded-2xl px-2 py-2 transition-all duration-300 ${
              isScrolled 
                ? 'bg-gradient-to-r from-blue-50/20 to-cyan-50/10 backdrop-blur-md border border-blue-200/30' 
                : 'bg-white/30 backdrop-blur-sm'
            }`}>
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 relative group ${
                    activeSection === item.href.substring(1)
                      ? isScrolled
                        ? 'bg-gradient-to-r from-blue-500/20 to-cyan-400/10 text-blue-700 border border-blue-300/30'
                        : 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600'
                      : isScrolled
                        ? 'text-blue-700/80 hover:text-blue-800 hover:bg-blue-50/30'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                >
                  <span className={`transition-colors ${
                    activeSection === item.href.substring(1)
                      ? isScrolled ? 'text-blue-600' : 'text-blue-600'
                      : isScrolled ? 'text-blue-600/70' : 'text-gray-500'
                  }`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                  {activeSection === item.href.substring(1) && (
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 rounded-full ${
                      isScrolled
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-500'
                    }`}></div>
                  )}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button dengan Animasi Burger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${
                isMobileMenuOpen 
                  ? 'bg-gradient-to-br from-blue-600 to-cyan-500' 
                  : 'bg-white border border-gray-200 hover:border-blue-300'
              } shadow-sm`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {/* Animated Burger Icon */}
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  } ${isMobileMenuOpen ? 'bg-white' : 'bg-gray-700'}`}
                />
                <span
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  } ${isMobileMenuOpen ? 'bg-white' : 'bg-gray-700'}`}
                />
                <span
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  } ${isMobileMenuOpen ? 'bg-white' : 'bg-gray-700'}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className={`h-1 transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}>
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"
            style={{
              width: `${scrollProgress}%`,
              transition: 'width 0.2s ease-out',
            }}
          />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop dengan animasi fade */}
        <div 
          className={`absolute inset-0 transition-all duration-300 ${
            isMobileMenuOpen 
              ? 'bg-black/40 backdrop-blur-sm' 
              : 'bg-transparent'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel dengan animasi slide */}
        <div
          ref={mobileMenuRef}
          className={`absolute top-16 right-4 left-4 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-10'
          }`}
        >
          {/* Menu Header */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">Menu Navigasi</div>
                <div className="text-sm opacity-90">Pilih bagian untuk langsung scroll</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {menuItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 mb-2 hover:scale-[1.02] active:scale-[0.98] ${
                  activeSection === item.href.substring(1)
                    ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  activeSection === item.href.substring(1)
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.icon}
                </div>
                <div className="text-left flex-1">
                  <div className={`font-medium ${
                    activeSection === item.href.substring(1)
                      ? 'text-blue-800'
                      : 'text-gray-800'
                  }`}>
                    {item.name}
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  activeSection === item.href.substring(1)
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500'
                    : 'bg-gray-300'
                }`} />
              </button>
            ))}

            {/* Contact Button */}
            <div className="mt-6 p-4 border-t border-gray-100">
              <button
                onClick={() => scrollToSection('#contact')}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 active:scale-[0.98] shadow-md"
              >
                Hubungi Saya
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full mt-3 py-3 text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                Tutup Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx global>{`
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 64px;
        }

        /* Body padding untuk kompensasi fixed navbar */
        body {
          padding-top: 64px;
        }

        /* Custom scrollbar untuk mobile menu */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(59, 130, 246, 0.3);
          border-radius: 2px;
        }

        /* Selection color dengan blue theme */
        ::selection {
          background: rgba(59, 130, 246, 0.3);
          color: white;
        }
      `}</style>
    </>
  )
}