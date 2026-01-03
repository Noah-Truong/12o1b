'use client'

import { useEffect, useRef } from 'react'
import { stagger, Timeline } from 'animejs'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            
            // Animate section elements with anime.js
            const tl = new Timeline({ defaults: { ease: 'outExpo' } })
            
            tl.add(sectionRef.current?.querySelectorAll('.about-animate') as NodeListOf<Element>, {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              delay: stagger(100),
            })
            .add(sectionRef.current?.querySelectorAll('.stat-card') as NodeListOf<Element>, {
              opacity: [0, 1],
              scale: [0.9, 1],
              duration: 600,
              delay: stagger(100),
            }, '-=400')
            .add(sectionRef.current?.querySelectorAll('.value-item') as NodeListOf<Element>, {
              opacity: [0, 1],
              translateX: [-30, 0],
              duration: 600,
              delay: stagger(150),
            }, '-=300')
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
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-32 lg:py-48 bg-graphite overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-accent/5 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left column */}
          <div>
            <p className="about-animate opacity-0 text-accent uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-6">
              About Us
            </p>
            <h2 className="about-animate opacity-0 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 sm:mb-8 font-extralight text-ice">
              Pioneering{' '}
              <span className="text-accent">AI innovation</span> for tomorrow
            </h2>
            <p className="about-animate opacity-0 text-silver text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              12o1b is an innovative AI company dedicated to creating solutions for clients.
            </p>
            <p className="about-animate opacity-0 text-silver text-base sm:text-lg leading-relaxed">
              Our team UC Berkeley students are seeking
              to deliver solutions that are not just technologically advanced, 
              but also intuitive and impactful.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16 sm:mt-24 lg:mt-32 grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {[
            {
              title: 'Innovation',
              description:
                'We push the boundaries of what AI can achieve, constantly exploring new techniques and technologies.',
            },
            {
              title: 'Reliability',
              description:
                'Our solutions are built to perform consistently, with robust architecture and thorough testing.',
            },
            {
              title: 'Partnership',
              description:
                'We work closely with clients to understand their needs and deliver solutions that truly fit.',
            },
          ].map((value, index) => (
            <div
              key={value.title}
              className="value-item opacity-0"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border border-accent/50 flex items-center justify-center mb-4 sm:mb-6 bg-accent/10">
                <span className="text-accent font-display text-lg sm:text-xl font-bold">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl mb-3 sm:mb-4 text-ice font-light">{value.title}</h3>
              <p className="text-silver text-sm sm:text-base leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
