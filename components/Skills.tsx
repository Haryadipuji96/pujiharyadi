'use client'

import { Code, Database, Palette, Server, Terminal, Cloud, Cpu, Smartphone, Wrench, Users, BookOpen, BarChart } from 'lucide-react'
import { useState } from 'react'

const skillCategories = [
  {
    category: 'Frontend Development',
    icon: <Palette className="w-5 h-5" />,
    skills: [
      { name: 'React.js / Next.js', level: 95, color: 'from-blue-500 to-cyan-400' },
      { name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-400' },
      { name: 'Tailwind CSS', level: 98, color: 'from-teal-500 to-emerald-400' },
      { name: 'JavaScript (ES6+)', level: 92, color: 'from-yellow-500 to-orange-400' },
      { name: 'HTML5 / CSS3', level: 96, color: 'from-orange-500 to-red-400' },
    ],
  },
  {
    category: 'Backend Development',
    icon: <Server className="w-5 h-5" />,
    skills: [
      { name: 'Laravel 11', level: 95, color: 'from-red-500 to-pink-400' },
      { name: 'Node.js / Express', level: 88, color: 'from-green-500 to-emerald-400' },
      { name: 'Python / Django', level: 85, color: 'from-blue-700 to-blue-500' },
      { name: 'RESTful APIs', level: 90, color: 'from-purple-500 to-pink-400' },
      { name: 'GraphQL', level: 80, color: 'from-pink-600 to-rose-400' },
    ],
  },
  {
    category: 'Database & Tools',
    icon: <Database className="w-5 h-5" />,
    skills: [
      { name: 'MongoDB', level: 85, color: 'from-green-600 to-green-400' },
      { name: 'PostgreSQL', level: 82, color: 'from-blue-800 to-blue-600' },
      { name: 'phpMyAdmin', level: 90, color: 'from-orange-600 to-amber-500' },
      { name: 'Git / GitHub', level: 94, color: 'from-gray-700 to-gray-500' },
      { name: 'Docker', level: 78, color: 'from-blue-400 to-cyan-300' },
    ],
  },
  {
    category: 'Mobile & Desktop',
    icon: <Smartphone className="w-5 h-5" />,
    skills: [
      { name: 'Android Studio', level: 85, color: 'from-green-700 to-emerald-500' },
      { name: 'Kotlin / Java', level: 80, color: 'from-orange-700 to-orange-500' },
      { name: 'Flutter', level: 75, color: 'from-blue-400 to-cyan-300' },
      { name: 'Electron.js', level: 70, color: 'from-indigo-600 to-purple-500' },
      { name: 'Desktop Apps', level: 78, color: 'from-gray-600 to-gray-400' },
    ],
  },
  {
    category: 'Soft Skills',
    icon: <Users className="w-5 h-5" />,
    skills: [
      { name: 'Problem Solving', level: 95, color: 'from-purple-600 to-purple-400' },
      { name: 'Team Collaboration', level: 90, color: 'from-indigo-500 to-blue-400' },
      { name: 'Microsoft Office', level: 92, color: 'from-red-600 to-orange-500' },
      { name: 'Communication', level: 92, color: 'from-cyan-500 to-blue-400' },
      { name: 'Project Management', level: 85, color: 'from-emerald-600 to-green-400' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: <Cloud className="w-5 h-5" />,
    skills: [
      { name: 'AWS / Vercel', level: 80, color: 'from-orange-600 to-yellow-500' },
      { name: 'CI/CD Pipeline', level: 75, color: 'from-blue-500 to-cyan-400' },
      { name: 'Linux Server', level: 82, color: 'from-yellow-600 to-yellow-400' },
      { name: 'Nginx / Apache', level: 78, color: 'from-green-700 to-green-500' },
      { name: 'Monitoring Tools', level: 72, color: 'from-red-500 to-pink-400' },
    ],
  },
]

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mb-6 shadow-lg">
            <Code className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Keahlian Teknis
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl">
            Spesialis dalam teknologi web modern dengan pengalaman luas di berbagai stack.
            Terus belajar dan mengembangkan skill untuk memberikan hasil terbaik.
          </p>
        </div>

        {/* Category Tabs - Responsive */}
        <div className="mb-12">
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
            {skillCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                  activeCategory === index
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-105'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeCategory === index ? 'bg-white/20' : 'bg-blue-50'}`}>
                  {category.icon}
                </div>
                <span className="font-medium whitespace-nowrap">{category.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid for Active Category */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              {skillCategories[activeCategory].icon}
              {skillCategories[activeCategory].category}
            </h3>
            <div className="text-sm text-gray-500">
              {skillCategories[activeCategory].skills.length} Skill
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <div
                key={index}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Skill Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{skill.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full mx-0.5 ${
                              i < Math.floor(skill.level / 20)
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-500'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {skill.level >= 90 ? 'Ahli' : 
                         skill.level >= 70 ? 'Mahir' : 
                         skill.level >= 50 ? 'Menengah' : 'Pemula'}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    {skill.level}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out ${
                        hoveredSkill === index ? 'animate-pulse' : ''
                      }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Pemula</span>
                    <span>Ahli</span>
                  </div>
                </div>

                {/* Experience Indicator */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <BookOpen className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-gray-600">
                      {skill.level >= 90 ? '> 3 tahun' : 
                       skill.level >= 70 ? '1-3 tahun' : 
                       skill.level >= 50 ? '6-12 bulan' : '< 6 bulan'}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    skill.level >= 90 ? 'bg-green-100 text-green-800' :
                    skill.level >= 70 ? 'bg-blue-100 text-blue-800' :
                    skill.level >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {skill.level >= 90 ? 'Sangat Kompeten' : 
                     skill.level >= 70 ? 'Kompeten' : 
                     skill.level >= 50 ? 'Menengah' : 'Pemula'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Skills Overview - Responsive Grid */}
        {/* <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Ringkasan Semua Keahlian</h3>
              <p className="text-gray-600 mt-2">Total {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} skill di {skillCategories.length} kategori</p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full">
              <Cpu className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-700">Tech Stack</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {skillCategories.map((category, catIndex) => (
              <div 
                key={catIndex} 
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-md">
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm md:text-base">{category.category}</h4>
                </div>
                
                <div className="space-y-3">
                  {category.skills.slice(0, 4).map((skill, skillIndex) => (
                    <div key={skillIndex} className="group">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs font-medium text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-500 group-hover:w-full`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {category.skills.length > 4 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setActiveCategory(catIndex)}
                      className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      +{category.skills.length - 4} skill lainnya
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          {/* <div className="mt-10 pt-8 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Keterangan Tingkat Kemahiran</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"></div>
                <div>
                  <div className="font-medium text-gray-800">90-100%: Ahli</div>
                  <div className="text-sm text-gray-600"> 3 tahun pengalaman</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                <div>
                  <div className="font-medium text-gray-800">70-89%: Mahir</div>
                  <div className="text-sm text-gray-600">1-3 tahun pengalaman</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-300"></div>
                <div>
                  <div className="font-medium text-gray-800">50-69%: Menengah</div>
                  <div className="text-sm text-gray-600">6-12 bulan pengalaman</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-300 to-gray-200"></div>
                <div>
                  <div className="font-medium text-gray-800">0-49%: Pemula</div>
                  <div className="text-sm text-gray-600">6 bulan pengalaman</div>
                </div>
              </div>
            </div>
          </div> */}
        {/* </div> */} 

        {/* Call to Action */}
        {/* <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Ingin tahu lebih detail tentang keahlian saya?</p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Diskusikan Proyek Anda
          </button>
        </div> */}
      </div>

      {/* Custom Scrollbar for tabs */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}