'use client'

import { Briefcase, Calendar, MapPin, Award, TrendingUp, Code2, Users, Rocket, BookOpen } from 'lucide-react'
import { useState, useEffect } from 'react'

const experiences = [
  {
    title: 'Full Stack Developer & UI/UX Designer',
    company: 'Institut Agama Islam Tasikmalaya (IAIT)',
    location: 'Tasikmalaya, Jawa Barat',
    period: 'Sep - Des 2023',
    description: 'Magang sebagai bagian dari tim IT dan Administrasi, bertanggung jawab mengembangkan sistem informasi internal.',
    achievements: [
      'Mengembangkan Sistem Informasi Arsip dan Data Akademik (SIPANDA)',
      'Bertanggung jawab penuh sebagai Full Stack Developer dan UI/UX Designer',
      'Meningkatkan efisiensi proses administrasi kampus',
      'Membuat sistem yang user-friendly untuk staf dan dosen',
    ],
    technologies: ['Laravel', 'React', 'MySQL', 'Bootstrap', 'JavaScript'],
    type: 'Magang',
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    title: 'Freelance Web Developer',
    company: 'Project Pribadi & Klien',
    location: 'Remote',
    period: '2022 - Present',
    description: 'Mengembangkan berbagai aplikasi web untuk kebutuhan pribadi dan klien freelance.',
    achievements: [
      'Menyelesaikan 10+ project web aplikasi pribadi',
      'Mengembangkan aplikasi dengan teknologi modern',
      'Merancang UI/UX yang menarik dan responsif',
      'Mempersiapkan project untuk dikembangkan lebih lanjut',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    type: 'Freelance',
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    title: 'Project Developer',
    company: 'SIPANDA & Aplikasi Lainnya',
    location: 'Personal Workspace',
    period: '2021 - Present',
    description: 'Mengembangkan dan memelihara berbagai aplikasi web untuk meningkatkan skill dan portfolio.',
    achievements: [
      'Membuat aplikasi SIPANDA (Sistem Informasi Arsip dan Data Akademik)',
      'Berhasil meluncurkan beberapa aplikasi web fungsional',
      'Fokus pada pengembangan aplikasi yang scalable',
      'Mempersiapkan aplikasi untuk dijual/dikomersilkan',
    ],
    technologies: ['Laravel 11', 'React.js', 'MySQL', 'REST API', 'Git'],
    type: 'Personal Project',
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    title: 'Skill Development & Learning',
    company: 'Self-Improvement Journey',
    location: 'Online & Offline',
    period: '2020 - Present',
    description: 'Terus mengembangkan skill melalui pembelajaran mandiri dan praktik langsung.',
    achievements: [
      'Menguasai full stack development secara otodidak',
      'Memperoleh sertifikasi kelulusan magang dari IAIT',
      'Selalu update dengan teknologi terbaru',
      'Membangun portfolio dengan project nyata',
    ],
    technologies: ['Continuous Learning', 'Problem Solving', 'Project Management', 'Self-Motivation'],
    type: 'Pengembangan Diri',
    icon: <BookOpen className="w-6 h-6" />,
  },
]

const skillsDevelopment = [
  {
    category: 'Frontend Development',
    skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript ES6+'],
    level: 85,
  },
  {
    category: 'Backend Development',
    skills: ['Laravel 11', 'Node.js', 'Express.js', 'REST API', 'Authentication'],
    level: 88,
  },
  {
    category: 'Database',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Database Design', 'Optimization'],
    level: 82,
  },
  {
    category: 'Tools & Soft Skills',
    skills: ['Git', 'Figma', 'Problem Solving', 'UI/UX Design', 'Project Planning'],
    level: 90,
  },
]

export function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'timeline' | 'skills'>('timeline')

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

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30"
             data-aos="fade-left"
             data-aos-delay="100"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-tr from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-30"
             data-aos="fade-right"
             data-aos-delay="200"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mb-6 shadow-lg"
               data-aos="zoom-in"
               data-aos-delay="100">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4"
              data-aos="fade-up"
              data-aos-delay="200">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Pengalaman & Perjalanan
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-6 rounded-full"
               data-aos="fade-up"
               data-aos-delay="300"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl"
             data-aos="fade-up"
             data-aos-delay="400">
            Perjalanan saya dalam dunia pengembangan web, mulai dari magang hingga project pribadi yang terus berkembang.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-full p-1 border border-gray-200">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-6 py-2.5 rounded-full transition-all duration-300 font-medium flex items-center gap-2 ${
                viewMode === 'timeline'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <Calendar className="w-4 h-4" />
              Timeline
            </button>
            <button
              onClick={() => setViewMode('skills')}
              className={`px-6 py-2.5 rounded-full transition-all duration-300 font-medium flex items-center gap-2 ${
                viewMode === 'skills'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <TrendingUp className="w-4 h-4" />
              Skill Development
            </button>
          </div>
        </div>

        {viewMode === 'timeline' ? (
          <>
            {/* Timeline - Responsive */}
            <div className="relative">
              {/* Vertical Line - Hidden on mobile, shown on md+ */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-300"
                   data-aos="fade-in"
                   data-aos-delay="700"></div>

              {/* Experience Items */}
              <div className="space-y-8 md:space-y-12">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className={`relative flex ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full border-4 border-white shadow-lg z-10"
                         data-aos="zoom-in"
                         data-aos-delay={800 + (index * 200)}></div>

                    {/* Content Card */}
                    <div
                      className={`w-full md:w-1/2 ml-12 md:ml-0 ${
                        index % 2 === 0 ? 'md:pr-8 lg:pr-12' : 'md:pl-8 lg:pl-12'
                      }`}
                    >
                      <div
                        className={`bg-white/90 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group cursor-pointer hover:-translate-y-1 ${
                          activeIndex === index ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setActiveIndex(index)}
                        data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                        data-aos-delay={900 + (index * 200)}
                      >
                        {/* Badge */}
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 text-sm font-medium mb-4"
                             data-aos="fade-up"
                             data-aos-delay="100">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {exp.type}
                        </div>

                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0"
                               data-aos="zoom-in"
                               data-aos-delay="200">
                            <div className="text-white">
                              {exp.icon}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1"
                                data-aos="fade-up"
                                data-aos-delay="300">{exp.title}</h3>
                            <p className="text-blue-600 font-semibold"
                               data-aos="fade-up"
                               data-aos-delay="400">{exp.company}</p>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-wrap gap-3 mb-4"
                             data-aos="fade-up"
                             data-aos-delay="500">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{exp.location}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm md:text-base mb-4"
                           data-aos="fade-up"
                           data-aos-delay="600">{exp.description}</p>

                        {/* Achievements */}
                        <div className="mb-4">
                          <h4 className="text-gray-700 font-semibold mb-2 flex items-center gap-2 text-sm md:text-base"
                              data-aos="fade-up"
                              data-aos-delay="700">
                            <Award className="w-4 h-4" />
                            Pencapaian Utama
                          </h4>
                          <ul className="space-y-2">
                            {exp.achievements.slice(0, 3).map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2"
                                  data-aos="fade-up"
                                  data-aos-delay={800 + (i * 50)}>
                                <TrendingUp className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2"
                             data-aos="fade-up"
                             data-aos-delay="1000">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-lg text-xs font-medium border border-blue-100"
                              data-aos="zoom-in"
                              data-aos-delay={1100 + (i * 50)}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Empty space for alternating layout on desktop */}
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                   data-aos="fade-up"
                   data-aos-delay="1200">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  2+
                </div>
                <p className="text-gray-600 text-sm md:text-base mt-2">Tahun Pengembangan</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                   data-aos="fade-up"
                   data-aos-delay="1300">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  10+
                </div>
                <p className="text-gray-600 text-sm md:text-base mt-2">Project Dikerjakan</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                   data-aos="fade-up"
                   data-aos-delay="1400">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  100%
                </div>
                <p className="text-gray-600 text-sm md:text-base mt-2">Dedikasi</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                   data-aos="fade-up"
                   data-aos-delay="1500">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  ∞
                </div>
                <p className="text-gray-600 text-sm md:text-base mt-2">Potensi Berkembang</p>
              </div>
            </div>
          </>
        ) : (
          /* Skills Development View */
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200"
               data-aos="fade-up"
               data-aos-delay="700">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center"
                   data-aos="zoom-in"
                   data-aos-delay="800">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800"
                    data-aos="fade-up"
                    data-aos-delay="900">Perkembangan Skill Saya</h3>
                <p className="text-gray-600"
                   data-aos="fade-up"
                   data-aos-delay="1000">Kemajuan dan penguasaan teknologi yang terus berkembang</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {skillsDevelopment.map((category, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
                  data-aos="fade-up"
                  data-aos-delay={1100 + (index * 100)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800 text-lg">{category.category}</h4>
                    <div className="text-blue-600 font-bold">{category.level}%</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000"
                        style={{ width: `${category.level}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Basic</span>
                      <span>Expert</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium border border-blue-100"
                        data-aos="zoom-in"
                        data-aos-delay={1200 + (skillIndex * 50)}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Learning Journey */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h4 className="text-xl font-bold text-gray-800 mb-6"
                  data-aos="fade-up"
                  data-aos-delay="1500">Perjalanan Belajar</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5"
                     data-aos="fade-right"
                     data-aos-delay="1600">
                  <div className="text-blue-600 font-bold text-lg mb-2">Magang di IAIT</div>
                  <p className="text-gray-600 text-sm">
                    Pengalaman nyata mengembangkan sistem informasi untuk institusi pendidikan.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-5"
                     data-aos="fade-up"
                     data-aos-delay="1700">
                  <div className="text-blue-600 font-bold text-lg mb-2">Project Pribadi</div>
                  <p className="text-gray-600 text-sm">
                    Membangun 10+ aplikasi web untuk mengasah skill dan membangun portfolio.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5"
                     data-aos="fade-left"
                     data-aos-delay="1800">
                  <div className="text-blue-600 font-bold text-lg mb-2">Skill Development</div>
                  <p className="text-gray-600 text-sm">
                    Terus belajar teknologi baru dan menerapkannya dalam project nyata.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto"
             data-aos="fade-up"
             data-aos-delay="1900">
            Meskipun pengalaman profesional saya masih berkembang, passion dan dedikasi saya dalam 
            pengembangan web sangat kuat. Saya siap untuk berkontribusi dan belajar lebih banyak.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
            data-aos="zoom-in"
            data-aos-delay="2000"
          >
            <Users className="w-5 h-5" />
            Diskusikan Peluang Kolaborasi
          </button>
        </div>
      </div>
    </section>
  )
}