'use client'

import { useState, useEffect } from 'react'
import { getAllIndustries, type IndustryInfo } from '@/lib/industries'

interface SettingsData {
  industryStepEnabled: boolean
  disabledIndustries: string[]
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const allIndustries = getAllIndustries()

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data: SettingsData) => {
        setSettings(data)
        setLoading(false)
      })
      .catch(() => {
        // Fall back to defaults
        setSettings({ industryStepEnabled: true, disabledIndustries: [] })
        setLoading(false)
      })
  }, [])

  const handleToggleStep = () => {
    if (!settings) return
    setSettings({ ...settings, industryStepEnabled: !settings.industryStepEnabled })
    setFeedback(null)
  }

  const handleToggleIndustry = (industryId: string) => {
    if (!settings || industryId === 'general') return
    const disabled = new Set(settings.disabledIndustries)
    if (disabled.has(industryId)) {
      disabled.delete(industryId)
    } else {
      disabled.add(industryId)
    }
    setSettings({ ...settings, disabledIndustries: Array.from(disabled) })
    setFeedback(null)
  }

  const handleSave = async () => {
    if (!settings) return
    setSaving(true)
    setFeedback(null)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (!res.ok) throw new Error('Save failed')
      setFeedback({ type: 'success', message: 'Settings saved successfully.' })
    } catch {
      setFeedback({ type: 'error', message: 'Failed to save settings. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-donyati-purple" />
      </div>
    )
  }

  if (!settings) return null

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-donyati-black mb-8">Settings</h1>

      {/* Assessment Flow */}
      <section className="bg-white rounded-xl shadow-card p-6 mb-6">
        <h2 className="text-lg font-semibold text-donyati-black mb-4">Assessment Flow</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Industry Selection Step</p>
            <p className="text-sm text-gray-500">
              When disabled, assessors skip industry selection and receive the general assessment.
            </p>
          </div>
          <button
            onClick={handleToggleStep}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.industryStepEnabled ? 'bg-donyati-purple' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.industryStepEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </section>

      {/* Active Industries */}
      <section
        className={`bg-white rounded-xl shadow-card p-6 mb-6 transition-opacity ${
          settings.industryStepEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'
        }`}
      >
        <h2 className="text-lg font-semibold text-donyati-black mb-1">Active Industries</h2>
        <p className="text-sm text-gray-500 mb-4">
          Uncheck industries to hide them from the assessment. &quot;General / Other&quot; is always available.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allIndustries.map((industry: IndustryInfo) => {
            const isGeneral = industry.id === 'general'
            const isDisabled = settings.disabledIndustries.includes(industry.id)
            const isChecked = isGeneral || !isDisabled

            return (
              <label
                key={industry.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  isChecked
                    ? 'border-donyati-purple bg-donyati-light-purple/30'
                    : 'border-gray-200 bg-gray-50'
                } ${isGeneral ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={isGeneral}
                  onChange={() => handleToggleIndustry(industry.id)}
                  className="h-4 w-4 rounded border-gray-300 text-donyati-purple focus:ring-donyati-purple"
                />
                <span className="text-xl">{industry.icon}</span>
                <span className={`text-sm font-medium ${isChecked ? 'text-gray-900' : 'text-gray-400'}`}>
                  {industry.name}
                </span>
              </label>
            )
          })}
        </div>
      </section>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-donyati-lime text-donyati-black rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>

        {feedback && (
          <p
            className={`text-sm ${
              feedback.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {feedback.message}
          </p>
        )}
      </div>
    </div>
  )
}
