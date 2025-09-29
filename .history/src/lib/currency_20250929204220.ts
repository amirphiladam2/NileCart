// Currency utilities for South Sudanese Pound (SSP)
export const CURRENCY_SYMBOL = 'SSP';
export const CURRENCY_CODE = 'SSP';

// Exchange rates (approximate - you should update these with current rates)
const EXCHANGE_RATES = {
  USD: 1,
  SSP: 0.0015, // 1 USD ≈ 667 SSP (approximate)
};

export const formatCurrency = (amount: number, currency: string = CURRENCY_SYMBOL): string => {
  if (currency === CURRENCY_SYMBOL) {
    // Format for South Sudanese Pound
    return `${CURRENCY_SYMBOL} ${Math.round(amount).toLocaleString()}`;
  }
  
  // Format for USD (fallback)
  return `$${amount.toFixed(2)}`;
};

export const convertToSSP = (usdAmount: number): number => {
  return usdAmount / EXCHANGE_RATES.SSP;
};

export const convertToUSD = (sspAmount: number): number => {
  return sspAmount * EXCHANGE_RATES.SSP;
};

// Sample products with SSP pricing
export const getSSPPrice = (usdPrice: number): number => {
  return Math.round(convertToSSP(usdPrice));
};
