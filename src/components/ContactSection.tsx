'use client'

import { useEffect, useRef } from 'react'
import { stagger, Timeline } from 'animejs'
import Image from 'next/image'

const navItems = [
  { name: 'Home', id: 'hero' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'work' },
  { name: 'Services', id: 'services' },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            
            const tl = new Timeline({ defaults: { ease: 'outExpo' } })
            
            tl.add(sectionRef.current?.querySelectorAll('.contact-animate') as NodeListOf<Element>, {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              delay: stagger(100),
            })
            .add(sectionRef.current?.querySelectorAll('.contact-info') as NodeListOf<Element>, {
              opacity: [0, 1],
              translateX: [-20, 0],
              duration: 600,
              delay: stagger(100),
            }, '-=400')
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 sm:py-32 lg:py-48 bg-carbon overflow-hidden"
    >
      {/* Decorative elements - angular like logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] opacity-10">
        <div className="absolute inset-0 border border-accent/30 rotate-45" />
        <div className="absolute inset-10 sm:inset-20 border border-glow/20 rotate-45" />
        <div className="absolute inset-20 sm:inset-40 border border-ice/10 rotate-45" />
      </div>
      
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="contact-animate opacity-0 text-accent uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-6">
            Get in Touch
          </p>
          <h2 className="contact-animate opacity-0 font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 sm:mb-8 text-ice font-extralight">
            Let&apos;s build{' '}
            <span className="text-accent glow-text">solutions</span>
          </h2>
          <p className="contact-animate opacity-0 text-silver text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
            Ready to transform your business with agentic solutions?
          </p>

          {/* Contact options */}
          <div className="contact-animate opacity-0 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-20">
            <a
              href="mailto:12o1b12o1bAI@gmail.com"
              className="btn-primary w-full sm:w-auto text-center"
            >
              Contact Us
            </a>
            <a
              href="https://calendly.com/12o1b12o1bai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto text-center"
            >
              Get in Touch
            </a>
          </div>

          {/* Contact info */}
          <div className="contact-info opacity-0 pt-8 sm:pt-12 border-t border-slate/30">
            <a 
              href="https://www.linkedin.com/company/12o1b-technologies/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-ice hover:text-accent border-b border-accent/30 transition-colors text-base sm:text-lg inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 sm:mt-32 pt-6 sm:pt-8 border-t border-slate/30 safe-bottom">
          {/* Mobile: Stack vertically, Desktop: Row */}
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="12o1b" width={32} height={32} className="w-8 h-8" />
              <span className="font-display text-xl font-bold tracking-tight text-ice">12o1b</span>
            </div>
            
            {/* Navigation links */}
            <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-silver hover:text-accent text-sm transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </nav>
            
            {/* Copyright */}
            <p className="text-silver/50 text-xs sm:text-sm text-center">
              © 2026 12o1b. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </section>
  )
}
