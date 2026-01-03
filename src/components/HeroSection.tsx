'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { stagger, Timeline } from 'animejs'
import * as THREE from 'three'

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void
  onBookDemo: () => void
}

interface VantaEffect {
  destroy: () => void
}

export default function HeroSection({ onNavigate, onBookDemo }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null)

  // Initialize Vanta.js Globe background
  const initVanta = useCallback(async () => {
    if (vantaEffect || !vantaRef.current) return
    
    // Check if we're on mobile for performance optimization
    const isMobile = window.innerWidth < 768
    
    const VANTA = await import('vanta/dist/vanta.globe.min')
    const effect = VANTA.default({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: !isMobile, // Disable mouse controls on mobile
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: isMobile ? 0.8 : 1.0, // Smaller scale on mobile
      scaleMobile: 0.8,
      color: 0xff6b00, // electric orange
      color2: 0xff9500, // lighter orange
      backgroundColor: 0x0d0d0d, // carbon color
    })
    setVantaEffect(effect)
  }, [vantaEffect])

  useEffect(() => {
    initVanta()
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [initVanta, vantaEffect])

  // Anime.js entrance animations
  useEffect(() => {
    const tl = new Timeline({ defaults: { ease: 'outExpo' } })
    
    tl.add('.hero-eyebrow', {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
    })
    .add('.hero-title span', {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
      delay: stagger(150),
    }, '-=400')
    .add('.hero-description', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
    }, '-=600')
    .add('.hero-buttons', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
    }, '-=500')
    .add('.hero-scroll', {
      opacity: [0, 1],
      duration: 600,
    }, '-=300')
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Vanta.js Globe Background */}
      <div 
        ref={vantaRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-carbon/40 via-carbon/20 to-carbon/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center pt-20 pb-24">

        {/* Eyebrow text */}
        <p className="hero-eyebrow opacity-0 text-accent uppercase tracking-[0.2em] sm:tracking-[0.4em] text-xs sm:text-sm mb-4 sm:mb-6">
          12o1b - AI Technologies
        </p>

        {/* Main heading */}
        <h1 className="hero-title font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-ice leading-[0.95] mb-6 sm:mb-8 font-extralight">
          <span className="block opacity-0">Building</span>
          <span className="block opacity-0 text-accent glow-text">Agentic</span>
          <span className="block opacity-0">Solutions</span>
        </h1>

        {/* Description */}
        <p className="hero-description opacity-0 max-w-2xl mx-auto text-silver text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-12 px-2">
          We create cutting-edge AI products that transform businesses. 
          From intelligent automation to machine learning solutions, 
          we bring your vision to life with advanced technology.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons opacity-0 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onBookDemo}
            className="btn-primary w-full sm:w-auto"
          >
            Book Demo
          </button>
          <a
            href="https://calendly.com/12o1b12o1bai/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full sm:w-auto text-center"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator - hidden on very small screens */}
      <button
        onClick={() => onNavigate('about')}
        className="hero-scroll opacity-0 absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-silver hover:text-accent transition-colors z-10 hidden sm:flex"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-accent to-transparent" />
      </button>
    </section>
  )
}
