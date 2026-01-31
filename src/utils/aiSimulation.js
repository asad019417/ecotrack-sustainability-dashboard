/**
 * AI Simulation Logic for Carbon Footprint Calculation
 * 
 * This module simulates an AI-powered ESG analytics system that:
 * 1. Calculates carbon footprint using industry-standard emission factors
 * 2. Generates context-aware recommendations based on emission patterns
 * 
 * The simulation uses weighted emission factors based on GHG Protocol standards
 * to estimate total CO₂ equivalent emissions (tCO₂e).
 */

/**
 * Emission factors based on industry standards (GHG Protocol, IPCC)
 * These factors convert activity data (kWh, liters, kg) to carbon dioxide equivalent (tCO₂e)
 * 
 * Sources:
 * - Electricity: Average grid emission factor (varies by region, using global average)
 * - Fuel: Diesel/petrol combustion emission factor
 * - Waste: Landfill methane conversion factor
 */
const EMISSION_FACTORS = {
  electricity: 0.000233, // tCO₂e per kWh (global average grid mix)
  fuel: 2.68, // tCO₂e per liter (diesel/petrol combustion)
  waste: 0.0019 // tCO₂e per kg (landfill methane emissions)
}

/**
 * Calculate total carbon footprint based on input data
 * 
 * Simulation Steps:
 * 1. Parse input values (electricity, fuel, waste, supplier factor)
 * 2. Multiply each input by its corresponding emission factor
 * 3. Sum all emission sources to get total footprint
 * 4. Calculate percentage contribution of each source
 * 
 * @param {Object} formData - User input data containing:
 *   - electricity: Monthly electricity consumption in kWh
 *   - fuel: Fuel usage in liters
 *   - waste: Waste produced in kg
 *   - supplierFactor: Direct supplier emissions in tCO₂e
 * @returns {Object} Carbon footprint breakdown with totals and percentages
 */
export const calculateCarbonFootprint = (formData) => {
  // Step 1: Parse and validate input values (default to 0 if invalid)
  const electricity = parseFloat(formData.electricity) || 0
  const fuel = parseFloat(formData.fuel) || 0
  const waste = parseFloat(formData.waste) || 0
  const supplierFactor = parseFloat(formData.supplierFactor) || 0

  // Step 2: Calculate emissions from each source using emission factors
  // Formula: Activity Data × Emission Factor = Emissions (tCO₂e)
  const energyEmissions = electricity * EMISSION_FACTORS.electricity
  const transportEmissions = fuel * EMISSION_FACTORS.fuel
  const wasteEmissions = waste * EMISSION_FACTORS.waste
  const supplierEmissions = supplierFactor // Already in tCO₂e

  // Step 3: Calculate total carbon footprint (sum of all sources)
  // This represents the total monthly CO₂ equivalent emissions
  const total = energyEmissions + transportEmissions + wasteEmissions + supplierEmissions

  // Step 4: Calculate percentage shares for visualization
  // Each category's contribution to total emissions (for pie charts)
  const energyShare = total > 0 ? (energyEmissions / total) * 100 : 0
  const transportShare = total > 0 ? (transportEmissions / total) * 100 : 0
  const wasteShare = total > 0 ? (wasteEmissions / total) * 100 : 0
  const supplierShare = total > 0 ? (supplierEmissions / total) * 100 : 0

  return {
    total,
    energyEmissions,
    transportEmissions,
    wasteEmissions,
    supplierEmissions,
    energyShare,
    transportShare,
    wasteShare,
    supplierShare
  }
}

/**
 * Generate AI-powered recommendations based on analysis
 * 
 * This function simulates AI-driven recommendation generation by:
 * 1. Analyzing emission category percentages to identify hotspots
 * 2. Checking absolute values for significant impact areas
 * 3. Applying industry-specific knowledge
 * 4. Generating contextual, actionable recommendations
 * 
 * The AI simulation uses conditional logic to mimic how a real AI system
 * would identify patterns and suggest improvements.
 * 
 * @param {Object} formData - Original user input data
 * @param {Object} footprint - Calculated footprint with shares and totals
 * @returns {Array} Array of 2-3 recommendation objects with title, description, and impact
 */
export const generateRecommendations = (formData, footprint) => {
  const recommendations = []
  const electricity = parseFloat(formData.electricity) || 0
  const fuel = parseFloat(formData.fuel) || 0
  const waste = parseFloat(formData.waste) || 0
  const industry = formData.industry

  // AI Analysis Rule 1: High electricity consumption (>40% of total)
  // If energy is the dominant emission source, prioritize renewable energy solutions
  if (footprint.energyShare > 40) {
    recommendations.push({
      title: 'Switch to Renewable Energy Sources',
      description: 'Your energy consumption represents a significant portion of your carbon footprint. Consider transitioning to renewable energy suppliers or installing solar panels to reduce emissions by up to 20-30%.',
      impact: 'Reduce emissions by 20-30%'
    })
  } else if (footprint.energyShare > 20) {
    recommendations.push({
      title: 'Optimize Energy Usage with Smart Metering',
      description: 'Implement smart metering and energy-efficient practices to reduce your electricity consumption and associated emissions.',
      impact: 'Reduce emissions by 10-15%'
    })
  }

  // AI Analysis Rule 2: High transportation emissions (>40% of total)
  // If transport dominates, focus on fleet optimization and alternative fuels
  if (footprint.transportShare > 40) {
    recommendations.push({
      title: 'Optimize Transport Routes and Fleet',
      description: 'Transportation is your largest emission source. Consider route optimization software, switching to hybrid/electric vehicles, or consolidating deliveries to cut logistics emissions significantly.',
      impact: 'Reduce emissions by 25-35%'
    })
  } else if (footprint.transportShare > 20) {
    recommendations.push({
      title: 'Consider Hybrid or Electric Vehicles',
      description: 'Gradually transition your fleet to hybrid or electric vehicles to reduce fuel consumption and emissions.',
      impact: 'Reduce emissions by 15-25%'
    })
  }

  // AI Analysis Rule 3: High waste emissions (>30% of total or >1000kg)
  // If waste is significant, prioritize circular economy and waste reduction
  if (footprint.wasteShare > 30) {
    recommendations.push({
      title: 'Implement Circular Packaging Programs',
      description: 'Your waste production is contributing significantly to emissions. Implement circular economy principles, reduce packaging, and establish recycling programs to minimize waste.',
      impact: 'Reduce emissions by 20-30%'
    })
  } else if (waste > 1000) {
    recommendations.push({
      title: 'Enhance Waste Reduction Strategies',
      description: 'Focus on waste reduction at the source and improve recycling rates to lower your waste-related emissions.',
      impact: 'Reduce emissions by 10-15%'
    })
  }

  // AI Analysis Rule 4: Industry-specific recommendations
  // Apply sector-specific knowledge based on industry type
  // This simulates how real AI systems use domain expertise
  if (industry === 'Manufacturing') {
    recommendations.push({
      title: 'Adopt Lean Manufacturing Principles',
      description: 'As a manufacturing company, consider lean manufacturing principles to reduce energy consumption and waste production throughout your production process.',
      impact: 'Improve overall efficiency by 15-20%'
    })
  } else if (industry === 'IT Services') {
    recommendations.push({
      title: 'Optimize Data Center Efficiency',
      description: 'For IT services, focus on data center efficiency, cloud migration, and server virtualization to reduce energy consumption.',
      impact: 'Reduce energy costs by 20-30%'
    })
  } else if (industry === 'Retail') {
    recommendations.push({
      title: 'Implement Sustainable Supply Chain Practices',
      description: 'Work with suppliers to reduce upstream emissions and consider local sourcing to minimize transportation impacts.',
      impact: 'Reduce supply chain emissions by 15-25%'
    })
  }

  // AI Analysis Rule 5: Fallback recommendations
  // If specific recommendations are insufficient, add general best practices
  // This ensures users always receive actionable advice
  if (recommendations.length < 2) {
    recommendations.push({
      title: 'Establish Carbon Offsetting Programs',
      description: 'While working on emission reductions, consider investing in verified carbon offset projects to neutralize your remaining emissions.',
      impact: 'Achieve carbon neutrality'
    })
  }

  // Ensure minimum of 2 recommendations (AI best practice: provide multiple options)
  if (recommendations.length < 2) {
    recommendations.push({
      title: 'Conduct Regular Sustainability Audits',
      description: 'Regular monitoring and auditing of your sustainability metrics will help identify new opportunities for improvement and ensure compliance with ESG frameworks.',
      impact: 'Continuous improvement'
    })
  }

  // Return top 3 recommendations (AI output limit for clarity and focus)
  // Real AI systems often limit recommendations to avoid overwhelming users
  return recommendations.slice(0, 3)
}

