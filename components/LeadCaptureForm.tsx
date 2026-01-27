'use client'

import { useState } from 'react'

export interface LeadInfo {
  name: string
  email: string
  company: string
  title?: string
}

interface LeadCaptureFormProps {
  onSubmit: (lead: LeadInfo) => void
  isSubmitting: boolean
}

export function LeadCaptureForm({ onSubmit, isSubmitting }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<LeadInfo>({
    name: '',
    email: '',
    company: '',
    title: '',
  })
  const [errors, setErrors] = useState<Partial<LeadInfo>>({})

  const validate = (): boolean => {
    const newErrors: Partial<LeadInfo> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-donyati-black mb-2">
          Almost there!
        </h2>
        <p className="text-donyati-purple">
          Enter your details to receive your personalized AI maturity report.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-donyati-black mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:border-donyati-dark-purple ${
              errors.name ? 'border-red-400' : 'border-gray-200'
            }`}
            placeholder="John Smith"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-donyati-black mb-1">
            Work Email *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:border-donyati-dark-purple ${
              errors.email ? 'border-red-400' : 'border-gray-200'
            }`}
            placeholder="john@company.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-donyati-black mb-1">
            Company *
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:border-donyati-dark-purple ${
              errors.company ? 'border-red-400' : 'border-gray-200'
            }`}
            placeholder="Acme Inc."
          />
          {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-donyati-black mb-1">
            Job Title <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-colors focus:outline-none focus:border-donyati-dark-purple"
            placeholder="CTO"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-donyati-lime text-donyati-black px-6 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            'Get My Results'
          )}
        </button>

        <p className="text-xs text-center text-donyati-purple mt-4">
          By submitting, you agree to receive communications from Donyati about your assessment results
          and AI maturity resources. You can unsubscribe at any time.
        </p>
      </form>
    </div>
  )
}
