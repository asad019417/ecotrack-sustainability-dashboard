import React from 'react'
import './DataInputPanel.css'

/**
 * DataInputPanel Component
 * 
 * Handles user input for sustainability metrics:
 * - Electricity consumption (kWh)
 * - Fuel usage (liters)
 * - Waste production (kg)
 * - Supplier emission factor (tCO₂e)
 * - Industry type selection
 * 
 * On form submission, triggers AI analysis workflow
 */
const DataInputPanel = ({ formData, onInputChange, onAnalyze, isAnalyzing }) => {
  // Available industry types for benchmarking
  const industries = [
    'Retail',
    'Manufacturing',
    'IT Services',
    'Transport & Logistics',
    'Food & Beverage',
    'Healthcare',
    'Construction',
    'Energy'
  ]

  /**
   * Handle form submission
   * Prevents default form behavior and triggers AI analysis
   * Disabled during analysis to prevent duplicate requests
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isAnalyzing) {
      onAnalyze() // Trigger AI simulation workflow in parent component
    }
  }

  return (
    <div className="data-input-panel">
      <div className="panel-header">
        <h2>📊 Data Input Panel</h2>
        <p>Enter your sustainability metrics to analyze your carbon footprint</p>
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <div className="form-group">
          <label htmlFor="electricity">
            <span className="icon">⚡</span>
            Monthly Electricity (kWh)
          </label>
          <input
            type="number"
            id="electricity"
            value={formData.electricity}
            onChange={(e) => onInputChange('electricity', e.target.value)}
            placeholder="e.g., 5000"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fuel">
            <span className="icon">🚚</span>
            Fuel Usage (liters)
          </label>
          <input
            type="number"
            id="fuel"
            value={formData.fuel}
            onChange={(e) => onInputChange('fuel', e.target.value)}
            placeholder="e.g., 2000"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="waste">
            <span className="icon">♻️</span>
            Waste Produced (kg)
          </label>
          <input
            type="number"
            id="waste"
            value={formData.waste}
            onChange={(e) => onInputChange('waste', e.target.value)}
            placeholder="e.g., 1500"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="supplierFactor">
            <span className="icon">🏭</span>
            Supplier Emission Factor (tCO₂e)
          </label>
          <input
            type="number"
            id="supplierFactor"
            value={formData.supplierFactor}
            onChange={(e) => onInputChange('supplierFactor', e.target.value)}
            placeholder="e.g., 2.5"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">
            <span className="icon">🏢</span>
            Industry Type
          </label>
          <select
            id="industry"
            value={formData.industry}
            onChange={(e) => onInputChange('industry', e.target.value)}
            required
          >
            {industries.map(industry => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="analyze-button"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            <>
              <span>🔍</span>
              Analyze Footprint
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default DataInputPanel

