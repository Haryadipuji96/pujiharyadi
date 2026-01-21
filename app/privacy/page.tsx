import { PrivacyPolicy } from '@/components/PrivacyPolicy'
// import { Navbar } from '@/components/Navbar'


export default function PrivacyPage() {
  return (
    <>
      {/* <Navbar /> */}
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
        <div className="max-w-7xl mx-auto px-4">
          <PrivacyPolicy />
        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
}