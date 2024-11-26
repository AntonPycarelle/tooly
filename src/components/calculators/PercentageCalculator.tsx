'use client'

import { useState } from 'react'

export function PercentageCalculator() {
  const [number, setNumber] = useState('')
  const [percentage, setPercentage] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [mode, setMode] = useState<'percentage-of' | 'is-what-percentage'>('percentage-of')

  const calculateResult = () => {
    const num = parseFloat(number)
    const pct = parseFloat(percentage)

    if (isNaN(num) || isNaN(pct)) {
      setResult(null)
      return
    }

    if (mode === 'percentage-of') {
      setResult((num * pct) / 100)
    } else {
      setResult((num / pct) * 100)
    }
  }

  return (
    <div className="calculator-card">
      <h2 className="text-2xl font-semibold mb-4">Percentage Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Mode</label>
          <select
            className="calculator-input"
            value={mode}
            onChange={(e) => setMode(e.target.value as typeof mode)}
          >
            <option value="percentage-of">Calculate percentage of a number</option>
            <option value="is-what-percentage">What percentage is X of Y?</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {mode === 'percentage-of' ? 'Number' : 'X (First Number)'}
          </label>
          <input
            type="number"
            className="calculator-input"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value)
              calculateResult()
            }}
            placeholder="Enter a number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {mode === 'percentage-of' ? 'Percentage' : 'Y (Second Number)'}
          </label>
          <input
            type="number"
            className="calculator-input"
            value={percentage}
            onChange={(e) => {
              setPercentage(e.target.value)
              calculateResult()
            }}
            placeholder={mode === 'percentage-of' ? 'Enter percentage' : 'Enter second number'}
          />
        </div>

        {result !== null && (
          <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900 rounded-lg">
            <p className="text-lg font-medium">
              {mode === 'percentage-of'
                ? `${percentage}% of ${number} = ${result.toFixed(2)}`
                : `${number} is ${result.toFixed(2)}% of ${percentage}`}
            </p>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">How it works</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {mode === 'percentage-of'
              ? 'To calculate a percentage of a number, multiply the number by the percentage and divide by 100.'
              : 'To find what percentage X is of Y, divide X by Y and multiply by 100.'}
          </p>
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <code className="text-sm">
              {mode === 'percentage-of'
                ? `Formula: (number × percentage) ÷ 100`
                : `Formula: (X ÷ Y) × 100`}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
