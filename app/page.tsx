// app/page.tsx
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Experience } from '@/components/Experience'
import { Education } from '@/components/Education'
import { Contact } from '@/components/Contact'
import { StatsWidget } from '@/components/StatsWidget'
import { ReactionButtons } from '@/components/ReactionButtons'
import { VisitorBadge } from '@/components/VisitorBadge'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      
      {/* Stats Widget Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <StatsWidget />
        </div>
      </section>
      
      <Skills />
      
      {/* Reaction Buttons Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ReactionButtons />
        </div>
      </section>
      
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <VisitorBadge />
    </>
  )
}