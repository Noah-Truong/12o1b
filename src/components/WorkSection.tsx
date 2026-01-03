'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, stagger, Timeline } from 'animejs'
import Image from 'next/image'

type ProjectCategory = 'all' | 'software' | 'hardware'

interface Project {
  title: string
  category: ProjectCategory
  description: string
  year: string
  image: string | null // null means placeholder
  link: string // project URL
}

const projects: Project[] = [
  {
    title: '[Project Title]',
    category: 'all',
    description: '[Project description goes here]',
    year: '2026',
    image: null, // Replace with '/images/project1.jpg' when you have an image
    link: '#', // Replace with actual project URL
  },
  // Add more projects here:
  // {
  //   title: 'Your Project Name',
  //   category: 'software', // or 'hardware'
  //   description: 'Brief description of the project',
  //   year: '2026',
  //   image: '/images/your-image.jpg', // or null for placeholder
  //   link: 'https://example.com/project',
  // },
]

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all')

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            
            const tl = new Timeline({ defaults: { ease: 'outExpo' } })
            
            tl.add(sectionRef.current?.querySelectorAll('.work-header') as NodeListOf<Element>, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: stagger(100),
            })
            .add(sectionRef.current?.querySelectorAll('.filter-btn') as NodeListOf<Element>, {
              opacity: [0, 1],
              translateX: [-20, 0],
              duration: 500,
              delay: stagger(80),
            }, '-=400')
            .add(sectionRef.current?.querySelectorAll('.project-card') as NodeListOf<Element>, {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 700,
              delay: stagger(100),
            }, '-=300')
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

  // Animate when filter changes
  useEffect(() => {
    if (hasAnimated.current) {
      animate('.project-card', {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 400,
        delay: stagger(50),
        ease: 'outQuad',
      })
    }
  }, [activeFilter])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-20 sm:py-32 lg:py-48 bg-carbon overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 lg:mb-16">
          <div>
            <p className="work-header opacity-0 text-accent uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-6">
              Our Projects
            </p>
            <h2 className="work-header opacity-0 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ice leading-[1.1] font-extralight">
              AI solutions that{' '}
              <span className="text-accent">deliver</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>real results
            </h2>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12">
          {(['all', 'software', 'hardware'] as ProjectCategory[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn opacity-0 ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <a
              key={`${project.title}-${index}`}
              href={project.link}
              target={project.link.startsWith('http') ? '_blank' : undefined}
              rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="project-card opacity-0 group block"
            >
              {/* Project Image Card */}
              <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl mb-4 sm:mb-5 overflow-hidden relative border border-slate/30 transition-all duration-500 group-hover:border-accent/50 bg-slate/20">
                {project.image ? (
                  // Actual project image
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  // Placeholder when no image
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate/30 to-graphite">
                    {/* Placeholder icon */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 rounded-xl sm:rounded-2xl border-2 border-dashed border-silver/30 flex items-center justify-center group-hover:border-accent/50 transition-colors duration-300">
                      <svg 
                        className="w-6 h-6 sm:w-8 sm:h-8 text-silver/40 group-hover:text-accent/60 transition-colors duration-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                      </svg>
                    </div>
                    <span className="text-silver/40 text-xs uppercase tracking-wider">
                      Image Placeholder
                    </span>
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="px-3 sm:px-4 py-2 bg-carbon/80 backdrop-blur-sm rounded-full text-accent text-xs sm:text-sm font-medium flex items-center gap-2">
                    Visit Project
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl text-ice mb-1 sm:mb-2 group-hover:text-accent transition-colors font-light truncate">
                    {project.title}
                  </h3>
                  <p className="text-silver text-xs sm:text-sm line-clamp-2">{project.description}</p>
                </div>
                <span className="text-silver/50 text-xs sm:text-sm flex-shrink-0 ml-3 sm:ml-4">{project.year}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
