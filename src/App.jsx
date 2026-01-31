import React, { useState, useEffect } from 'react'
import DataInputPanel from './components/DataInputPanel'
import AIResultsPanel from './components/AIResultsPanel'
import VisualAnalyticsDashboard from './components/VisualAnalyticsDashboard'
import RecentAnalysesSidebar from './components/RecentAnalysesSidebar'
import Footer from './components/Footer'
import { calculateCarbonFootprint, generateRecommendations } from './utils/aiSimulation'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    electricity: '',
    fuel: '',
    waste: '',
    supplierFactor: '',
    industry: 'Retail'
  })
  
  const [results, setResults] = useState(null)
  const [recentAnalyses, setRecentAnalyses] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Load recent analyses from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ecotrack_analyses')
    if (saved) {
      const parsed = JSON.parse(saved)
      setRecentAnalyses(parsed)
    }
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  /**
   * Handle the "Analyze Footprint" button click
   * Simulates AI processing workflow:
   * 1. Show loading state
   * 2. Calculate carbon footprint using emission factors
   * 3. Generate AI recommendations based on patterns
   * 4. Calculate industry benchmark (70-120% of average)
   * 5. Save results to localStorage
   * 6. Update UI with results
   */
  const handleAnalyze = () => {
    setIsAnalyzing(true)
    
    // Simulate AI processing delay (1.5 seconds to show "analyzing" state)
    setTimeout(() => {
      // Step 1: Calculate carbon footprint using weighted emission factors
      const footprint = calculateCarbonFootprint(formData)
      
      // Step 2: Generate context-aware AI recommendations
      const recommendations = generateRecommendations(formData, footprint)
      
      // Step 3: Simulate industry benchmark (random 70-120% of industry average)
      const benchmark = Math.random() * 50 + 70
      
      // Step 4: Compile complete analysis result
      const analysisResult = {
        ...footprint,
        recommendations,
        benchmark,
        timestamp: new Date().toISOString(),
        formData: { ...formData }
      }
      
      // Step 5: Update state with results
      setResults(analysisResult)
      
      // Step 6: Save to localStorage (keep only last 3 analyses)
      const updated = [analysisResult, ...recentAnalyses].slice(0, 3)
      setRecentAnalyses(updated)
      localStorage.setItem('ecotrack_analyses', JSON.stringify(updated))
      
      // Step 7: Hide loading state
      setIsAnalyzing(false)
    }, 1500)
  }

  const handleLoadAnalysis = (analysis) => {
    setFormData(analysis.formData)
    setResults(analysis)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="eco-icon">🌱</span>
            EcoTrack – AI Sustainability Dashboard
          </h1>
          <p className="app-subtitle">AI for Greener Business</p>
        </div>
      </header>

      <main className="app-main">
        <div className="main-container">
          <div className="left-panel">
            <DataInputPanel
              formData={formData}
              onInputChange={handleInputChange}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
            {isAnalyzing && (
              <div className="loading-panel">
                <div className="loading-spinner"></div>
                <p className="loading-message">EcoTrack AI is estimating your footprint…</p>
              </div>
            )}
            {results && !isAnalyzing && (
              <AIResultsPanel results={results} />
            )}
          </div>

          <div className="right-panel">
            <RecentAnalysesSidebar
              analyses={recentAnalyses}
              onLoadAnalysis={handleLoadAnalysis}
            />
            {results && (
              <VisualAnalyticsDashboard results={results} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App

