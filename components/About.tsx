'use client'

import { Code, Palette, Zap, Sparkles, Rocket, Users, Target, Award, Mail, MapPin, Calendar, Download } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

// ==================== DATA YANG BISA DIEDIT ====================
// GANTI URL FOTO DI SINI:
const PROFILE_PHOTO_URL = "/images/Gambarn Saya.jpg" // Ganti dengan path foto Anda

// ===== KONFIGURASI CV (EDIT BAGIAN INI) =====
const CV_FILE_PATH = "/cv/CV PUJI HARYADI.pdf" // Path ke file CV di folder public/cv/
const CV_FILE_NAME = "CV_Puji_Haryadi" // Nama file yang akan diunduh
// ===========================================

const ABOUT_DATA = {
  title: "Tentang Saya",
  subtitle: "Kenali saya lebih dekat",
  mainTitle: "Membangun Pengalaman Digital yang Berarti",
  description: [
    "Saya seorang full-stack developer dengan pengalaman lebih dari 3 tahun dalam membangun aplikasi web modern. Perjalanan saya di dunia teknologi dimulai dengan rasa penasaran dan berkembang menjadi karier yang didedikasikan untuk menciptakan solusi digital yang berdampak.",
    "Saya percaya pada penulisan kode yang bersih, mudah dipelihara, dan mendesain antarmuka pengguna yang intuitif yang tidak hanya terlihat bagus tetapi juga menyelesaikan masalah nyata. Pendekatan saya menggabungkan keahlian teknis dengan pemikiran kreatif untuk memberikan hasil yang luar biasa."
  ],
  // Statistik pencapaian
  stats: [
    { value: "10+", label: "Proyek Selesai", icon: <Rocket className="w-5 h-5" /> },
    { value: "3+", label: "Tahun Pengalaman", icon: <Award className="w-5 h-5" /> },
    { value: "100%", label: "Kepuasan Klien", icon: <Target className="w-5 h-5" /> },
    { value: "20+", label: "Klien Bahagia", icon: <Users className="w-5 h-5" /> }
  ],
  // Keahlian/Keunggulan
  features: [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Kode Bersih & Scalable",
      description: "Membangun arsitektur yang mudah dipelihara dan tumbuh bersama bisnis Anda",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Desain UI/UX Modern",
      description: "Membuat antarmuka yang indah, berpusat pada pengguna dengan tren desain terbaru",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Fokus pada Performa",
      description: "Mengoptimalkan waktu muat yang super cepat dan interaksi yang mulus",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Solusi Inovatif",
      description: "Memanfaatkan teknologi mutakhir untuk menyelesaikan masalah kompleks",
      color: "from-emerald-500 to-teal-500"
    }
  ],
  // Info pribadi
  personalInfo: [
    { label: "Nama", value: "Puji Haryadi", icon: <Code className="w-4 h-4" /> },
    { label: "Email", value: "fujiharyadi0@gmail.com", icon: <Mail className="w-4 h-4" /> },
    { label: "Lokasi", value: "Tasikmalaya, Jawa Barat", icon: <MapPin className="w-4 h-4" /> },
    { label: "Status", value: "Menerima Project dan Bekerja Sama", icon: <Calendar className="w-4 h-4" /> }
  ]
}
// ==================== AKHIR DATA EDITABLE ====================

export function About() {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'info'>('overview')
  const [isDownloading, setIsDownloading] = useState(false)

  // Fungsi untuk mengunduh CV
  const handleDownloadCV = () => {
    try {
      setIsDownloading(true)
      
      // Buat elemen link untuk download
      const link = document.createElement('a')
      link.href = CV_FILE_PATH
      link.download = CV_FILE_NAME
      
      // Tambahkan ke dokumen dan klik otomatis
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Feedback ke pengguna
      setTimeout(() => {
        setIsDownloading(false)
        alert('CV berhasil diunduh! Cek folder download Anda.')
      }, 500)
      
    } catch (error) {
      console.error('Gagal mengunduh CV:', error)
      setIsDownloading(false)
      
      // Fallback - buka di tab baru jika download langsung gagal
      window.open(CV_FILE_PATH, '_blank')
      
      alert('Membuka CV di tab baru... Silakan simpan manual dari browser.')
    }
  }

  return (
    <section id="about" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-cyan-100 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 text-blue-600 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {ABOUT_DATA.subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {ABOUT_DATA.title}
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* Content Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-12 gap-0">
            {/* Left Column - Image/Stats */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 sm:p-8 lg:p-12">
              {/* Profile Image */}
              <div className="relative mb-8 sm:mb-10">
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={PROFILE_PHOTO_URL}
                        alt="Foto Profil Pujiharyadi"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                        priority
                      />
                      
                      {/* Placeholder jika gambar error */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 opacity-0 hover:opacity-100 transition-opacity">
                        <div className="text-center p-3 sm:p-4">
                          <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">👨‍💻</div>
                          <div className="text-xs sm:text-sm text-gray-600">
                            {ABOUT_DATA.personalInfo[0].value}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
                {ABOUT_DATA.stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-sm sm:shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1"
                  >
                    <div className="flex justify-center mb-1.5 sm:mb-2">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Personal Info Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm sm:shadow-md">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  Info Profil
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  {ABOUT_DATA.personalInfo.map((info, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                        {info.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm text-gray-600">{info.label}</div>
                        <div className="font-medium text-sm sm:text-base text-gray-800 truncate">
                          {info.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12">
              {/* Tab Navigation */}
              <div className="flex space-x-1 sm:space-x-2 mb-6 sm:mb-8 p-1 bg-gray-100 rounded-xl sm:rounded-2xl max-w-full sm:max-w-md">
                {(['overview', 'skills', 'info'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-white text-blue-600 shadow-sm sm:shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab === 'overview' ? 'Ringkasan' : 
                     tab === 'skills' ? 'Keahlian' : 'Info Lain'}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mb-8 sm:mb-10">
                {activeTab === 'overview' && (
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                      {ABOUT_DATA.mainTitle}
                    </h3>
                    {ABOUT_DATA.description.map((paragraph, index) => (
                      <p 
                        key={index} 
                        className="text-gray-600 leading-relaxed text-base sm:text-lg"
                      >
                        {paragraph}
                      </p>
                    ))}
                    <div className="pt-4 sm:pt-6">
                      <button 
                        onClick={handleDownloadCV}
                        disabled={isDownloading}
                        className={`group inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm sm:text-base font-semibold rounded-full hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                          isDownloading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {isDownloading ? (
                          <>
                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="hidden sm:inline">Mengunduh...</span>
                            <span className="sm:hidden">Unduh...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Unduh CV Saya</span>
                            <span className="sm:hidden">Unduh CV</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </>
                        )}
                      </button>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1.5 sm:mt-2">
                        Format: PDF • Ukuran: ~2MB
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Keahlian Saya</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {ABOUT_DATA.features.map((feature, index) => (
                        <div
                          key={index}
                          className="group bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-200 hover:border-transparent transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl hover:-translate-y-0.5 sm:hover:-translate-y-1"
                        >
                          <div className={`inline-flex p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${feature.color} mb-3 sm:mb-4`}>
                            <div className="text-white">
                              {feature.icon}
                            </div>
                          </div>
                          <h5 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2">
                            {feature.title}
                          </h5>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            {feature.description}
                          </p>
                          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                              <div 
                                className={`bg-gradient-to-r ${feature.color} h-1.5 sm:h-2 rounded-full transition-all duration-1000 ease-out`}
                                style={{ width: `${85 + (index * 5)}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1.5 sm:mt-2">
                              <span>Tingkat Kemahiran</span>
                              <span className="font-semibold">{85 + (index * 5)}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'info' && (
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Lebih Lanjut Tentang Saya</h4>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 text-sm sm:text-base">Filosofi Pengembangan</h5>
                            <p className="text-gray-600 text-xs sm:text-sm mt-0.5 sm:mt-1">
                              Saya percaya pada penulisan kode yang tidak hanya fungsional, tetapi juga bersih, 
                              mudah dipelihara, dan scalable untuk pertumbuhan masa depan.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 text-sm sm:text-base">Kolaborasi Tim</h5>
                            <p className="text-gray-600 text-xs sm:text-sm mt-0.5 sm:mt-1">
                              Keterampilan komunikasi yang sangat baik dan pengalaman bekerja dalam tim agile 
                              untuk menyelesaikan proyek secara efisien.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 text-sm sm:text-base">Pembelajaran Terus Menerus</h5>
                            <p className="text-gray-600 text-xs sm:text-sm mt-0.5 sm:mt-1">
                              Selalu mengikuti perkembangan teknologi dan praktik terbaru 
                              dalam pengembangan web.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                      <h5 className="font-semibold text-gray-900 text-sm sm:text-base mb-2 sm:mb-3">Ketersediaan CV</h5>
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                        CV saya tersedia untuk diunduh dalam format PDF. Berisi informasi lengkap 
                        tentang pengalaman kerja, keterampilan teknis, dan pencapaian profesional.
                      </p>
                      <button 
                        onClick={handleDownloadCV}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs sm:text-sm font-medium rounded-full hover:shadow-sm sm:hover:shadow-md transition-shadow"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Unduh CV Lengkap</span>
                        <span className="sm:hidden">Unduh CV</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Call to action */}
              <div className="border-t border-gray-200 pt-6 sm:pt-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm sm:text-base">Siap bekerja sama?</h5>
                    <p className="text-gray-600 text-xs sm:text-sm">Mari bangun sesuatu yang luar biasa!</p>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-full hover:shadow-md sm:hover:shadow-lg transition-shadow hover:scale-105"
                    >
                      <span className="hidden sm:inline">Hubungi Saya</span>
                      <span className="sm:hidden">Kontak</span>
                    </button>
                    <button 
                      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-4 sm:px-6 py-2 border-2 border-blue-600 text-blue-600 text-sm font-semibold rounded-full hover:bg-blue-50 transition-colors hover:scale-105"
                    >
                      <span className="hidden sm:inline">Lihat Proyek</span>
                      <span className="sm:hidden">Proyek</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}