# Tooly - Advanced Calculator Suite

A modern, user-friendly calculator suite with interactive explanations and educational content. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🧮 Multiple Calculators:
  - Percentage Calculator
  - VAT Calculator
  - Currency Converter (with real-time exchange rates)
  - BMI Calculator
  - More coming soon!

- 🎨 Modern UI/UX:
  - Clean, responsive design
  - Dark mode support
  - Smooth animations
  - Interactive components

- 🔍 Smart Search:
  - Search across all calculators
  - Filter by calculator type
  - Tag-based search

- 📚 Educational Content:
  - Detailed explanations for each calculation
  - Interactive learning elements
  - Practical examples

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tooly.git
cd tooly
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```bash
NEXT_PUBLIC_EXCHANGE_RATE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technology Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context
- **Charts:** Chart.js with react-chartjs-2
- **Animations:** CSS animations with Tailwind
- **Testing:** Jest (coming soon)

## Project Structure

```
tooly/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   ├── calculators/  # Calculator components
│   │   └── layout/      # Layout components
│   └── lib/             # Utilities and contexts
├── public/              # Static files
└── ...config files
```

## Features in Development

- [ ] More calculators (Loan, Mortgage, Compound Interest, etc.)
- [ ] User accounts and saved calculations
- [ ] Mobile app version
- [ ] Offline support
- [ ] More visualization options
- [ ] Multi-language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
