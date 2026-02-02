
/**
 * Black-Scholes Option Pricing Model & Greeks
 */

export interface HelperOptionData {
  S: number; // Spot Price
  K: number; // Strike Price
  T: number; // Time to Maturity (years)
  r: number; // Risk-free rate (decimal, e.g. 0.05 for 5%)
  sigma: number; // Volatility (decimal, e.g. 0.2 for 20%)
}

// Standard Normal PDF
const pdf = (x: number): number => {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
};

// Standard Normal CDF (Abramowitz & Stegun approximation)
const cdf = (x: number): number => {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014337 * Math.exp((-x * x) / 2);
  let p =
    d *
    t *
    (0.31938153 +
      t *
        (-0.356563782 +
          t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  if (x > 0) {
    p = 1 - p;
  }
  return p;
};

// d1 and d2 calculations
const calculateD1 = ({ S, K, T, r, sigma }: HelperOptionData): number => {
    if (sigma === 0 || T === 0) return 0; // Handle edge cases
    return (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * Math.sqrt(T));
};

const calculateD2 = (d1: number, T: number, sigma: number): number => {
    return d1 - sigma * Math.sqrt(T);
};

// Option Prices
export const calculateOptionPrice = (data: HelperOptionData, type: 'call' | 'put'): number => {
  const { S, K, T, r, sigma } = data;
  if (T <= 0) {
      if (type === 'call') return Math.max(0, S - K);
      return Math.max(0, K - S);
  }
  
  const d1 = calculateD1(data);
  const d2 = calculateD2(d1, T, sigma);

  if (type === 'call') {
    return S * cdf(d1) - K * Math.exp(-r * T) * cdf(d2);
  } else {
    return K * Math.exp(-r * T) * cdf(-d2) - S * cdf(-d1);
  }
};

// Greeks
export const calculateGreeks = (data: HelperOptionData) => {
    const { S, K, T, r, sigma } = data;
    const d1 = calculateD1(data);
    const d2 = calculateD2(d1, T, sigma);
    const sqrtT = Math.sqrt(T);
    const expMinusRT = Math.exp(-r * T);
    const q = 0; // Dividend yield assumed 0 for standard BS

    // Delta
    const deltaCall = cdf(d1);
    const deltaPut = deltaCall - 1;

    // Gamma (same for call and put)
    const gamma = pdf(d1) / (S * sigma * sqrtT);

    // Theta (annualized)
    // Theta Call
    const thetaCallTerm1 = -(S * pdf(d1) * sigma) / (2 * sqrtT);
    const thetaCallTerm2 = -r * K * expMinusRT * cdf(d2);
    const thetaCall = thetaCallTerm1 + thetaCallTerm2; 
    // Divide by 365 if we want daily, but standard is annual. We usually show annual or daily in UI.

    // Theta Put
    const thetaPutTerm2 = r * K * expMinusRT * cdf(-d2);
    const thetaPut = thetaCallTerm1 + thetaPutTerm2;

    // Vega (same for call and put)
    const vega = S * sqrtT * pdf(d1) / 100; // Divided by 100 to represent change per 1% vol change

    // Rho
    const rhoCall = K * T * expMinusRT * cdf(d2) / 100; // Divided by 100 for 1% rate change
    const rhoPut = -K * T * expMinusRT * cdf(-d2) / 100;

    return {
        delta: { call: deltaCall, put: deltaPut },
        gamma,
        theta: { call: thetaCall, put: thetaPut },
        vega,
        rho: { call: rhoCall, put: rhoPut }
    };
};
