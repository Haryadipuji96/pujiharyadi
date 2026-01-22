'use client'

import { ExternalLink, Github, Star, Eye, Code2, Rocket, ArrowUpRight, FolderOpen } from 'lucide-react'
import { useState, useEffect } from 'react'

// Data yang sudah dikoreksi
export const projects = [
  {
    title: 'Sistem Kasir Restoran - Laravel',
    description: 'Sistem Point of Sale (POS) untuk restoran dengan fitur manajemen menu, pemesanan multi-meja, pembayaran dengan berbagai metode, dan laporan keuangan real-time. Sistem ini membantu restoran mengoptimalkan operasional harian.',
    technologies: ['Laravel 11', 'MySQL', 'Livewire', 'Bootstrap', 'JavaScript', 'REST API'],
    image: '🍽️',
    liveUrl: '#',
    githubUrl: 'https://github.com/Haryadipuji96?tab=repositories',
    category: 'Web App', // Diubah dari 'Full-Stack' untuk konsistensi
    featured: true,
    stars: 47,
    details: {
      year: '2024',
      client: 'Restoran Sederhana',
      role: 'Full-Stack Developer',
      challenges: 'Integrasi printer struk, manajemen stok real-time, sistem multi-user'
    }
  },
  {
    title: 'Aplikasi Pengelolaan Laundry - Laravel',
    description: 'Sistem manajemen laundry lengkap dengan tracking paket, notifikasi WhatsApp otomatis, invoice digital, dan dashboard analitik. Meningkatkan efisiensi bisnis laundry hingga 40%.',
    technologies: ['Laravel 11', 'MySQL', 'Chart.js', 'WhatsApp API', 'Bootstrap'],
    image: '👕',
    liveUrl: '#',
    githubUrl: 'https://github.com/Haryadipuji96?tab=repositories',
    category: 'Web App',
    featured: true,
    stars: 38,
    details: {
      year: '2024',
      client: 'Laundry Cepat Bersih',
      role: 'Full-Stack Developer',
      challenges: 'Integrasi WhatsApp API, sistem notifikasi multi-channel, tracking real-time'
    }
  },
  {
    title: 'Sistem Booking Hotel - Next.js',
    description: 'Platform reservasi hotel dengan kalender ketersediaan room, sistem pembayaran online, review pelanggan, dan dashboard admin yang komprehensif. Mendukung multiple payment gateway.',
    technologies: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    image: '🏨',
    liveUrl: '#',
    githubUrl: 'https://github.com/Haryadipuji96?tab=repositories',
    category: 'Web App',
    featured: true,
    stars: 52,
    details: {
      year: '2023',
      client: 'Hotel Grand Maju',
      role: 'Frontend Developer',
      challenges: 'Kalender ketersediaan real-time, integrasi payment gateway, sistem rating'
    }
  },
  {
    title: 'Website Desa Indrajaya - Laravel',
    description: 'Website resmi desa dengan fitur pengumuman, galeri kegiatan, data kependudukan, layanan administrasi online, dan forum warga. Membangun komunikasi digital antara pemerintah desa dan masyarakat.',
    technologies: ['Laravel 11', 'MySQL', 'Bootstrap', 'File Management', 'CRUD Operations'],
    image: '🏘️',
    liveUrl: '#',
    githubUrl: 'https://github.com/Haryadipuji96?tab=repositories',
    category: 'Web App',
    featured: false,
    stars: 29,
    details: {
      year: '2023',
      client: 'Desa Indrajaya',
      role: 'Full-Stack Developer',
      challenges: 'Manajemen user role, sistem pengumuman multi-level, galeri media'
    }
  },
  {
    title: 'Sistem Informasi Arsip & Akademik - Laravel',
    description: 'Platform terintegrasi untuk pengelolaan arsip dokumen dan data akademik institusi pendidikan. Fitur pencarian cerdas, digitalisasi dokumen, dan reporting system.',
    technologies: ['Laravel 11', 'MySQL', 'PDF Generation', 'Search Algorithm', 'Bootstrap'],
    image: '📚',
    liveUrl: '#',
    githubUrl: 'https://github.com/Haryadipuji96?tab=repositories',
    category: 'Web App',
    featured: true,
    stars: 41,
    details: {
      year: '2023',
      client: 'Sekolah Menengah Kejuruan',
      role: 'Full-Stack Developer',
      challenges: 'Sistem pencarian dokumen, manajemen permission, backup otomatis'
    }
  },
  {
    title: 'Marketplace UMKM Sirnaraja - Next.js',
    description: 'Platform e-commerce khusus UMKM desa Sirnaraja dengan fitur multi-vendor, sistem pembayaran lokal, delivery tracking, dan dashboard penjualan. Memberdayakan ekonomi desa.',
    technologies: ['Next.js 14', 'TypeScript', 'MongoDB', 'Midtrans API', 'Tailwind CSS'],
    image: '🛒',
    liveUrl: '#',
    githubUrl: 'https://github.com/Haryadipuji96?tab=repositories',
    category: 'E-Commerce',
    featured: true,
    stars: 65,
    details: {
      year: '2024',
      client: 'UMKM Desa Sirnaraja',
      role: 'Full-Stack Developer',
      challenges: 'Multi-vendor system, integrasi kurir lokal, sistem komisi penjual'
    }
  },
  {
    title: 'Web Undangan Pernikahan Digital - Next.js',
    description: 'Website undangan pernikahan interaktif dengan RSVP online, gallery foto, countdown timer, live streaming integration, dan guest book digital. Tersedia dalam berbagai tema.',
    technologies: ['Next.js 13', 'React', 'Firebase', 'Cloudinary', 'Tailwind CSS'],
    image: '💍',
    liveUrl: '#',
    githubUrl: 'https://github.com/Haryadipuji96?tab=repositories',
    category: 'Web App',
    featured: false,
    stars: 33,
    details: {
      year: '2023',
      client: 'Personal Project',
      role: 'Frontend Developer',
      challenges: 'Optimasi mobile experience, RSVP real-time, galeri foto interaktif'
    }
  },
  {
    title: 'Aplikasi Pengelolaan Sparepart - Flutter',
    description: 'Mobile app untuk manajemen inventaris sparepart mobil & motor dengan sistem barcode scanning, notifikasi stok minimum, pembuatan PO otomatis, dan laporan penjualan.',
    technologies: ['Flutter', 'Dart', 'REST API', 'Barcode Scanner', 'SQLite', 'Firebase'],
    image: '🔧',
    liveUrl: '#',
    githubUrl: 'https://github.com/Haryadipuji96?tab=repositories',
    category: 'Mobile',
    featured: true,
    stars: 48,
    details: {
      year: '2024',
      client: 'Bengkel Maju Jaya',
      role: 'Mobile Developer',
      challenges: 'Integrasi scanner barcode, sync data offline-online, multi-role access'
    }
  },
  {
    title: 'Aplikasi Pemesanan Makanan - Flutter',
    description: 'Platform food delivery dengan fitur tracking order real-time, rating restoran, promo sistem, dan integrasi dengan Google Maps untuk delivery tracking.',
    technologies: ['Flutter', 'Google Maps API', 'Firebase', 'REST API', 'Push Notification'],
    image: '🍔',
    liveUrl: '#',
    githubUrl: 'https://github.com/Haryadipuji96?tab=repositories',
    category: 'Mobile',
    featured: false,
    stars: 36,
    details: {
      year: '2023',
      client: 'Food Delivery Startup',
      role: 'Mobile Developer',
      challenges: 'Real-time tracking, sistem rating, manajemen promo code'
    }
  },
  {
    title: 'Marketplace Multi-Kategori - Flutter',
    description: 'Aplikasi marketplace dengan kategori produk yang beragam, sistem chat penjual-pembeli, escrow payment, dan review system untuk transaksi yang aman.',
    technologies: ['Flutter', 'WebSocket', 'Payment Gateway', 'Firebase', 'Cloud Storage'],
    image: '🏪',
    liveUrl: '#',
    githubUrl: 'https://github.com/Haryadipuji96?tab=repositories',
    category: 'Mobile',
    featured: true,
    stars: 59,
    details: {
      year: '2024',
      client: 'Marketplace Startup',
      role: 'Mobile Developer',
      challenges: 'Sistem chat real-time, escrow payment, manajemen kategori dinamis'
    }
  },
  {
    title: 'Aplikasi Kantin Digital - Flutter',
    description: 'Sistem pemesanan makanan kantin dengan pre-order system, cashless payment, menu harian, dan dashboard untuk manajemen kantin.',
    technologies: ['Flutter', 'QR Code', 'Local Database', 'REST API', 'Bluetooth Printer'],
    image: '🏫',
    liveUrl: '#',
    githubUrl: 'https://github.com/Haryadipuji96?tab=repositories',
    category: 'Mobile',
    featured: false,
    stars: 27,
    details: {
      year: '2023',
      client: 'Perusahaan Teknologi',
      role: 'Mobile Developer',
      challenges: 'Integrasi QR payment, sistem pre-order, manajemen menu harian'
    }
  },
  {
    title: 'Aplikasi Service Kendaraan - Flutter',
    description: 'Platform untuk booking service kendaraan, tracking progress perbaikan, reminder maintenance, dan history service dengan estimasi biaya.',
    technologies: ['Flutter', 'Calendar API', 'Push Notification', 'REST API', 'Firebase'],
    image: '🚗',
    liveUrl: '#',
    githubUrl: 'https://github.com/Haryadipuji96?tab=repositories',
    category: 'Mobile',
    featured: true,
    stars: 42,
    details: {
      year: '2024',
      client: 'Auto Service Center',
      role: 'Mobile Developer',
      challenges: 'Sistem booking slot waktu, tracking progress, estimasi biaya otomatis'
    }
  }
];

// Kategori yang konsisten dengan data proyek
export const projectCategories = [
  'Semua',
  'Web App',
  'E-Commerce',
  'Mobile',
  'Laravel',
  'Next.js',
  'Flutter'
];

export const projectStats = {
  total: 12,
  laravel: 4,
  nextjs: 3,
  flutter: 5,
  featured: 7
};

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  useEffect(() => {
    // Initialize AOS (Animate On Scroll)
    if (typeof window !== 'undefined') {
      // Dynamically import AOS
      import('aos').then((AOS) => {
        AOS.default.init({
          duration: 600,
          easing: 'ease-in-out',
          once: false,
          mirror: true
        });
      });
    }
  }, []);

  const filteredProjects = activeCategory === 'Semua' 
    ? projects 
    : activeCategory === 'Laravel' 
      ? projects.filter(project => project.technologies.some(tech => tech.includes('Laravel')))
      : activeCategory === 'Next.js'
      ? projects.filter(project => project.technologies.some(tech => tech.includes('Next.js')))
      : activeCategory === 'Flutter'
      ? projects.filter(project => project.technologies.some(tech => tech.includes('Flutter')))
      : projects.filter(project => project.category === activeCategory)

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30 animate-pulse"
             data-aos="fade-right"
             data-aos-delay="100"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-tr from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"
             data-aos="fade-left"
             data-aos-delay="200"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mb-6 shadow-lg"
               data-aos="zoom-in"
               data-aos-delay="100">
            <Code2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4"
              data-aos="fade-up"
              data-aos-delay="200">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Proyek Saya
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-6 rounded-full"
               data-aos="fade-up"
               data-aos-delay="300"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl"
             data-aos="fade-up"
             data-aos-delay="400">
            Koleksi proyek yang telah saya kerjakan, mencakup berbagai teknologi dan solusi inovatif.
          </p>
        </div>

        {/* Category Filter - Mobile Responsive */}
        <div className="mb-10">
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide mb-6">
            {projectCategories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full transition-all duration-300 font-medium ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
                data-aos="fade-up"
                data-aos-delay={500 + (index * 50)}
              >
                {category}
                {category !== 'Semua' && (
                  <span className="ml-1.5 text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                    {category === 'Laravel' ? '4' : 
                     category === 'Next.js' ? '3' :
                     category === 'Flutter' ? '5' :
                     projects.filter(p => p.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600"
                 data-aos="fade-right"
                 data-aos-delay="900">
              Menampilkan <span className="font-semibold text-blue-600">{filteredProjects.length}</span> dari{' '}
              <span className="font-semibold">{projects.length}</span> proyek
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600"
                 data-aos="fade-left"
                 data-aos-delay="900">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"></div>
                <span>Featured</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-200"></div>
                <span>Regular</span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid - Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                project.featured ? 'border-l-4 border-blue-500' : 'border border-gray-200'
              } hover:-translate-y-2`}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              data-aos="fade-up"
              data-aos-delay={1000 + (index % 3 * 100)}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold rounded-full">
                    <Star className="w-3 h-3" />
                    <span>Featured</span>
                  </div>
                </div>
              )}

              {/* Project Image/Icon */}
              <div className="relative bg-gradient-to-br from-blue-400 to-cyan-300 h-48 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-7xl transition-transform duration-500 group-hover:scale-110">
                  {project.image}
                </div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6`}>
                  <div className="text-white">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{project.stars} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Rocket className="w-4 h-4" />
                        <span>{project.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium text-gray-700">{project.stars}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100"
                      data-aos="zoom-in"
                      data-aos-delay={1200 + (techIndex * 50)}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                          data-aos="zoom-in"
                          data-aos-delay="1350">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-2 text-blue-600 hover:text-cyan-500 transition-colors group/link"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-aos="fade-right"
                      data-aos-delay="1400"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium group-hover/link:underline">Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group/link"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-aos="fade-right"
                      data-aos-delay="1450"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium group-hover/link:underline">Code</span>
                    </a>
                  </div>
                  
                  <button className="text-gray-400 hover:text-blue-600 transition-colors"
                          data-aos="fade-left"
                          data-aos-delay="1500">
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16"
               data-aos="fade-up"
               data-aos-delay="1000">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <FolderOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada proyek di kategori ini</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Coba pilih kategori lain untuk melihat proyek-proyek saya.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto"
             data-aos="fade-up"
             data-aos-delay="1100">
            Tertarik dengan proyek saya? Saya selalu terbuka untuk kolaborasi atau diskusi tentang proyek baru.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              data-aos="zoom-in"
              data-aos-delay="1200"
            >
              <Rocket className="w-5 h-5" />
              Diskusikan Proyek
            </button>
            <a
              href="https://github.com/Haryadipuji96"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all hover:shadow-lg flex items-center gap-2"
              data-aos="zoom-in"
              data-aos-delay="1300"
            >
              <Github className="w-5 h-5" />
              Lihat GitHub
            </a>
          </div>
          
          {/* Statistics */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center"
                   data-aos="fade-up"
                   data-aos-delay="1400">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  {projects.length}
                </div>
                <div className="text-sm text-gray-600">Total Proyek</div>
              </div>
              <div className="text-center"
                   data-aos="fade-up"
                   data-aos-delay="1450">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  {projects.filter(p => p.featured).length}
                </div>
                <div className="text-sm text-gray-600">Featured</div>
              </div>
              <div className="text-center"
                   data-aos="fade-up"
                   data-aos-delay="1500">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  9
                </div>
                <div className="text-sm text-gray-600">Teknologi</div>
              </div>
              <div className="text-center"
                   data-aos="fade-up"
                   data-aos-delay="1550">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

// Type definitions
export type Project = typeof projects[0];
export type ProjectCategory = typeof projectCategories[number];