'use client'

import { useState, useEffect, useRef } from 'react'
import { Home, User, Code2, Briefcase, GraduationCap, Mail, Sparkles, ChevronRight } from 'lucide-react'

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
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const [isVisible, setIsVisible] = useState(true)

  // Handle scroll effect dengan glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Update scroll progress
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      const progress = (currentScrollY / scrollHeight) * 100
      setScrollProgress(Math.min(progress, 100))
      
      // Deteksi scroll untuk show/hide navbar
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false) // Hide navbar saat scroll down
      } else {
        setIsVisible(true) // Show navbar saat scroll up
      }
      lastScrollY.current = currentScrollY
      
      // Glassmorphism effect berdasarkan scroll position
      setIsScrolled(currentScrollY > 20)
      
      // Update active section
      const sections = menuItems.map(item => item.href.substring(1))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    // Only add event listener on client side
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled 
            ? 'bg-gradient-to-b from-blue-600/5 via-blue-500/5 to-cyan-500/5 backdrop-blur-xl shadow-lg' 
            : 'bg-transparent'
        }`}
        style={{
          background: isScrolled 
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)' 
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(59, 130, 246, 0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('#home')}
              className="flex items-center gap-3 group"
            >
              <div className={`relative w-10 h-10 rounded-xl transition-all duration-500 ${
                isScrolled 
                  ? 'bg-gradient-to-br from-blue-600/30 to-cyan-500/20 backdrop-blur-sm' 
                  : 'bg-gradient-to-br from-blue-600 to-cyan-500'
              }`}>
                <div className={`absolute inset-0 rounded-xl flex items-center justify-center ${
                  isScrolled 
                    ? 'bg-gradient-to-br from-blue-600/40 to-cyan-500/30' 
                    : ''
                }`}>
                  <Code2 className={`w-5 h-5 ${isScrolled ? 'text-white' : 'text-white'}`} />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent"></div>
              </div>
              <div className="text-left">
                <div className={`text-xl font-bold transition-all duration-500 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent'
                }`}>
                  Puji Haryadi
                </div>
                <div className={`text-xs transition-all duration-500 ${
                  isScrolled ? 'text-blue-500/80' : 'text-gray-500 group-hover:text-blue-600'
                }`}>
                  Portfolio
                </div>
              </div>
            </button>

            {/* Desktop Menu - BLUE THEME saat scroll */}
            <div className={`hidden md:flex items-center space-x-1 rounded-2xl px-2 py-2 transition-all duration-500 ${
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${
                isMobileMenuOpen 
                  ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white' 
                  : isScrolled
                    ? 'bg-gradient-to-r from-blue-50/20 to-cyan-50/10 backdrop-blur-md text-blue-700 border border-blue-200/30 hover:bg-blue-50/40'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-blue-50'
              } shadow-lg`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45' : '-translate-y-2'
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45' : 'translate-y-2'
                  }`}
                />
              </div>
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent ${
                isScrolled && !isMobileMenuOpen ? 'opacity-30' : 'opacity-0'
              }`}></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay dengan Blue Theme */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 transition-all duration-500 ${
            isMobileMenuOpen 
              ? 'bg-gradient-to-br from-blue-900/70 via-blue-800/50 to-cyan-900/30 backdrop-blur-lg' 
              : 'bg-transparent'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel dengan Blue Glassmorphism */}
        <div
          ref={mobileMenuRef}
          className={`absolute top-20 right-4 left-4 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 transform ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-10'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          {/* Blue Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-blue-600/5"></div>
          
          {/* Menu Content */}
          <div className="relative z-10">
            {/* Menu Header */}
            <div className="p-6 border-b border-blue-400/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-900">Navigasi</div>
                  <div className="text-sm text-blue-700/70">Pilih bagian</div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              {menuItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mb-2 ${
                    activeSection === item.href.substring(1)
                      ? 'bg-gradient-to-r from-blue-500/20 to-cyan-400/10 border border-blue-300/30'
                      : 'hover:bg-blue-500/10'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeSection === item.href.substring(1)
                      ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white'
                      : 'bg-blue-500/10 text-blue-700'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="text-left flex-1">
                    <div className={`font-medium ${
                      activeSection === item.href.substring(1)
                        ? 'text-blue-800'
                        : 'text-blue-900/90'
                    }`}>
                      {item.name}
                    </div>
                    <div className="text-xs text-blue-700/60">
                      Klik untuk navigasi
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    activeSection === item.href.substring(1)
                      ? 'text-blue-600'
                      : 'text-blue-700/60'
                  }`} />
                </button>
              ))}
            </div>

            {/* Menu Footer */}
            <div className="p-4 border-t border-blue-400/20">
              <button
                onClick={() => scrollToSection('#contact')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 active:scale-95 mb-2"
              >
                Hubungi Saya
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 text-blue-700/80 hover:text-blue-800 transition-colors text-sm"
              >
                Tutup Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scroll Indicator */}
      <div className={`fixed top-0 left-0 right-0 h-1 z-50 transition-opacity duration-500 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}>
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"
          style={{
            width: `${scrollProgress}%`,
            transition: 'width 0.3s ease-out',
          }}
        />
      </div>

      {/* Custom CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Custom scrollbar untuk mobile menu */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(59, 130, 246, 0.3);
          border-radius: 2px;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
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