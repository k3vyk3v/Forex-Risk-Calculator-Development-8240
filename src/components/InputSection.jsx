import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDollarSign, FiTrendingUp, FiTrendingDown } = FiIcons;

const InputSection = ({ inputs, updateInput, validationErrors }) => {
  const accountCurrencies = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'EUR', label: 'EUR (€)', symbol: '€' },
    { value: 'GBP', label: 'GBP (£)', symbol: '£' }
  ];

  const riskPercentages = [
    { value: 0.25, label: '0.25% (Beginner)' },
    { value: 0.5, label: '0.5% (Beginner)' },
    { value: 1, label: '1%' },
    { value: 1.5, label: '1.5%' },
    { value: 2, label: '2%' },
    { value: 3, label: '3%' }
  ];

  const currencyPairs = [
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 
    'USD/CAD', 'NZD/USD', 'GBP/JPY', 'EUR/JPY'
  ];

  const tradeDirections = [
    { value: 'Buy', label: 'Buy (Long)', icon: FiTrendingUp, color: 'text-green-600' },
    { value: 'Sell', label: 'Sell (Short)', icon: FiTrendingDown, color: 'text-red-600' }
  ];

  const getRiskLevelColor = (risk) => {
    if (risk <= 1) return 'text-green-600';
    if (risk <= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLevelBg = (risk) => {
    if (risk <= 1) return 'bg-green-50 border-green-200';
    if (risk <= 2) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <SafeIcon icon={FiDollarSign} className="text-xl mr-2" />
          Account Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Account Balance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Balance
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">
                {accountCurrencies.find(c => c.value === inputs.accountCurrency)?.symbol}
              </span>
              <input
                type="number"
                value={inputs.accountBalance}
                onChange={(e) => updateInput('accountBalance', parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10000"
              />
            </div>
          </div>

          {/* Account Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Currency
            </label>
            <select
              value={inputs.accountCurrency}
              onChange={(e) => updateInput('accountCurrency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {accountCurrencies.map(currency => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Risk Percentage */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Risk Percentage
          </label>
          <select
            value={inputs.riskPercentage}
            onChange={(e) => updateInput('riskPercentage', parseFloat(e.target.value))}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getRiskLevelBg(inputs.riskPercentage)}`}
          >
            {riskPercentages.map(risk => (
              <option key={risk.value} value={risk.value}>
                {risk.label}
              </option>
            ))}
          </select>
          <div className={`text-xs mt-1 font-medium ${getRiskLevelColor(inputs.riskPercentage)}`}>
            {inputs.riskPercentage <= 1 && '✅ Beginner Safe Zone'}
            {inputs.riskPercentage > 1 && inputs.riskPercentage <= 2 && '⚠️ Experienced Traders Only'}
            {inputs.riskPercentage > 2 && '🚨 Expert/High Risk'}
          </div>
        </div>
      </div>

      {/* Trade Setup */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Trade Setup</h3>
        
        <div className="space-y-4">
          {/* Trade Direction */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trade Direction
            </label>
            <div className="grid grid-cols-2 gap-3">
              {tradeDirections.map(direction => (
                <button
                  key={direction.value}
                  onClick={() => updateInput('tradeDirection', direction.value)}
                  className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center ${
                    inputs.tradeDirection === direction.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <SafeIcon icon={direction.icon} className={`text-lg mr-2 ${direction.color}`} />
                  <span className="font-medium">{direction.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Currency Pair */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency Pair
            </label>
            <select
              value={inputs.currencyPair}
              onChange={(e) => updateInput('currencyPair', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {currencyPairs.map(pair => (
                <option key={pair} value={pair}>{pair}</option>
              ))}
            </select>
          </div>

          {/* Entry Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Entry Price
            </label>
            <input
              type="number"
              step="0.0001"
              value={inputs.entryPrice}
              onChange={(e) => updateInput('entryPrice', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1.0850"
            />
          </div>

          {/* Stop Loss Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stop Loss Price
            </label>
            <input
              type="number"
              step="0.0001"
              value={inputs.stopLossPrice}
              onChange={(e) => updateInput('stopLossPrice', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1.0800"
            />
          </div>
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <h4 className="text-red-800 font-medium mb-2">⚠️ Validation Errors:</h4>
          <ul className="text-red-700 text-sm space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InputSection;