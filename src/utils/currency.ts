/**
 * Nepali Number and Currency Formatting Utilities
 * Uses Indian numbering system (lakhs, crores) with रू symbol
 */

/**
 * Format number in Nepali/Indian style
 * Example: 1000000 -> "10,00,000" (ten lakh)
 * Example: 10000000 -> "1,00,00,000" (one crore)
 */
export function formatNepaliNumber(num: number): string {
  if (num === null || num === undefined || isNaN(num)) return '0';
  
  const isNegative = num < 0;
  const absNum = Math.abs(num);
  
  // Convert to string and split into integer and decimal parts
  const parts = absNum.toString().split('.');
  let integerPart = parts[0];
  const decimalPart = parts[1] || '';
  
  // If number is less than 1000, no commas needed
  if (integerPart.length <= 3) {
    return (isNegative ? '-' : '') + integerPart + (decimalPart ? '.' + decimalPart : '');
  }
  
  // First 3 digits from right
  const lastThree = integerPart.slice(-3);
  const remaining = integerPart.slice(0, -3);
  
  // Add commas every 2 digits in the remaining part
  const withCommas = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  
  const formatted = withCommas + ',' + lastThree + (decimalPart ? '.' + decimalPart : '');
  
  return (isNegative ? '-' : '') + formatted;
}

/**
 * Format currency in Nepali Rupees
 * Example: 1000000 -> "रू 10,00,000"
 * Example: 1234.56 -> "रू 1,234.56"
 */
export function formatNepaliCurrency(amount: number, decimals: number = 0): string {
  if (amount === null || amount === undefined || isNaN(amount)) return 'रू 0';
  
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  
  // Round to specified decimals
  const rounded = decimals > 0 
    ? Number(absAmount.toFixed(decimals))
    : Math.round(absAmount);
  
  const formatted = formatNepaliNumber(rounded);
  
  return (isNegative ? '-' : '') + 'रू ' + formatted;
}

/**
 * Format currency with "NPR" prefix (alternative format)
 * Example: 1000000 -> "NPR 10,00,000"
 */
export function formatNPR(amount: number, decimals: number = 0): string {
  if (amount === null || amount === undefined || isNaN(amount)) return 'NPR 0';
  
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  
  const rounded = decimals > 0 
    ? Number(absAmount.toFixed(decimals))
    : Math.round(absAmount);
  
  const formatted = formatNepaliNumber(rounded);
  
  return (isNegative ? '-' : '') + 'NPR ' + formatted;
}

/**
 * Format currency with decimals
 * Example: 1234.56 -> "रू 1,234.56"
 */
export function formatNepaliCurrencyWithDecimals(amount: number): string {
  return formatNepaliCurrency(amount, 2);
}

/**
 * Convert number to Nepali words (optional utility)
 * Example: 1000000 -> "Ten Lakh"
 */
export function numberToNepaliWords(num: number): string {
  if (num === 0) return 'Zero';
  
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
                'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 
                'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  function convertLessThanThousand(n: number): string {
    if (n === 0) return '';
    
    let result = '';
    
    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    
    if (n >= 20) {
      result += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    }
    
    if (n > 0) {
      result += ones[n] + ' ';
    }
    
    return result;
  }
  
  let result = '';
  
  if (num >= 10000000) { // Crore
    result += convertLessThanThousand(Math.floor(num / 10000000)) + 'Crore ';
    num %= 10000000;
  }
  
  if (num >= 100000) { // Lakh
    result += convertLessThanThousand(Math.floor(num / 100000)) + 'Lakh ';
    num %= 100000;
  }
  
  if (num >= 1000) { // Thousand
    result += convertLessThanThousand(Math.floor(num / 1000)) + 'Thousand ';
    num %= 1000;
  }
  
  if (num > 0) {
    result += convertLessThanThousand(num);
  }
  
  return result.trim();
}
