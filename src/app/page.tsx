'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import WorkSection from '@/components/WorkSection'
import ServicesSection from '@/components/ServicesSection'
import ContactSection from '@/components/ContactSection'
import BookDemoModal from '@/components/BookDemoModal'

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'work', 'services', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="relative">
      <Navigation 
        activeSection={activeSection} 
        onNavigate={scrollToSection}
        onBookDemo={() => setIsModalOpen(true)}
      />
      <HeroSection onNavigate={scrollToSection} onBookDemo={() => setIsModalOpen(true)} />
      <AboutSection />
      <WorkSection />
      <ServicesSection onBookDemo={() => setIsModalOpen(true)} />
      <ContactSection />
      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
