'use client'

import { useState, useEffect } from 'react'
import { fetchExchangeRates, commonCurrencies } from '@/lib/api'

export function CurrencyConverter() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadExchangeRates = async () => {
      setLoading(true)
      setError('')
      try {
        const rates = await fetchExchangeRates(fromCurrency)
        setExchangeRates(rates)
      } catch (err) {
        setError('Failed to fetch exchange rates')
      }
      setLoading(false)
    }

    loadExchangeRates()
  }, [fromCurrency])

  const convertAmount = () => {
    if (!amount || !exchangeRates[toCurrency]) return null

    const rate = exchangeRates[toCurrency]
    const result = parseFloat(amount) * rate
    return result.toFixed(2)
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const result = convertAmount()

  return (
    <div className="calculator-card">
      <h2 className="text-2xl font-semibold mb-4">Currency Converter</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            className="calculator-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            step="0.01"
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <select
              className="calculator-input"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {commonCurrencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="mt-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={handleSwapCurrencies}
            title="Swap currencies"
          >
            ⇄
          </button>

          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <select
              className="calculator-input"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {commonCurrencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && (
          <div className="text-center text-gray-600 dark:text-gray-400">
            Loading exchange rates...
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {result && !loading && !error && (
          <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900 rounded-lg">
            <div className="text-lg font-medium text-center">
              {amount} {fromCurrency} = {result} {toCurrency}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
              1 {fromCurrency} = {exchangeRates[toCurrency]?.toFixed(4)} {toCurrency}
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">About Currency Conversion</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Currency conversion uses real-time exchange rates to convert between different currencies.
            The rates are updated regularly throughout the day to reflect current market conditions.
          </p>
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <code className="text-sm">
              Formula: Amount × Exchange Rate
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
