'use client'

import { useState } from 'react'
import { Chart } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type Unit = 'metric' | 'imperial'

export function BMICalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState<Unit>('metric')
  const [bmi, setBmi] = useState<number | null>(null)

  const calculateBMI = () => {
    const h = parseFloat(height)
    const w = parseFloat(weight)

    if (isNaN(h) || isNaN(w)) {
      setBmi(null)
      return
    }

    let bmiValue: number
    if (unit === 'metric') {
      // Height in meters, weight in kg
      bmiValue = w / ((h / 100) * (h / 100))
    } else {
      // Height in inches, weight in pounds
      bmiValue = (w / (h * h)) * 703
    }

    setBmi(Math.round(bmiValue * 10) / 10)
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' }
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-500' }
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500' }
    return { category: 'Obese', color: 'text-red-500' }
  }

  const chartData = {
    labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
    datasets: [
      {
        label: 'BMI Range',
        data: [16, 18.5, 25, 30, 35],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        borderColor: 'rgba(0,0,0,0.1)',
        fill: false,
      },
    ],
  }

  return (
    <div className="calculator-card">
      <h2 className="text-2xl font-semibold mb-4">BMI Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Unit System</label>
          <select
            className="calculator-input"
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
          >
            <option value="metric">Metric (cm, kg)</option>
            <option value="imperial">Imperial (in, lbs)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Height ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <input
            type="number"
            className="calculator-input"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value)
              calculateBMI()
            }}
            placeholder={`Enter height in ${unit === 'metric' ? 'centimeters' : 'inches'}`}
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <input
            type="number"
            className="calculator-input"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value)
              calculateBMI()
            }}
            placeholder={`Enter weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
            step="0.1"
          />
        </div>

        {bmi !== null && (
          <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900 rounded-lg">
            <p className="text-lg font-medium">
              Your BMI: <span className={getBMICategory(bmi).color}>{bmi}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Category: {getBMICategory(bmi).category}
            </p>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">BMI Categories</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-500">Underweight</span>
              <span>&lt; 18.5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-500">Normal weight</span>
              <span>18.5 - 24.9</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-500">Overweight</span>
              <span>25 - 29.9</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-500">Obese</span>
              <span>&gt; 30</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">How BMI is Calculated</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {unit === 'metric'
              ? 'BMI = weight (kg) / (height (m))²'
              : 'BMI = (weight (lbs) / (height (inches))²) × 703'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Note: BMI is a general indicator and may not be accurate for athletes,
            elderly, or pregnant women.
          </p>
        </div>
      </div>
    </div>
  )
}
