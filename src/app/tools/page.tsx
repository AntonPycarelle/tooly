'use client'

import { useSearch } from '@/lib/searchContext'
import { PercentageCalculator } from '@/components/calculators/PercentageCalculator'
import { VATCalculator } from '@/components/calculators/VATCalculator'
import { CurrencyConverter } from '@/components/calculators/CurrencyConverter'
import { BMICalculator } from '@/components/calculators/BMICalculator'

const CALCULATORS = [
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, find what percent one number is of another, and more.',
    component: PercentageCalculator,
    tags: ['math', 'percentage', 'basic'],
  },
  {
    id: 'vat',
    name: 'VAT Calculator',
    description: 'Calculate VAT amounts, add or remove VAT from prices.',
    component: VATCalculator,
    tags: ['business', 'tax', 'finance'],
  },
  {
    id: 'currency',
    name: 'Currency Converter',
    description: 'Convert between different currencies using real-time exchange rates.',
    component: CurrencyConverter,
    tags: ['finance', 'currency', 'exchange'],
  },
  {
    id: 'bmi',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) and understand what it means.',
    component: BMICalculator,
    tags: ['health', 'fitness', 'body'],
  },
]

export default function ToolsPage() {
  const { searchQuery } = useSearch()

  const filteredCalculators = CALCULATORS.filter(calc => {
    const searchLower = searchQuery.toLowerCase()
    return (
      calc.name.toLowerCase().includes(searchLower) ||
      calc.description.toLowerCase().includes(searchLower) ||
      calc.tags.some(tag => tag.includes(searchLower))
    )
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Calculator Tools
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Find the perfect calculator for your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCalculators.map((calc, index) => (
          <div
            key={calc.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {calc.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {calc.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {calc.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <calc.component />
            </div>
          </div>
        ))}
      </div>

      {filteredCalculators.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-300">
            No calculators found matching your search.
          </p>
        </div>
      )}
    </main>
  )
}
