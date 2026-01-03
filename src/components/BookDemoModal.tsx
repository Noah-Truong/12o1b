'use client'

import { useState, useEffect, useRef } from 'react'
import { animate } from 'animejs'

interface BookDemoModalProps {
  isOpen: boolean
  onClose: () => void
}

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
  'France', 'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Spain',
  'Italy', 'Netherlands', 'Sweden', 'Singapore', 'South Korea', 
  'United Arab Emirates', 'Saudi Arabia', 'Other'
]

const budgetOptions = [
  'Under $10,000',
  '$10,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000 - $500,000',
  '$500,000+',
  'Not sure yet'
]

interface FormData {
  firstName: string
  lastName: string
  companyName: string
  jobTitle: string
  workEmail: string
  country: string
  budget: string
  projectDetails: string
}

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    companyName: '',
    jobTitle: '',
    workEmail: '',
    country: '',
    budget: '',
    projectDetails: '',
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      if (modalRef.current) {
        animate(modalRef.current, {
          opacity: [0, 1],
          duration: 300,
          ease: 'outQuad',
        })
      }
      
      if (contentRef.current) {
        animate(contentRef.current, {
          opacity: [0, 1],
          scale: [0.95, 1],
          duration: 400,
          delay: 100,
          ease: 'outExpo',
        })
      }
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          companyName: '',
          jobTitle: '',
          workEmail: '',
          country: '',
          budget: '',
          projectDetails: '',
        })
        setTimeout(() => {
          onClose()
          setSubmitStatus('idle')
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (contentRef.current) {
      animate(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 200,
        ease: 'inQuad',
      })
    }
    
    if (modalRef.current) {
      animate(modalRef.current, {
        opacity: 0,
        duration: 300,
        delay: 100,
        ease: 'inQuad',
        onComplete: onClose,
      })
    } else {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 modal-overlay opacity-0"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="bg-graphite border border-slate rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto opacity-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-graphite border-b border-slate px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between rounded-t-2xl sm:rounded-t-3xl z-10">
          <div className="flex-1 min-w-0 mr-4">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ice">Let&apos;s build together</h2>
            <p className="text-silver text-xs sm:text-sm mt-1">Join us in the development of agentic solutions</p>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full border border-slate flex items-center justify-center text-silver hover:text-ice hover:border-ice transition-colors flex-shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-4 sm:space-y-6">
          {/* Name Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                placeholder="First Name *"
              />
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
                placeholder="Last Name *"
              />
            </div>
          </div>

          {/* Company & Job Title */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                id="companyName"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                className="form-input"
                placeholder="Company Name *"
              />
            </div>
            <div>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                required
                value={formData.jobTitle}
                onChange={handleChange}
                className="form-input"
                placeholder="Job Title *"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              id="workEmail"
              name="workEmail"
              required
              value={formData.workEmail}
              onChange={handleChange}
              className="form-input"
              placeholder="Work Email *"
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-ice text-sm mb-2">Country *</label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-ice text-sm mb-3">Budget Range *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {budgetOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center justify-center px-4 py-3 rounded-2xl border cursor-pointer transition-all text-sm text-center ${
                    formData.budget === option
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-slate bg-slate/30 text-silver hover:border-ice/50 hover:text-ice'
                  }`}
                >
                  <input
                    type="radio"
                    name="budget"
                    value={option}
                    checked={formData.budget === option}
                    onChange={handleChange}
                    className="sr-only"
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div>
            
            <textarea
              id="projectDetails"
              name="projectDetails"
              required
              rows={4}
              value={formData.projectDetails}
              onChange={handleChange}
              className="form-input resize-none"
              placeholder="Please describe your project in detail (data type, volume, timeline, budget, etc.)*"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <p className="text-glow text-center text-sm">
              Thank you! We&apos;ll be in touch soon.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-400 text-center text-sm">
              Something went wrong. Please try again or email us directly.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

