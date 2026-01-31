import React from 'react'
import './AIResultsPanel.css'

const AIResultsPanel = ({ results }) => {
  if (!results) return null

  const formatNumber = (num) => {
    return typeof num === 'number' ? num.toFixed(2) : '0.00'
  }

  return (
    <div className="ai-results-panel">
      <div className="panel-header">
        <h2>🤖 AI Analysis Results</h2>
        <p>Your carbon footprint breakdown and insights</p>
      </div>

      <div className="results-content">
        <div className="main-metric">
          <div className="metric-card primary">
            <div className="metric-label">Total Carbon Footprint</div>
            <div className="metric-value">{formatNumber(results.total)} tCO₂e/month</div>
            <div className="metric-subtitle">Carbon Dioxide Equivalent</div>
          </div>
        </div>

        <div className="emission-breakdown">
          <h3>Emission Breakdown</h3>
          <div className="breakdown-grid">
            <div className="metric-card">
              <div className="metric-icon">⚡</div>
              <div className="metric-label">Energy</div>
              <div className="metric-value">{formatNumber(results.energyShare)}%</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">🚚</div>
              <div className="metric-label">Transportation</div>
              <div className="metric-value">{formatNumber(results.transportShare)}%</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">♻️</div>
              <div className="metric-label">Waste</div>
              <div className="metric-value">{formatNumber(results.wasteShare)}%</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">🏭</div>
              <div className="metric-label">Suppliers</div>
              <div className="metric-value">{formatNumber(results.supplierShare)}%</div>
            </div>
          </div>
        </div>

        <div className="benchmark-section">
          <h3>Industry Benchmark</h3>
          <div className="benchmark-card">
            <div className="benchmark-label">Your Performance</div>
            <div className="benchmark-value">{formatNumber(results.benchmark)}%</div>
            <div className="benchmark-subtitle">of industry average</div>
            <div className={`benchmark-status ${results.benchmark < 100 ? 'good' : 'needs-improvement'}`}>
              {results.benchmark < 100 ? '✓ Below Average (Better)' : '⚠ Above Average (Needs Improvement)'}
            </div>
          </div>
        </div>

        <div className="recommendations-section">
          <h3>
            <span className="eco-icon">🌱</span>
            AI Recommendations
          </h3>
          <div className="recommendations-list">
            {results.recommendations.map((rec, index) => (
              <div key={index} className="recommendation-card">
                <div className="recommendation-number">{index + 1}</div>
                <div className="recommendation-content">
                  <div className="recommendation-title">{rec.title}</div>
                  <div className="recommendation-description">{rec.description}</div>
                  {rec.impact && (
                    <div className="recommendation-impact">
                      Potential Impact: {rec.impact}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIResultsPanel



