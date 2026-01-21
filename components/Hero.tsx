'use client'

import { ChevronDown, Github, Linkedin, Mail, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Hero() {
  const [typedText, setTypedText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(100)
  
  const texts = ['Web Developer', 'UI/UX Designer', 'Problem Solver']

  // Smooth typing effect
  useEffect(() => {
    const currentText = texts[textIndex]
    
    const typeCharacter = () => {
      if (!isDeleting) {
        // Mengetik karakter
        if (typedText.length < currentText.length) {
          setTypedText(currentText.substring(0, typedText.length + 1))
          setSpeed(100)
        } else {
          // Tunggu 2 detik setelah selesai mengetik
          setSpeed(2000)
          setTimeout(() => {
            setIsDeleting(true)
            setSpeed(50)
          }, 2000)
        }
      } else {
        // Menghapus karakter
        if (typedText.length > 0) {
          setTypedText(currentText.substring(0, typedText.length - 1))
          setSpeed(50)
        } else {
          // Pindah ke teks berikutnya
          setIsDeleting(false)
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
          setSpeed(500)
        }
      }
    }

    const timer = setTimeout(typeCharacter, speed)
    return () => clearTimeout(timer)
  }, [typedText, textIndex, isDeleting, speed])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="min-h-screen flex items-center px-4 pt-16">
      <div className="max-w-4xl mx-auto w-full text-center">
        
        {/* Profile Image - SAMA PERSIS UKURAN DAN POSISINYA */}
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-1">
          <div className="w-full h-full rounded-full bg-white overflow-hidden">
            {/* Ganti bagian ini dengan foto Anda */}
            <img
              src="/images/Foto Saya.jpeg" // Path ke foto Anda
              alt="Foto Puji Haryadi"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback jika gambar tidak ada
                e.currentTarget.style.display = 'none'
                const parent = e.currentTarget.parentElement
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center text-4xl">
                      👨‍💻
                    </div>
                  `
                }
              }}
            />
          </div>
        </div>

        {/* Title & Typing - TETAP SAMA */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Halo, saya{' '}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Puji Haryadi
          </span>
        </h1>
        
        <div className="h-12 mb-6">
          <h2 className="text-2xl md:text-3xl text-gray-700">
            Seorang <span className="text-blue-600 font-semibold">{typedText}</span>
            <span className={`inline-block w-[3px] h-8 ml-1 ${isDeleting ? 'bg-gray-400' : 'bg-blue-600'} animate-pulse`}></span>
          </h2>
        </div>

        {/* Description - TETAP SAMA */}
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Membangun aplikasi web modern dengan React, Next.js, dan teknologi terkini.
          Fokus pada performa, UX yang baik, dan code yang clean.
        </p>

        {/* CTA Buttons - TETAP SAMA */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2 group"
          >
            Hubungi Saya
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => scrollTo('projects')}
            className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 font-semibold rounded-full hover:bg-blue-50 hover:shadow-lg transition-all"
          >
            Lihat Proyek
          </button>
        </div>

        {/* Social Links - TETAP SAMA */}
        {/* <div className="flex justify-center gap-6 mb-12">
          <a
            href="https://github.com/Haryadipuji96"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-xl transition-all hover:scale-110 text-gray-600 hover:text-gray-900"
          >
            <Github size={24} />
          </a>
          <a
            href="#"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-xl transition-all hover:scale-110 text-gray-600 hover:text-blue-700"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:email@anda.com"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-xl transition-all hover:scale-110 text-gray-600 hover:text-red-600"
          >
            <Mail size={24} />
          </a>
        </div> */}

        {/* Tech Stack - TETAP SAMA */}
        <div className="mb-12">
          <p className="text-gray-500 mb-4">Tech yang saya gunakan:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'MongoDB'].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll Down - TETAP SAMA */}
        <button
          onClick={() => scrollTo('about')}
          className="animate-bounce text-blue-600 hover:text-cyan-500 transition-colors"
        >
          <ChevronDown size={32} />
        </button>

      </div>

      {/* Background Effects - TETAP SAMA */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-30"></div>
      </div>
    </section>
  )
}