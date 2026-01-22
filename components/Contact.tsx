'use client'

import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Facebook, MessageCircle, ExternalLink, CheckCircle } from 'lucide-react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Initialize AOS (Animate On Scroll)
    if (typeof window !== 'undefined') {
      // Dynamically import AOS
      import('aos').then((AOS) => {
        AOS.default.init({
          duration: 600,
          easing: 'ease-in-out',
          once: false,
          mirror: false
        });
      });
    }
  }, []);

  // ========== EDIT DATA ANDA DI SINI ==========
  const YOUR_EMAIL = "fujiharyadi0@gmail.com" // Ganti dengan email Anda
  const YOUR_PHONE = "+62 85794586552" // Ganti dengan nomor Anda
  const YOUR_LOCATION = "Tasikmalaya, Jawa Barat"
  const YOUR_NAME = "Pujiharyadi"
  // ========== END EDIT DATA ==========

  // Function untuk mengirim email langsung ke Gmail/Email pribadi
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { name, email, subject, message } = formData
    
    // Format pesan email
    const body = `Halo ${YOUR_NAME},\n\nBerikut adalah pesan dari website portfolio:\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}\n\n---\nPesan ini dikirim melalui website portfolio ${YOUR_NAME}.`
    
    // Membuka mail client dengan data yang sudah diisi
    const mailtoLink = `mailto:${YOUR_EMAIL}?subject=${encodeURIComponent(subject || `Pesan dari ${name}`)}&body=${encodeURIComponent(body)}`
    
    // Simulasi pengiriman (bisa diganti dengan fetch API jika ingin backend)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Buka mail client setelah 500ms
      setTimeout(() => {
        window.location.href = mailtoLink
      }, 500)
      
      // Reset status setelah 5 detik
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: YOUR_EMAIL,
      link: `mailto:${YOUR_EMAIL}`,
      description: 'Respon dalam 24 jam',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'WhatsApp',
      value: YOUR_PHONE,
      link: `https://wa.me/${YOUR_PHONE.replace(/\D/g, '')}?text=Halo%20${encodeURIComponent(YOUR_NAME)}%2C%20saya%20tahu%20Anda%20dari%20website%20portfolio.`,
      description: 'Chat langsung',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Lokasi',
      value: YOUR_LOCATION,
      link: 'https://maps.google.com/?q=Tasikmalaya+Jawa+Barat',
      description: 'Tersedia untuk remote',
      color: 'from-blue-500 to-cyan-500'
    },
  ]

  const socialLinks = [
    { 
      icon: <Github className="w-5 h-5" />, 
      url: 'https://github.com/Haryadipuji96', 
      name: 'GitHub',
      color: 'hover:bg-gray-900 hover:text-white',
      bgColor: 'bg-gray-100 text-gray-700'
    },
    { 
      icon: <Instagram className="w-5 h-5" />, 
      url: 'https://www.instagram.com/puji_haryadi86/', 
      name: 'Instagram',
      color: 'hover:bg-pink-600 hover:text-white',
      bgColor: 'bg-pink-100 text-pink-600'
    },
    { 
      icon: <Facebook className="w-5 h-5" />, 
      url: 'https://www.facebook.com/Laila.codar.133444?mibextid=ZbWKwL', 
      name: 'Facebook',
      color: 'hover:bg-blue-600 hover:text-white',
      bgColor: 'bg-blue-50 text-blue-600'
    },
  ]

  const quickQuestions = [
    { question: "Proyek website?", answer: "Mulai dari Rp 2.000.000" },
    { question: "Waktu pengerjaan?", answer: "1-4 minggu" },
    { question: "Garansi?", answer: "3 bulan support" },
  ]

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30"
             data-aos="fade-right"
             data-aos-delay="100"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-30"
             data-aos="fade-left"
             data-aos-delay="200"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mb-6 shadow-lg"
               data-aos="zoom-in"
               data-aos-delay="100">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4"
              data-aos="fade-up"
              data-aos-delay="200">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Hubungi Saya
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-6 rounded-full"
               data-aos="fade-up"
               data-aos-delay="300"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl"
             data-aos="fade-up"
             data-aos-delay="400">
            Mari bekerja sama! Saya terbuka untuk diskusi proyek, kolaborasi, atau sekadar berbagi ide.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Information */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4"
                  data-aos="fade-right"
                  data-aos-delay="500">
                Mari Berkolaborasi
              </h3>
              <p className="text-gray-600"
                 data-aos="fade-right"
                 data-aos-delay="600">
                Saya selalu bersemangat untuk membahas ide-ide baru. Baik itu proyek website, konsultasi teknis, 
                atau sekadar berbagi pengetahuan tentang teknologi.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.title !== 'Lokasi' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="block group"
                  data-aos="fade-right"
                  data-aos-delay={700 + (index * 100)}
                >
                  <div className="flex items-center gap-4 p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${info.color} text-white flex-shrink-0 transition-transform group-hover:scale-110`}>
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-800">{info.title}</p>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <p className="text-gray-600 mt-1">{info.value}</p>
                      <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8"
                 data-aos="fade-up"
                 data-aos-delay="1000">
              <h4 className="text-lg font-bold text-gray-800 mb-4"
                  data-aos="fade-up"
                  data-aos-delay="1100">
                Pertanyaan Cepat
              </h4>
              <div className="space-y-3">
                {quickQuestions.map((item, index) => (
                  <div key={index} 
                       className="flex items-center justify-between py-2 border-b border-blue-100 last:border-0"
                       data-aos="fade-right"
                       data-aos-delay={1200 + (index * 100)}>
                    <span className="text-gray-700">{item.question}</span>
                    <span className="font-semibold text-blue-600">{item.answer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div data-aos="fade-up" data-aos-delay="1500">
              <h4 className="text-lg font-bold text-gray-800 mb-4"
                  data-aos="fade-up"
                  data-aos-delay="1600">
                Temui Saya di Media Sosial
              </h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/Haryadipuji96"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 shadow-md hover:bg-gray-900 hover:text-white hover:shadow-xl transition-all duration-300"
                  title="GitHub"
                  aria-label="GitHub"
                  data-aos="zoom-in"
                  data-aos-delay="1700"
                >
                  <Github className="w-5 h-5" />
                </a>
                
                <a
                  href="https://www.instagram.com/puji_haryadi86/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-pink-100 text-pink-600 shadow-md hover:bg-pink-600 hover:text-white hover:shadow-xl transition-all duration-300"
                  title="Instagram"
                  aria-label="Instagram"
                  data-aos="zoom-in"
                  data-aos-delay="1800"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                
                <a
                  href="https://www.facebook.com/Laila.codar.133444?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-md hover:bg-blue-600 hover:text-white hover:shadow-xl transition-all duration-300"
                  title="Facebook"
                  aria-label="Facebook"
                  data-aos="zoom-in"
                  data-aos-delay="1900"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
              <p className="mt-3 text-sm text-gray-600"
                 data-aos="fade-up"
                 data-aos-delay="2000">
                Klik untuk melihat profil media sosial saya
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-200"
                 data-aos="fade-left"
                 data-aos-delay="500">
              <div className="flex items-center gap-3 mb-6"
                   data-aos="fade-up"
                   data-aos-delay="600">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Kirim Pesan Langsung</h3>
                  <p className="text-gray-600 text-sm">Pesan Anda akan langsung masuk ke email saya</p>
                </div>
              </div>

              <form onSubmit={sendEmail} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div data-aos="fade-up" data-aos-delay="700">
                    <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                      placeholder="Nama Anda"
                    />
                  </div>

                  <div data-aos="fade-up" data-aos-delay="800">
                    <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                      placeholder="email@anda.com"
                    />
                  </div>
                </div>

                <div data-aos="fade-up" data-aos-delay="900">
                  <label htmlFor="subject" className="block text-gray-700 mb-2 font-medium">
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    placeholder="Contoh: Website E-commerce"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Jelaskan secara singkat apa yang Anda butuhkan
                  </p>
                </div>

                <div data-aos="fade-up" data-aos-delay="1000">
                  <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">
                    Pesan Detail
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white resize-none"
                    placeholder="Jelaskan proyek atau kebutuhan Anda secara detail..."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Semakin detail penjelasannya, semakin baik saya bisa membantu
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                  data-aos="fade-up"
                  data-aos-delay="1100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Membuka Email...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Berhasil! Membuka Email...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Kirim Pesan via Email
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center animate-fadeIn"
                       data-aos="fade-up"
                       data-aos-delay="1200">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      <p>Pesan berhasil dibuat! Membuka aplikasi email Anda...</p>
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-gray-200"
                     data-aos="fade-up"
                     data-aos-delay="1300">
                  <p className="text-sm text-gray-600 text-center">
                    Dengan mengirim pesan, Anda setuju dengan{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline">kebijakan privasi</a> saya.
                    <br />
                    <span className="text-gray-500">Respon biasanya dalam 1x24 jam.</span>
                  </p>
                </div>
              </form>
            </div>

            {/* Response Time Info */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5"
                 data-aos="fade-up"
                 data-aos-delay="1400">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800"
                      data-aos="fade-right"
                      data-aos-delay="1500">
                    Jaminan Respon Cepat
                  </h4>
                  <p className="text-gray-600 text-sm"
                     data-aos="fade-right"
                     data-aos-delay="1600">
                    Saya akan membalas pesan Anda maksimal dalam 24 jam pada hari kerja.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* Footer */}
<div className="mt-16 pt-8 border-t border-gray-200"
     data-aos="fade-up"
     data-aos-delay="500">  {/* Dikurangi dari 1700 */}
  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    <div className="text-center md:text-left"
         data-aos="fade-right"
         data-aos-delay="600">  {/* Dikurangi dari 1800 */}
      <p className="text-gray-700">
        © {new Date().getFullYear()} {YOUR_NAME}. All rights reserved.
      </p>
      <p className="text-gray-500 text-sm mt-1">
        Dibuat dengan ❤️ menggunakan Next.js & Tailwind CSS
      </p>
    </div>
    <div className="flex gap-6"
         data-aos="fade-down"
         data-aos-delay="700">  {/* Dikurangi dari 1900 */}
      <a 
        href="/privacy" 
        className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
      >
        Kebijakan Privasi
      </a>
      <a href="#home" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
        Kembali ke Atas
      </a>
    </div>
  </div>
</div>
      </div>

      {/* Custom CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  )
}