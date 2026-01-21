'use client'

import { Shield, Lock, Eye, FileText, ArrowLeft, Home } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('privacy')
  const router = useRouter()

  const handleBack = () => {
    // Kembali ke halaman sebelumnya
    router.back()
  }

  const handleHome = () => {
    // Kembali ke home page
    router.push('/')
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Back & Home Buttons */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-gray-700 hover:text-blue-600 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Kembali</span>
        </button>
        
        <button
          onClick={handleHome}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Home className="w-4 h-4" />
          <span className="text-sm font-medium">Home</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Kebijakan Privasi & Syarat Layanan
        </h1>
        <p className="text-gray-600">
          Informasi tentang bagaimana data Anda dikelola dan ketentuan penggunaan website ini.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveSection('privacy')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
            activeSection === 'privacy'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Lock className="w-5 h-5" />
          Kebijakan Privasi
        </button>
        <button
          onClick={() => setActiveSection('terms')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
            activeSection === 'terms'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <FileText className="w-5 h-5" />
          Syarat Layanan
        </button>
        <button
          onClick={() => setActiveSection('contact')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
            activeSection === 'contact'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Eye className="w-5 h-5" />
          Kontak & Pertanyaan
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
        {activeSection === 'privacy' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Kebijakan Privasi</h2>
            <p className="text-gray-600">
              Kebijakan privasi ini menjelaskan bagaimana data pribadi Anda dikumpulkan, digunakan, 
              dan dilindungi ketika Anda mengunjungi website portfolio ini.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Data yang Dikumpulkan</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Nama dan alamat email (hanya jika Anda mengisi formulir kontak)</li>
                  <li>Data teknis seperti alamat IP, jenis browser, dan perangkat yang digunakan</li>
                  <li>Informasi penggunaan website melalui cookies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Penggunaan Data</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Untuk merespons pertanyaan dan pesan yang dikirim melalui formulir kontak</li>
                  <li>Untuk meningkatkan pengalaman pengguna di website ini</li>
                  <li>Untuk tujuan analitik dan statistik yang tidak mengidentifikasi pribadi</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Perlindungan Data</h3>
                <p className="text-gray-600">
                  Saya menerapkan langkah-langkah keamanan yang wajar untuk melindungi data pribadi 
                  Anda dari akses, penggunaan, atau pengungkapan yang tidak sah.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">4. Cookies</h3>
                <p className="text-gray-600">
                  Website ini menggunakan cookies untuk meningkatkan pengalaman pengguna. 
                  Anda dapat mengatur browser untuk menolak cookies, tetapi beberapa fitur mungkin tidak berfungsi optimal.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">5. Hak Anda</h3>
                <p className="text-gray-600">
                  Anda memiliki hak untuk meminta akses, perbaikan, atau penghapusan data pribadi Anda. 
                  Untuk menggunakan hak-hak ini, silakan hubungi saya melalui formulir kontak.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'terms' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Syarat Layanan</h2>
            <p className="text-gray-600">
              Dengan mengakses dan menggunakan website ini, Anda menyetujui untuk terikat oleh syarat dan ketentuan berikut.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Penggunaan Website</h3>
                <p className="text-gray-600">
                  Anda setuju untuk menggunakan website ini hanya untuk tujuan yang sah dan 
                  tidak melanggar hukum yang berlaku.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Hak Kekayaan Intelektual</h3>
                <p className="text-gray-600">
                  Semua konten di website ini (teks, gambar, logo, kode) dilindungi oleh hak cipta 
                  dan merupakan milik Pujiharyadi kecuali dinyatakan lain.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Batasan Tanggung Jawab</h3>
                <p className="text-gray-600">
                  Website ini disediakan "sebagaimana adanya". Saya tidak bertanggung jawab atas 
                  kerugian langsung atau tidak langsung yang timbul dari penggunaan website ini.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">4. Tautan ke Situs Lain</h3>
                <p className="text-gray-600">
                  Website ini mungkin berisi tautan ke situs web pihak ketiga. Saya tidak bertanggung jawab 
                  atas konten atau praktik privasi situs-situs tersebut.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">5. Perubahan Syarat</h3>
                <p className="text-gray-600">
                  Saya berhak mengubah syarat layanan ini kapan saja. Perubahan akan berlaku 
                  setelah diposting di halaman ini.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Kontak & Pertanyaan</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Untuk Pertanyaan</h3>
                <p className="text-gray-600">
                  Jika Anda memiliki pertanyaan tentang kebijakan privasi atau syarat layanan, 
                  silakan hubungi saya melalui:
                </p>
                <ul className="mt-2 text-gray-600 space-y-2">
                  <li>📧 Email: pujiharyadi@example.com</li>
                  <li>🌐 Website: Formulir kontak di halaman utama</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Perubahan Kebijakan</h3>
                <p className="text-gray-600">
                  Kebijakan privasi dan syarat layanan ini dapat diperbarui dari waktu ke waktu. 
                  Versi terbaru akan selalu tersedia di halaman ini.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Efektivitas</h3>
                <p className="text-gray-600">
                  Kebijakan ini mulai efektif pada tanggal pembuatan website dan akan terus berlaku 
                  kecuali diubah di kemudian hari.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">
                  <strong>Catatan:</strong> Kebijakan ini dibuat untuk website portfolio pribadi. 
                  Untuk website komersial atau yang menangani data sensitif, disarankan untuk 
                  berkonsultasi dengan ahli hukum.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300 text-gray-700 hover:text-blue-600 hover:border-blue-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Kembali</span>
            </button>
            
            <button
              onClick={handleHome}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Ke Homepage</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}