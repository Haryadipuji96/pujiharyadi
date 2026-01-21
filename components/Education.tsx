'use client'

import { GraduationCap, Award, Calendar, BookOpen, Trophy, Users, Target, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const education = [
  {
    degree: 'D3 Manajemen Informatika',
    school: 'Politeknik LP3I Kampus Tasikmalaya',
    location: 'Tasikmalaya, Jawa Barat',
    period: '2024 - Sekarang',
    status: 'Sedang Berjalan',
    description: 'Fokus pada pengembangan skill pemrograman dan manajemen teknologi informasi. Belajar berbagai teknologi modern untuk persiapan karir di bidang IT.',
    achievements: [
      'Anggota aktif BPH LP3I Computer Club (LCC) sebagai Biro IT 2',
      'Mengikuti berbagai seminar dan workshop teknologi',
      'Mengembangkan project nyata seperti SIPANDA dan Web Desa',
      'Aktif dalam kegiatan kemahasiswaan dan organisasi',
    ],
    courses: ['Pemrograman Web', 'Basis Data', 'Algoritma', 'UI/UX Design', 'Manajemen Proyek IT'],
    logo: '🎓',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    degree: 'SMA - Jurusan IPS',
    school: 'SMA Negeri 1 Cisayong',
    location: 'Tasikmalaya, Jawa Barat',
    period: '2021 - 2023',
    status: 'Lulus',
    description: 'Lulus dengan prestasi akademik yang baik, menempati peringkat 5 besar dari 33 siswa.',
    achievements: [
      'Peringkat 5 besar dari 33 siswa',
      'Mengembangkan minat dalam teknologi sejak SMA',
      'Aktif dalam kegiatan sekolah',
      'Mempersiapkan diri untuk studi di bidang IT',
    ],
    courses: ['Matematika', 'Ekonomi', 'Sosiologi', 'Bahasa Inggris', 'TIK'],
    logo: '⚡',
    color: 'from-purple-500 to-pink-400',
  },
]

const certifications = [
  {
    name: 'Ujikom Operator Komputer Muda',
    issuer: 'Lembaga Sertifikasi Komputer',
    year: '2023',
    credential: 'Operator Komputer Level Pemula',
    description: 'Kompetensi dasar dalam operasional komputer dan software office',
  },
  {
    name: 'Training Soft Skill 1, 2, 3',
    issuer: 'Politeknik LP3I',
    year: '2024',
    credential: 'Pengembangan Karakter Mahasiswa',
    description: 'Pelatihan pengembangan soft skill dan karakter profesional',
  },
  {
    name: 'Seminar TOEIC Preparation',
    issuer: 'Politeknik LP3I',
    year: '2024',
    credential: 'Persiapan Tes Bahasa Inggris',
    description: 'Strategi dan persiapan untuk tes TOEIC',
  },
  {
    name: 'Seminar Mindset Problem Solver',
    issuer: 'Politeknik LP3I',
    year: '2024',
    description: 'Pengembangan pola pikir sebagai problem solver',
  },
  {
    name: 'Seminar Mobile Programming',
    issuer: 'LP3I Computer Club',
    year: '2024',
    description: 'Pengenalan mobile programming di era digitalisasi',
  },
  {
    name: 'Seminar Keterampilan Utama Mahasiswa',
    issuer: 'Politeknik LP3I',
    year: '2024',
    description: 'Pengembangan keterampilan esensial untuk mahasiswa',
  },
]

const futurePlans = [
  {
    title: 'Lanjut ke S1',
    description: 'Merencanakan melanjutkan studi ke jenjang S1 di Bandung',
    timeline: '2027',
    icon: '🎯',
  },
  {
    title: 'Senior Programmer',
    description: 'Menjadi programmer senior yang ahli dan kompeten',
    timeline: 'Target 5 Tahun',
    icon: '💻',
  },
  {
    title: 'Spesialis Pemrograman',
    description: 'Fokus pada spesialisasi bidang pemrograman',
    timeline: 'Jangka Panjang',
    icon: '🚀',
  },
]

export function Education() {
  const [activeTab, setActiveTab] = useState<'education' | 'certifications' | 'future'>('education')
  const [expandedCert, setExpandedCert] = useState<number | null>(null)

  return (
    <section id="education" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mb-6 shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Pendidikan & Pengembangan
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl">
            Perjalanan pendidikan dan pengembangan diri saya dalam dunia teknologi informasi.
          </p>
        </div>

        {/* Tabs - Mobile Responsive */}
        <div className="mb-10">
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
            <button
              onClick={() => setActiveTab('education')}
              className={`flex-shrink-0 px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Pendidikan
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`flex-shrink-0 px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'certifications'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Award className="w-5 h-5" />
              Sertifikasi
            </button>
            <button
              onClick={() => setActiveTab('future')}
              className={`flex-shrink-0 px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'future'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Target className="w-5 h-5" />
              Rencana Masa Depan
            </button>
          </div>
        </div>

        {/* Education Content */}
        {activeTab === 'education' && (
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:-translate-y-1"
              >
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                  {/* Left - Logo and Basic Info */}
                  <div className="lg:w-1/3">
                    <div className={`bg-gradient-to-br ${edu.color} rounded-2xl p-6 text-center h-full`}>
                      <div className="text-5xl mb-4">{edu.logo}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{edu.school}</h3>
                      <div className="text-blue-100 mb-4">{edu.location}</div>
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                        <Calendar className="w-4 h-4 text-yellow-300" />
                        <span className="text-white font-semibold">{edu.period}</span>
                      </div>
                      <div className="mt-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          edu.status === 'Sedang Berjalan' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {edu.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right - Details */}
                  <div className="lg:w-2/3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{edu.degree}</h3>
                        <div className="flex items-center gap-3 text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{edu.period}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm">{edu.status}</span>
                          </div>
                        </div>
                      </div>
                      {edu.degree.includes('D3') && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full text-blue-700 font-medium mb-4 sm:mb-0">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">Biro IT 2 LCC</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 mb-6">{edu.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Achievements */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-blue-500" />
                          Prestasi & Aktivitas
                        </h4>
                        <ul className="space-y-3">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600 text-sm md:text-base">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Courses */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-cyan-500" />
                          Mata Kuliah/Pelajaran
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-lg text-sm"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Educational Journey */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Perjalanan Pendidikan</h4>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">2024</div>
                  <div className="text-gray-700">Mulai D3 MI</div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">2023</div>
                  <div className="text-gray-700">Lulus SMA</div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">2021</div>
                  <div className="text-gray-700">Masuk SMA</div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">2012</div>
                  <div className="text-gray-700">Mulai SD</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Certifications Content */}
        {activeTab === 'certifications' && (
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Sertifikasi & Seminar</h3>
              <p className="text-gray-600">Koleksi sertifikasi dan seminar yang telah saya ikuti selama studi di LP3I.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className={`bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                    expandedCert === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setExpandedCert(expandedCert === index ? null : index)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {cert.name}
                  </h3>
                  <p className="text-blue-600 font-medium text-sm mb-3">{cert.issuer}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{cert.description}</p>
                  
                  {cert.credential && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-gray-500 text-xs font-medium">{cert.credential}</p>
                    </div>
                  )}

                  {expandedCert === index && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-slideIn">
                      <p className="text-sm text-gray-600">
                        Sertifikat ini merupakan bagian dari pengembangan diri saya selama studi di LP3I.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Certification Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">{certifications.length}</div>
                <p className="text-gray-700 text-sm">Total Sertifikasi</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">6+</div>
                <p className="text-gray-700 text-sm">Seminar Diikuti</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">100%</div>
                <p className="text-gray-700 text-sm">Keaktifan</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">4</div>
                <p className="text-gray-700 text-sm">Soft Skill Training</p>
              </div>
            </div>
          </div>
        )}

        {/* Future Plans Content */}
        {activeTab === 'future' && (
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Rencana & Target Masa Depan</h3>
              <p className="text-gray-600">Visi dan misi saya dalam pengembangan karir di bidang teknologi.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {futurePlans.map((plan, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4">{plan.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{plan.title}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Timeline:</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-full text-sm font-medium">
                      {plan.timeline}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Roadmap */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 md:p-8 text-white">
              <h4 className="text-xl font-bold mb-6">Roadmap Pengembangan Karir</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div>
                    <div className="font-bold">2024 - Sekarang</div>
                    <div className="text-blue-100">Fokus menyelesaikan D3 Manajemen Informatika</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div>
                    <div className="font-bold">2026 - 2027</div>
                    <div className="text-blue-100">Lulus D3 & mulai bekerja sebagai Junior Developer</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div>
                    <div className="font-bold">2027 - 2030</div>
                    <div className="text-blue-100">Melanjutkan S1 & berkembang menjadi Mid-Level Developer</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div>
                    <div className="font-bold">2030+</div>
                    <div className="text-blue-100">Menjadi Senior Programmer yang ahli dan kompeten</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Saya percaya bahwa pendidikan adalah proses berkelanjutan. Saya selalu terbuka untuk 
            belajar hal baru dan mengembangkan diri di bidang teknologi.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <GraduationCap className="w-5 h-5" />
            Diskusikan Peluang Belajar Bersama
          </button>
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
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  )
}