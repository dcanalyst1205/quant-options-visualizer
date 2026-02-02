# QuantOptions Visualizer

A professional-grade option pricing tool that calculates and visualizes European option prices using the Black-Scholes model, featuring real-time sensitivity analysis and a Bloomberg Terminal-inspired dark mode interface.

## 🔗 [Live Demo](https://quant-options-visualizer.vercel.app/)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🚀 Features

- **Black-Scholes Pricing Engine**: Calculate Call and Put option prices with precision
- **The Greeks**: Real-time visualization of Delta, Gamma, Theta, Vega, and Rho
- **Interactive Charts**: 
  - 2D price vs. spot price analysis
  - 3D-style heatmap showing time decay and spot price sensitivity
  - Greeks sensitivity curves
- **Professional UI**: Dark mode interface inspired by Bloomberg Terminal
- **Real-time Updates**: Instant recalculation as parameters change
- **Responsive Design**: Works seamlessly on desktop and mobile

## 📊 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **Math Library**: Custom implementation of normal distribution functions

## 🛠️ Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/dcanalyst1205/quant-options-visualizer.git
cd quant-options-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### Dashboard
1. Adjust market parameters using the input panel:
   - **Spot Price**: Current underlying asset price
   - **Strike Price**: Option strike price
   - **Time to Maturity**: Time until expiration (years)
   - **Volatility**: Annual volatility percentage
   - **Risk-Free Rate**: Annual risk-free interest rate

2. View real-time calculations and charts:
   - Call and Put option prices
   - Price vs. Spot Price curves
   - Time decay heatmap

### The Greeks
Navigate to the "Greeks" page to see how option sensitivities change with spot price:
- **Delta**: Rate of change of option price with respect to underlying price
- **Gamma**: Rate of change of Delta
- **Theta**: Time decay of option value
- **Vega**: Sensitivity to volatility changes

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🚢 Deployment

This project is deployed on Vercel: **[quant-options-visualizer.vercel.app](https://quant-options-visualizer.vercel.app/)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dcanalyst1205/quant-options-visualizer)

To deploy your own instance:
1. Fork this repository
2. Import your fork in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

## 🗺️ Roadmap

- [ ] Real-time market data integration (Yahoo Finance/Polygon.io)
- [ ] Multi-leg strategy builder (Straddles, Iron Condors)
- [ ] American options pricing (Binomial Trees)
- [ ] 3D volatility surface visualization
- [ ] User portfolio saving and sharing

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Hadi**
- GitHub: [@dcanalyst1205](https://github.com/dcanalyst1205)
- Project: [QuantOptions Visualizer](https://github.com/dcanalyst1205/quant-options-visualizer)

## 🙏 Acknowledgments

- Black-Scholes-Merton model for option pricing theory
- shadcn/ui for beautiful UI components
- Recharts for data visualization

---

⭐ If you found this project useful, please consider giving it a star!
