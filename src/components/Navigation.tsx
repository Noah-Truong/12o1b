'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface NavigationProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
  onBookDemo: () => void
}

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export default function Navigation({ activeSection, onNavigate, onBookDemo }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-carbon/90 backdrop-blur-md border-b border-slate/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image src="/logo.png" alt="12o1b" width={40} height={40} className="w-10 h-10" />
            <span className="font-display text-2xl font-bold tracking-tight text-ice">12o1b</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-dot text-sm tracking-wide uppercase transition-colors ${
                  activeSection === item.id
                    ? 'text-accent active'
                    : 'text-ice/60 hover:text-ice'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onBookDemo}
              className="btn-primary text-sm"
            >
              Book Demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-ice transition-transform ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-ice transition-opacity ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-ice transition-transform ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-carbon/95 backdrop-blur-md border-b border-slate/20 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id)
                setIsMobileMenuOpen(false)
              }}
              className={`text-left text-lg tracking-wide transition-all ${
                activeSection === item.id ? 'text-accent' : 'text-ice/70'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onBookDemo()
              setIsMobileMenuOpen(false)
            }}
            className="btn-primary text-center mt-4"
          >
            Book Demo
          </button>
        </div>
      </div>
    </nav>
  )
}
