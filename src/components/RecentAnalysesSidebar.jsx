import React from 'react'
import './RecentAnalysesSidebar.css'

/**
 * RecentAnalysesSidebar Component
 * 
 * Displays the last 3 analyses stored in localStorage
 * Allows users to quickly reload previous analysis results
 * 
 * Features:
 * - Shows timestamp (relative time: "5m ago", "2h ago", etc.)
 * - Displays key metrics (footprint, industry, benchmark)
 * - Click-to-reload functionality
 * - Empty state when no analyses exist
 */
const RecentAnalysesSidebar = ({ analyses, onLoadAnalysis }) => {
  if (analyses.length === 0) {
    return (
      <div className="recent-analyses-sidebar">
        <div className="sidebar-header">
          <h2>📋 Recent Analyses</h2>
        </div>
        <div className="empty-state">
          <p>No recent analyses yet.</p>
          <p className="empty-subtitle">Run your first analysis to see results here!</p>
        </div>
      </div>
    )
  }

  /**
   * Format timestamp to relative time (e.g., "5m ago", "2h ago")
   * Provides user-friendly time display for recent analyses
   */
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="recent-analyses-sidebar">
      <div className="sidebar-header">
        <h2>📋 Recent Analyses</h2>
        <p>Click to reload previous results</p>
      </div>

      <div className="analyses-list">
        {analyses.map((analysis, index) => (
          <div
            key={index}
            className="analysis-item"
            onClick={() => onLoadAnalysis(analysis)}
          >
            <div className="analysis-header">
              <div className="analysis-number">#{index + 1}</div>
              <div className="analysis-time">{formatDate(analysis.timestamp)}</div>
            </div>
            <div className="analysis-metrics">
              <div className="metric-row">
                <span className="metric-label">Footprint:</span>
                <span className="metric-value">{analysis.total.toFixed(2)} tCO₂e</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Industry:</span>
                <span className="metric-value">{analysis.formData.industry}</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Benchmark:</span>
                <span className={`metric-value ${analysis.benchmark < 100 ? 'good' : 'warning'}`}>
                  {analysis.benchmark.toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="analysis-footer">
              <span className="click-hint">Click to load →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentAnalysesSidebar

