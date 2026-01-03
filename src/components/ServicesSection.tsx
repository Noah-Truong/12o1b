'use client'

import { useEffect, useRef, useState } from 'react'
import { stagger, Timeline } from 'animejs'

interface ServicesSectionProps {
  onBookDemo: () => void
}

const services = [
  {
    id: 'ml',
    title: 'Machine Learning Solutions',
    description:
      'Custom ML models tailored to your business needs. From predictive analytics to recommendation systems, we build intelligent solutions that learn and improve.',
    items: ['Custom Model Development', 'Model Training & Fine-tuning', 'MLOps & Deployment', 'Performance Optimization'],
  },
  {
    id: 'cv',
    title: 'Computer Vision',
    description:
      'Transform visual data into actionable insights. Our computer vision solutions power quality control, autonomous systems, and visual search applications.',
    items: ['Object Detection', 'Image Classification', 'Video Analytics', 'OCR & Document Processing'],
  },
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    description:
      'Unlock the power of text and speech data. We build conversational AI, sentiment analysis, and document intelligence systems.',
    items: ['Chatbots & Virtual Assistants', 'Sentiment Analysis', 'Text Summarization', 'Language Translation'],
  }
]

export default function ServicesSection({ onBookDemo }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)
  const [activeService, setActiveService] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            
            const tl = new Timeline({ defaults: { ease: 'outExpo' } })
            
            tl.add(sectionRef.current?.querySelectorAll('.services-header') as NodeListOf<Element>, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: stagger(100),
            })
            .add(sectionRef.current?.querySelectorAll('.service-item') as NodeListOf<Element>, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              delay: stagger(100),
            }, '-=400')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 sm:py-32 lg:py-48 bg-graphite overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-glow/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-12 lg:mb-24">
          <p className="services-header opacity-0 text-glow uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-6">
            What We Do
          </p>
          <h2 className="services-header opacity-0 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ice leading-[1.1] mb-4 sm:mb-6 font-extralight">
            AI services built for{' '}
            <span className="text-accent">your success</span>
          </h2>
          <p className="services-header opacity-0 text-silver text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
            From concept to deployment, we provide end-to-end AI services that 
            transform your business operations and drive measurable outcomes.
          </p>
          <button 
            onClick={onBookDemo}
            className="services-header opacity-0 btn-primary"
          >
            Book Demo
          </button>
        </div>

        {/* Services Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-item opacity-0 border-t border-slate/30"
            >
              <button
                onClick={() =>
                  setActiveService(activeService === service.id ? null : service.id)
                }
                className="w-full py-5 sm:py-8 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4 sm:gap-8">
                  <span className="text-silver/50 font-display text-base sm:text-xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-lg sm:text-2xl md:text-3xl text-ice group-hover:text-accent transition-colors text-left font-light">
                    {service.title}
                  </h3>
                </div>
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4 ${
                    activeService === service.id
                      ? 'bg-accent border-accent rotate-45'
                      : 'group-hover:border-accent'
                  }`}
                >
                  <span
                    className={`text-xl sm:text-2xl font-light ${
                      activeService === service.id ? 'text-carbon' : 'text-ice'
                    }`}
                  >
                    +
                  </span>
                </div>
              </button>

              {/* Expandable content */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeService === service.id ? 'max-h-[500px] pb-6 sm:pb-8' : 'max-h-0'
                }`}
              >
                <div className="pl-0 sm:pl-12 md:pl-20 grid md:grid-cols-2 gap-6 sm:gap-8">
                  <p className="text-silver text-sm sm:text-base leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 sm:space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                        <span className="text-ice/70 text-sm sm:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-slate/30" />
        </div>
      </div>
    </section>
  )
}
