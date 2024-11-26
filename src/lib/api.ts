const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY || ''

export async function fetchExchangeRates(base: string): Promise<Record<string, number>> {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`
    )
    const data = await response.json()
    return data.conversion_rates || {}
  } catch (error) {
    console.error('Error fetching exchange rates:', error)
    return {}
  }
}

export const commonCurrencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'NZD', name: 'New Zealand Dollar' },
]
