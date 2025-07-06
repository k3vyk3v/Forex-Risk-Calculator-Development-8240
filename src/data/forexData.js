// Pip Value Tables for different account currencies
export const pipValueTables = {
  USD: {
    'EUR/USD': 10.00,
    'GBP/USD': 10.00,
    'AUD/USD': 10.00,
    'NZD/USD': 10.00,
    'USD/CAD': 7.50,
    'USD/JPY': 9.00,
    'EUR/JPY': 6.50,
    'GBP/JPY': 8.00
  },
  EUR: {
    'EUR/USD': 8.50,
    'GBP/USD': 8.50,
    'AUD/USD': 8.50,
    'NZD/USD': 8.50,
    'USD/CAD': 6.50,
    'USD/JPY': 7.50,
    'EUR/JPY': 10.00,
    'GBP/JPY': 7.00
  },
  GBP: {
    'EUR/USD': 7.50,
    'GBP/USD': 7.50,
    'AUD/USD': 7.50,
    'NZD/USD': 7.50,
    'USD/CAD': 5.50,
    'USD/JPY': 6.50,
    'EUR/JPY': 5.50,
    'GBP/JPY': 10.00
  }
};

// Stop Loss Recommendations based on risk level and currency pair
export const stopLossRecommendations = {
  beginner: {
    'EUR/USD': { min: 40, max: 60, message: 'Wider stops help avoid market noise while learning' },
    'GBP/USD': { min: 40, max: 60, message: 'Wider stops help avoid market noise while learning' },
    'AUD/USD': { min: 40, max: 60, message: 'Wider stops help avoid market noise while learning' },
    'NZD/USD': { min: 40, max: 60, message: 'Wider stops help avoid market noise while learning' },
    'USD/CAD': { min: 40, max: 60, message: 'Wider stops help avoid market noise while learning' },
    'USD/JPY': { min: 35, max: 50, message: 'Wider stops help avoid market noise while learning' },
    'EUR/JPY': { min: 60, max: 80, message: 'Cross pairs need wider stops due to volatility' },
    'GBP/JPY': { min: 60, max: 80, message: 'Cross pairs need wider stops due to volatility' }
  },
  experienced: {
    'EUR/USD': { min: 25, max: 40, message: 'Tighter stops with improved entry timing' },
    'GBP/USD': { min: 25, max: 40, message: 'Tighter stops with improved entry timing' },
    'AUD/USD': { min: 25, max: 40, message: 'Tighter stops with improved entry timing' },
    'NZD/USD': { min: 25, max: 40, message: 'Tighter stops with improved entry timing' },
    'USD/CAD': { min: 25, max: 40, message: 'Tighter stops with improved entry timing' },
    'USD/JPY': { min: 20, max: 35, message: 'Tighter stops with improved entry timing' },
    'EUR/JPY': { min: 40, max: 60, message: 'Moderate stops for cross pair volatility' },
    'GBP/JPY': { min: 40, max: 60, message: 'Moderate stops for cross pair volatility' }
  },
  expert: {
    'EUR/USD': { min: 15, max: 30, message: 'Precision entries allow tighter risk management' },
    'GBP/USD': { min: 15, max: 30, message: 'Precision entries allow tighter risk management' },
    'AUD/USD': { min: 15, max: 30, message: 'Precision entries allow tighter risk management' },
    'NZD/USD': { min: 15, max: 30, message: 'Precision entries allow tighter risk management' },
    'USD/CAD': { min: 15, max: 30, message: 'Precision entries allow tighter risk management' },
    'USD/JPY': { min: 10, max: 25, message: 'Precision entries allow tighter risk management' },
    'EUR/JPY': { min: 25, max: 45, message: 'Tight stops for experienced cross pair trading' },
    'GBP/JPY': { min: 25, max: 45, message: 'Tight stops for experienced cross pair trading' }
  }
};

// Currency Pairs Configuration
export const currencyPairs = [
  { value: 'EUR/USD', label: 'EUR/USD', category: 'major' },
  { value: 'GBP/USD', label: 'GBP/USD', category: 'major' },
  { value: 'USD/JPY', label: 'USD/JPY', category: 'major' },
  { value: 'AUD/USD', label: 'AUD/USD', category: 'major' },
  { value: 'USD/CAD', label: 'USD/CAD', category: 'major' },
  { value: 'NZD/USD', label: 'NZD/USD', category: 'major' },
  { value: 'GBP/JPY', label: 'GBP/JPY', category: 'cross' },
  { value: 'EUR/JPY', label: 'EUR/JPY', category: 'cross' }
];

// Risk Level Configuration
export const riskLevels = {
  beginner: {
    range: [0, 1],
    label: 'Beginner Safe Zone',
    color: 'green',
    description: 'Recommended for new traders learning risk management'
  },
  experienced: {
    range: [1, 2],
    label: 'Experienced Traders Only',
    color: 'yellow',
    description: 'For traders with proven track record and experience'
  },
  expert: {
    range: [2, 100],
    label: 'Expert/High Risk',
    color: 'red',
    description: 'Only for highly experienced traders with solid risk management'
  }
};

// Educational Content
export const educationalContent = {
  riskManagement: {
    title: 'Risk Management Fundamentals',
    points: [
      'Never risk more than you can afford to lose',
      'Most profitable traders risk 0.5-2% per trade maximum',
      'Risk management is more important than perfect analysis',
      'Always use stop losses to limit downside',
      'Keep detailed trading records for analysis'
    ]
  },
  stopLossGuidelines: {
    title: 'Stop Loss Best Practices',
    points: [
      'Use technical levels (support/resistance) when possible',
      'Wider stops help avoid market noise while learning',
      'Tighter stops require more precise entry timing',
      'Consider overall market volatility',
      'Cross pairs typically need wider stops'
    ]
  },
  positionSizing: {
    title: 'Position Sizing Guidelines',
    points: [
      'Position size should be based on risk amount, not account balance',
      'Smaller positions allow for more trades and learning opportunities',
      'Large positions increase emotional pressure',
      'Always verify calculations with your broker',
      'Consider correlation between multiple positions'
    ]
  }
};