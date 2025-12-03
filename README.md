# GST / Sales Tax Calculator

A modern, production-ready React application for calculating GST and sales tax with both forward and reverse calculation modes.

## Features

### Core Functionality
- **Forward Tax Calculation**: Add tax to a base amount to calculate the total price
- **Reverse Tax Extraction**: Extract base price and tax from a tax-inclusive amount
- **Multiple Currencies**: Support for ₹ (INR), $ (USD), £ (GBP), and € (EUR)
- **Preset Tax Rates**: Quick selection of common rates (5%, 12%, 18%, 28%)
- **Custom Tax Rate**: Enter any custom tax rate
- **Real-time Validation**: Input validation for negative values and non-numeric entries
- **Currency Formatting**: Auto-formatted currency values

### UI Features
- **Modern Design**: Clean, professional interface with gradient accents
- **Dark Mode**: Toggle between light and dark themes
- **Fully Responsive**: Mobile-first design that works on all screen sizes
- **Visual Feedback**: Clear display of calculation formulas and results
- **Interactive Components**: Smooth transitions and hover states

## Installation

```bash
npm install
```

## Running the Application

```bash
npm run dev
```

The application will start on `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── NumericInput.tsx       # Reusable numeric input with validation
│   ├── SelectTaxRate.tsx      # Tax rate selector with preset and custom options
│   ├── ToggleMode.tsx         # Forward/Reverse calculation mode toggle
│   ├── ResultCard.tsx         # Displays calculation results
│   ├── CurrencySelector.tsx   # Currency selection dropdown
│   └── ThemeToggle.tsx        # Light/Dark mode toggle
├── utils/
│   └── taxCalculator.ts       # Tax calculation logic and utilities
├── config/
│   └── currencies.ts          # Currency and tax rate configuration
├── App.tsx                    # Main application component
└── main.tsx                   # Application entry point
```

## Usage Examples

### Forward Tax Calculation
1. Select "Add Tax" mode
2. Enter base amount (e.g., 100)
3. Select currency and tax rate (e.g., 18%)
4. Click "Calculate"
5. View results:
   - Base Price: ₹100.00
   - Tax Amount: ₹18.00
   - Total Payable: ₹118.00

### Reverse Tax Extraction
1. Select "Extract Tax" mode
2. Enter total amount including tax (e.g., 118)
3. Select currency and tax rate (e.g., 18%)
4. Click "Calculate"
5. View results:
   - Total Price (Input): ₹118.00
   - Extracted Tax: ₹18.00
   - Base Amount (Before Tax): ₹100.00

## Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast build tool
- **Lucide React**: Beautiful icon set

## Key Components

### NumericInput
Reusable input component with:
- Numeric validation
- Currency prefix support
- Error messaging
- Focus states

### SelectTaxRate
Tax rate selector with:
- Preset rate buttons
- Custom rate input
- Visual selection feedback

### ToggleMode
Calculation mode switcher with:
- Forward/Reverse modes
- Descriptive icons
- Help text

### ResultCard
Results display with:
- Formatted currency values
- Calculation breakdown
- Formula explanation
- Visual hierarchy

## Validation Rules

- Only numeric input allowed
- No negative values
- Decimal values supported
- Empty input validation
- Real-time error feedback

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
