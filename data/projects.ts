// export const projects = [
//   {
//     title: 'Sistem Kasir Restoran - Laravel',
//     description: 'Sistem Point of Sale (POS) untuk restoran dengan fitur manajemen menu, pemesanan multi-meja, pembayaran dengan berbagai metode, dan laporan keuangan real-time. Sistem ini membantu restoran mengoptimalkan operasional harian.',
//     technologies: ['Laravel 11', 'MySQL', 'Livewire', 'Bootstrap', 'JavaScript', 'REST API'],
//     image: '🍽️',
//     liveUrl: '#',
//     githubUrl: '#',
//     category: 'Full-Stack',
//     featured: true,
//     stars: 47,
//     details: {
//       year: '2024',
//       client: 'Restoran Sederhana',
//       role: 'Full-Stack Developer',
//       challenges: 'Integrasi printer struk, manajemen stok real-time, sistem multi-user'
//     }
//   },
//   {
//     title: 'Aplikasi Pengelolaan Laundry - Laravel',
//     description: 'Sistem manajemen laundry lengkap dengan tracking paket, notifikasi WhatsApp otomatis, invoice digital, dan dashboard analitik. Meningkatkan efisiensi bisnis laundry hingga 40%.',
//     technologies: ['Laravel 11', 'MySQL', 'Chart.js', 'WhatsApp API', 'Bootstrap'],
//     image: '👕',
//     liveUrl: '#',
//     githubUrl: '#',
//     category: 'Web App',
//     featured: true,
//     stars: 38,
//     details: {
//       year: '2024',
//       client: 'Laundry Cepat Bersih',
//       role: 'Full-Stack Developer',
//       challenges: 'Integrasi WhatsApp API, sistem notifikasi multi-channel, tracking real-time'
//     }
//   },
//   {
//     title: 'Sistem Booking Hotel - Next.js',
//     description: 'Platform reservasi hotel dengan kalender ketersediaan room, sistem pembayaran online, review pelanggan, dan dashboard admin yang komprehensif. Mendukung multiple payment gateway.',
//     technologies: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
//     image: '🏨',
//     liveUrl: '#',
//     githubUrl: '#',
//     category: 'Web App',
//     featured: true,
//     stars: 52,
//     details: {
//       year: '2023',
//       client: 'Hotel Grand Maju',
//       role: 'Next.js',
//       challenges: 'Kalender ketersediaan real-time, integrasi payment gateway, sistem rating'
//     }
//   },
//   {
//     title: 'Website Desa Indrajaya - Laravel',
//     description: 'Website resmi desa dengan fitur pengumuman, galeri kegiatan, data kependudukan, layanan administrasi online, dan forum warga. Membangun komunikasi digital antara pemerintah desa dan masyarakat.',
//     technologies: ['Laravel 11', 'MySQL', 'Bootstrap', 'File Management', 'CRUD Operations'],
//     image: '🏘️',
//     liveUrl: '#',
//     githubUrl: '#',
//     category: 'Web App',
//     featured: false,
//     stars: 29,
//     details: {
//       year: '2023',
//       client: 'Desa Indrajaya',
//       role: 'Full-Stack Developer',
//       challenges: 'Manajemen user role, sistem pengumuman multi-level, galeri media'
//     }
//   },
//   {
//     title: 'Sistem Informasi Arsip & Akademik - Laravel',
//     description: 'Platform terintegrasi untuk pengelolaan arsip dokumen dan data akademik institusi pendidikan. Fitur pencarian cerdas, digitalisasi dokumen, dan reporting system.',
//     technologies: ['Laravel 11', 'MySQL', 'PDF Generation', 'Search Algorithm', 'Bootstrap'],
//     image: '📚',
//     liveUrl: '#',
//     githubUrl: '#',
//     category: 'Web App',
//     featured: true,
//     stars: 41,
//     details: {
//       year: '2023',
//       client: 'Sekolah Menengah Kejuruan',
//       role: 'Full-Stack Developer',
//       challenges: 'Sistem pencarian dokumen, manajemen permission, backup otomatis'
//     }
//   },
//   {
//     title: 'Marketplace UMKM Sirnaraja - Next.js',
//     description: 'Platform e-commerce khusus UMKM desa Sirnaraja dengan fitur multi-vendor, sistem pembayaran lokal, delivery tracking, dan dashboard penjualan. Memberdayakan ekonomi desa.',
//     technologies: ['Next.js 14', 'TypeScript', 'MongoDB', 'Midtrans API', 'Tailwind CSS'],
//     image: '🛒',
//     liveUrl: '#',
//     githubUrl: '#',
//     category: 'E-Commerce',
//     featured: true,
//     stars: 65,
//     details: {
//       year: '2024',
//       client: 'UMKM Desa Sirnaraja',
//       role: 'Full-Stack Developer',
//       challenges: 'Multi-vendor system, integrasi kurir lokal, sistem komisi penjual'
//     }
//   },
//   {
//     title: 'Web Undangan Pernikahan Digital - Next.js',
//     description: 'Website undangan pernikahan interaktif dengan RSVP online, gallery foto, countdown timer, live streaming integration, dan guest book digital. Tersedia dalam berbagai tema.',
//     technologies: ['Next.js 13', 'React', 'Firebase', 'Cloudinary', 'Tailwind CSS'],
//     image: '💍',
//     liveUrl: '#',
//     githubUrl: '#',
//     category: 'Web App',
//     featured: false,
//     stars: 33,
//     details: {
//       year: '2023',
//       client: 'Personal Project',
//       role: 'Frontend Developer',
//       challenges: 'Optimasi mobile experience, RSVP real-time, galeri foto interaktif'
//     }
//   },
//   {
//     title: 'Aplikasi Pengelolaan Sparepart - Flutter',
//     description: 'Mobile app untuk manajemen inventaris sparepart mobil & motor dengan sistem barcode scanning, notifikasi stok minimum, pembuatan PO otomatis, dan laporan penjualan.',
//     technologies: ['Flutter', 'Dart', 'REST API', 'Barcode Scanner', 'SQLite', 'Firebase'],
//     image: '🔧',
//     liveUrl: '#',
//     githubUrl: '#',
//     category: 'Mobile',
//     featured: true,
//     stars: 48,
//     details: {
//       year: '2024',
//       client: 'Bengkel Maju Jaya',
//       role: 'Mobile Developer',
//       challenges: 'Integrasi scanner barcode, sync data offline-online, multi-role access'
//     }
//   },
//   {
//     title: 'Aplikasi Pemesanan Makanan - Flutter',
//     description: 'Platform food delivery dengan fitur tracking order real-time, rating restoran, promo sistem, dan integrasi dengan Google Maps untuk delivery tracking.',
//     technologies: ['Flutter', 'Google Maps API', 'Firebase', 'REST API', 'Push Notification'],
//     image: '🍔',
//     liveUrl: '#',
//     githubUrl: '#',
//     category: 'Mobile',
//     featured: false,
//     stars: 36,
//     details: {
//       year: '2023',
//       client: 'Food Delivery Startup',
//       role: 'Mobile Developer',
//       challenges: 'Real-time tracking, sistem rating, manajemen promo code'
//     }
//   },
//   {
//     title: 'Marketplace Multi-Kategori - Flutter',
//     description: 'Aplikasi marketplace dengan kategori produk yang beragam, sistem chat penjual-pembeli, escrow payment, dan review system untuk transaksi yang aman.',
//     technologies: ['Flutter', 'WebSocket', 'Payment Gateway', 'Firebase', 'Cloud Storage'],
//     image: '🏪',
//     liveUrl: '#',
//     githubUrl: '#',
//     category: 'Mobile',
//     featured: true,
//     stars: 59,
//     details: {
//       year: '2024',
//       client: 'Marketplace Startup',
//       role: 'Mobile Developer',
//       challenges: 'Sistem chat real-time, escrow payment, manajemen kategori dinamis'
//     }
//   },
//   {
//     title: 'Aplikasi Kantin Digital - Flutter',
//     description: 'Sistem pemesanan makanan kantin dengan pre-order system, cashless payment, menu harian, dan dashboard untuk manajemen kantin.',
//     technologies: ['Flutter', 'QR Code', 'Local Database', 'REST API', 'Bluetooth Printer'],
//     image: '🏫',
//     liveUrl: '#',
//     githubUrl: '#',
//     category: 'Mobile',
//     featured: false,
//     stars: 27,
//     details: {
//       year: '2023',
//       client: 'Perusahaan Teknologi',
//       role: 'Mobile Developer',
//       challenges: 'Integrasi QR payment, sistem pre-order, manajemen menu harian'
//     }
//   },
//   {
//     title: 'Aplikasi Service Kendaraan - Flutter',
//     description: 'Platform untuk booking service kendaraan, tracking progress perbaikan, reminder maintenance, dan history service dengan estimasi biaya.',
//     technologies: ['Flutter', 'Calendar API', 'Push Notification', 'REST API', 'Firebase'],
//     image: '🚗',
//     liveUrl: '#',
//     githubUrl: '#',
//     category: 'Mobile',
//     featured: true,
//     stars: 42,
//     details: {
//       year: '2024',
//       client: 'Auto Service Center',
//       role: 'Mobile Developer',
//       challenges: 'Sistem booking slot waktu, tracking progress, estimasi biaya otomatis'
//     }
//   }
// ];

// export const projectCategories = [
//   'All',
//   'Web App',
//   'Full-Stack',
//   'E-Commerce',
//   'Mobile',
//   'Laravel',
//   'Next.js',
//   'Flutter'
// ];

// export const projectStats = {
//   total: 13,
//   laravel: 4,
//   nextjs: 3,
//   flutter: 6,
//   featured: 7
// };

// // Type definitions (optional)
// export type Project = typeof projects[0];
// export type ProjectCategory = typeof projectCategories[number];

