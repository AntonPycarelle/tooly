'use client'

import { useState, useEffect } from 'react'

export function VATCalculator() {
  const [amount, setAmount] = useState('')
  const [vatRate, setVatRate] = useState('20')
  const [mode, setMode] = useState<'add' | 'remove'>('add')
  const [results, setResults] = useState<{
    originalAmount: number
    vatAmount: number
    totalAmount: number
  } | null>(null)

  const commonVatRates = ['5', '12.5', '20', '25']

  const calculateVAT = () => {
    const numAmount = parseFloat(amount)
    const rate = parseFloat(vatRate)

    if (isNaN(numAmount) || isNaN(rate)) {
      setResults(null)
      return
    }

    if (mode === 'add') {
      const vatAmount = (numAmount * rate) / 100
      setResults({
        originalAmount: numAmount,
        vatAmount,
        totalAmount: numAmount + vatAmount,
      })
    } else {
      const originalAmount = (numAmount * 100) / (100 + rate)
      const vatAmount = numAmount - originalAmount
      setResults({
        originalAmount,
        vatAmount,
        totalAmount: numAmount,
      })
    }
  }

  useEffect(() => {
    calculateVAT()
  }, [amount, vatRate, mode])

  return (
    <div className="calculator-card">
      <h2 className="text-2xl font-semibold mb-4">VAT Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Mode</label>
          <select
            className="calculator-input"
            value={mode}
            onChange={(e) => setMode(e.target.value as 'add' | 'remove')}
          >
            <option value="add">Add VAT</option>
            <option value="remove">Remove VAT</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {mode === 'add' ? 'Amount (excl. VAT)' : 'Amount (incl. VAT)'}
          </label>
          <input
            type="number"
            className="calculator-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">VAT Rate (%)</label>
          <div className="flex gap-2">
            <input
              type="number"
              className="calculator-input flex-1"
              value={vatRate}
              onChange={(e) => setVatRate(e.target.value)}
              placeholder="Enter VAT rate"
              step="0.1"
            />
            <div className="flex gap-1">
              {commonVatRates.map((rate) => (
                <button
                  key={rate}
                  className="px-2 py-1 text-sm border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setVatRate(rate)}
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {results && (
          <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>Original Amount:</span>
              <span>£{results.originalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT Amount:</span>
              <span>£{results.vatAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Amount:</span>
              <span>£{results.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">How VAT works</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {mode === 'add'
              ? 'To add VAT, multiply the original amount by the VAT rate and divide by 100, then add this to the original amount.'
              : 'To remove VAT, divide the total amount by (1 + VAT rate/100) to get the original amount.'}
          </p>
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <code className="text-sm">
              {mode === 'add'
                ? `Formula: Original + (Original × VAT Rate ÷ 100)`
                : `Formula: Total ÷ (1 + VAT Rate ÷ 100)`}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
