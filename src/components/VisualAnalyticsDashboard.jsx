import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Filler
} from 'chart.js'
import { Pie, Line, Bar } from 'react-chartjs-2'
import './VisualAnalyticsDashboard.css'

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Filler
)

const VisualAnalyticsDashboard = ({ results }) => {
  if (!results) return null

  // Prepare pie chart data for emission category distribution
  const pieData = {
    labels: ['Energy', 'Transportation', 'Waste', 'Suppliers'],
    datasets: [
      {
        label: 'Emission Share (%)',
        data: [
          results.energyShare,
          results.transportShare,
          results.wasteShare,
          results.supplierShare
        ],
        backgroundColor: [
          '#4CAF50',
          '#009688',
          '#81C784',
          '#66BB6A'
        ],
        borderColor: [
          '#2E7D32',
          '#00695C',
          '#66BB6A',
          '#4CAF50'
        ],
        borderWidth: 2,
        hoverOffset: 8
      }
    ]
  }

  // Generate mock monthly trend data (simulated historical data)
  const monthlyTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Emissions (tCO₂e)',
        data: [
          results.total * 0.85,
          results.total * 0.92,
          results.total * 0.88,
          results.total * 0.95,
          results.total * 0.90,
          results.total
        ],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#4CAF50',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  }

  // Industry comparison data (bar chart)
  const industryComparisonData = {
    labels: ['Your Company', 'Industry Avg', 'Best in Class'],
    datasets: [
      {
        label: 'Emissions (tCO₂e)',
        data: [
          results.total,
          results.total / (results.benchmark / 100),
          results.total * 0.7
        ],
        backgroundColor: [
          '#009688',
          '#81C784',
          '#4CAF50'
        ],
        borderColor: [
          '#00695C',
          '#66BB6A',
          '#2E7D32'
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  }

  // Common chart options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 15,
          font: {
            family: 'Inter',
            size: 12,
            weight: '500'
          },
          color: '#1A1A1A'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          family: 'Inter',
          size: 14,
          weight: '600'
        },
        bodyFont: {
          family: 'Inter',
          size: 13
        },
        cornerRadius: 8,
        displayColors: true
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  }

  const pieOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        ...commonOptions.plugins.legend,
        position: 'bottom'
      },
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.parsed || 0
            return `${label}: ${value.toFixed(2)}%`
          }
        }
      }
    }
  }

  const lineOptions = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toFixed(2) + ' tCO₂e'
          },
          font: {
            family: 'Inter',
            size: 11
          },
          color: '#666'
        },
        grid: {
          color: '#E0E0E0',
          drawBorder: false
        }
      },
      x: {
        ticks: {
          font: {
            family: 'Inter',
            size: 11
          },
          color: '#666'
        },
        grid: {
          display: false
        }
      }
    }
  }

  const barOptions = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toFixed(2) + ' tCO₂e'
          },
          font: {
            family: 'Inter',
            size: 11
          },
          color: '#666'
        },
        grid: {
          color: '#E0E0E0',
          drawBorder: false
        }
      },
      x: {
        ticks: {
          font: {
            family: 'Inter',
            size: 11
          },
          color: '#666'
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      ...commonOptions.plugins,
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: function(context) {
            return `Emissions: ${context.parsed.y.toFixed(2)} tCO₂e`
          }
        }
      }
    }
  }

  return (
    <div className="visual-analytics-dashboard">
      <div className="dashboard-header">
        <h2>📈 Visual Analytics Dashboard</h2>
        <p>Interactive charts and trends</p>
      </div>

      <div className="charts-container">
        <div className="chart-section">
          <h3>Emission Category Distribution</h3>
          <div className="chart-wrapper">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <div className="chart-section">
          <h3>Monthly Emission Trend</h3>
          <div className="chart-wrapper">
            <Line data={monthlyTrendData} options={lineOptions} />
          </div>
        </div>

        <div className="chart-section">
          <h3>Industry Benchmark Comparison</h3>
          <div className="chart-wrapper">
            <Bar data={industryComparisonData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisualAnalyticsDashboard
