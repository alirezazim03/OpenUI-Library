import React, { useState, useEffect } from 'react'
import {LuCookie, LuX, LuChevronDown, LuChevronUp } from "react-icons/lu";

// Custom Hook for Cookie Consent Management
const useCookieConsent = (cookieName = 'user_cookie_consent', expiryDays = 365) => {
  const [consent, setConsent] = useState(null)
  const [showBanner, setShowBanner] = useState(false)

  // Get consent from cookie
  const getConsent = () => {
    if (typeof document === 'undefined') return null
    
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === cookieName) {
        try {
          return JSON.parse(decodeURIComponent(value))
        } catch (e) {
          return null
        }
      }
    }
    return null
  }

  // Save consent to cookie
  const saveConsent = (consentData) => {
    if (typeof document === 'undefined') return
    
    const consentString = JSON.stringify(consentData)
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + expiryDays)
    
    document.cookie = `${cookieName}=${encodeURIComponent(consentString)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`
    setConsent(consentData)
    setShowBanner(false)
  }

  // Accept all cookies
  const acceptAll = () => {
    const consentData = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString()
    }
    saveConsent(consentData)
    return consentData
  }

  // Reject all cookies
  const rejectAll = () => {
    const consentData = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString()
    }
    saveConsent(consentData)
    return consentData
  }

  // Save custom preferences
  const savePreferences = (preferences) => {
    const consentData = {
      essential: true,
      analytics: preferences.analytics || false,
      marketing: preferences.marketing || false,
      preferences: preferences.preferences || false,
      timestamp: new Date().toISOString()
    }
    saveConsent(consentData)
    return consentData
  }

  // Withdraw consent
  const withdrawConsent = () => {
    if (typeof document === 'undefined') return
    
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    setConsent(null)
    setShowBanner(true)
  }

  // Check for existing consent on mount
  useEffect(() => {
    const existingConsent = getConsent()
    if (existingConsent) {
      setConsent(existingConsent)
      setShowBanner(false)
    } else {
      setShowBanner(true)
    }
  }, [])

  return {
    consent,
    showBanner,
    acceptAll,
    rejectAll,
    savePreferences,
    withdrawConsent
  }
}

// Cookie Preferences Modal Component
const CookiePreferences = ({ isOpen, onClose, onSave, currentPreferences }) => {
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
    preferences: false
  })

  const [expandedCategories, setExpandedCategories] = useState({})

  useEffect(() => {
    if (currentPreferences) {
      setPreferences({
        analytics: currentPreferences.analytics || false,
        marketing: currentPreferences.marketing || false,
        preferences: currentPreferences.preferences || false
      })
    }
  }, [currentPreferences])

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const handleSave = () => {
    onSave(preferences)
  }

  if (!isOpen) return null

  const categories = [
    {
      id: 'essential',
      title: 'Essential Cookies',
      description: 'Required for the website to function properly. Cannot be disabled.',
      required: true,
      cookies: [
        { name: 'user_cookie_consent', duration: '1 year', purpose: 'Stores user cookie preferences' }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      required: false,
      cookies: [
        { name: '_ga', duration: '2 years', purpose: 'Google Analytics - distinguishes users' },
        { name: '_gid', duration: '24 hours', purpose: 'Google Analytics - distinguishes users' }
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing Cookies',
      description: 'Used to deliver personalized advertisements relevant to you and your interests.',
      required: false,
      cookies: [
        { name: '_fbp', duration: '3 months', purpose: 'Facebook Pixel - tracks conversions' },
        { name: 'IDE', duration: '1 year', purpose: 'Google Ads - advertising tracking' }
      ]
    },
    {
      id: 'preferences',
      title: 'Preference Cookies',
      description: 'Remember your settings and preferences for a better experience.',
      required: false,
      cookies: [
        { name: 'theme', duration: '1 year', purpose: 'Stores user theme preference' },
        { name: 'language', duration: '1 year', purpose: 'Stores user language preference' }
      ]
    }
  ]

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preferences-title"
      >
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 id="preferences-title" className="text-2xl font-semibold text-gray-900">
              Cookie Preferences
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close preferences"
            >
              <LuX className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6 space-y-4">
            <p className="text-sm text-gray-600 mb-6">
              We use cookies to enhance your browsing experience and analyze our traffic. 
              You can choose which types of cookies to allow below.
            </p>

            {categories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {category.required ? (
                        <input
                          type="checkbox"
                          checked={true}
                          disabled
                          className="w-5 h-5 rounded border-gray-300 text-green-600 opacity-50 cursor-not-allowed"
                          aria-label={`${category.title} - Always enabled`}
                        />
                      ) : (
                        <input
                          type="checkbox"
                          checked={preferences[category.id]}
                          onChange={(e) => setPreferences({ ...preferences, [category.id]: e.target.checked })}
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          aria-label={category.title}
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900">{category.title}</h3>
                          {category.required && (
                            <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded">
                              Always Active
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={expandedCategories[category.id] ? 'Hide details' : 'Show details'}
                    >
                      {expandedCategories[category.id] ? (
                        <LuChevronUp className="w-5 h-5" />
                      ) : (
                        <LuChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {expandedCategories[category.id] && (
                  <div className="p-4 bg-white border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Cookie Details</h4>
                    <div className="space-y-2">
                      {category.cookies.map((cookie, index) => (
                        <div key={index} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                          <div className="font-medium text-gray-900">{cookie.name}</div>
                          <div>Duration: {cookie.duration}</div>
                          <div>Purpose: {cookie.purpose}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Save Preferences
            </button>
            <button
              onClick={() => {
                setPreferences({ analytics: true, marketing: true, preferences: true })
                onSave({ analytics: true, marketing: true, preferences: true })
              }}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// Main Cookie Consent Component
const CookieConsent = ({
  position = 'bottom',
  title = 'We Value Your Privacy',
  description = 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
  onAccept = null,
  onReject = null,
  onPreferencesSave = null,
  cookieName = 'user_cookie_consent',
  expiryDays = 365,
  showSettingsButton = true,
  policyUrl = '/privacy-policy'
}) => {
  const { consent, showBanner, acceptAll, rejectAll, savePreferences } = useCookieConsent(cookieName, expiryDays)
  const [showPreferences, setShowPreferences] = useState(false)

  const handleAcceptAll = () => {
    const consentData = acceptAll()
    if (onAccept) onAccept(consentData)
  }

  const handleRejectAll = () => {
    const consentData = rejectAll()
    if (onReject) onReject(consentData)
  }

  const handleSavePreferences = (preferences) => {
    const consentData = savePreferences(preferences)
    setShowPreferences(false)
    if (onPreferencesSave) onPreferencesSave(consentData)
  }

  if (!showBanner) return null

  const positionClasses = {
    bottom: 'bottom-0 sm:bottom-4 sm:left-4 sm:right-auto',
    top: 'top-0 sm:top-4 sm:left-4 sm:right-auto'
  }

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>

      <div
        className={`fixed left-0 right-0 ${positionClasses[position]} z-50 transition-all duration-500 ease-in-out animate-slide-up`}
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
      >
        <div className="mx-4 sm:mx-0 sm:max-w-md bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 id="cookie-banner-title" className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <LuCookie className="w-5 h-5 text-blue-600" />
              {title}
            </h2>
          </div>

          {/* Content */}
          <div className="p-4">
            <p id="cookie-banner-description" className="text-sm text-gray-600 leading-relaxed mb-4">
              {description}
            </p>
            <a 
              href={policyUrl}
              className="text-xs text-blue-600 hover:text-blue-800 underline inline-block mb-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more about our cookie policy
            </a>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 p-4 pt-0">
            <button
              onClick={handleRejectAll}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              aria-label="Reject all cookies"
            >
              Reject All
            </button>
            {showSettingsButton && (
              <button
                onClick={() => setShowPreferences(true)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                aria-label="Manage cookie preferences"
              >
                Manage Preferences
              </button>
            )}
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
              aria-label="Accept all cookies"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      <CookiePreferences
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSave={handleSavePreferences}
        currentPreferences={consent}
      />
    </>
  )
}

import React from 'react'
import CookieConsent from './CookieConsent'

const bannerDemo =()=> {
  const showCookieBanner = () => {
    // Clear consent cookie
    document.cookie = 'user_cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    // Reload page to show banner
    window.location.reload()
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Cookie Consent Banner Demo
        </h1>
        
        <button
          onClick={showCookieBanner}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
        >
          Show Demo
        </button>
      </div>

      <CookieConsent
        onAccept={(consent) => console.log('Accepted:', consent)}
        onReject={(consent) => console.log('Rejected:', consent)}
      />
    </div>
  )
}

export default bannerDemo;

export { useCookieConsent,CookieConsent }

