import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTarget, FiDollarSign, FiTrendingUp, FiTrendingDown, FiBarChart, FiCheckCircle, FiAlertCircle } = FiIcons;

const ResultsSection = ({ inputs, results, isCalculated }) => {
  const getCurrencySymbol = (currency) => {
    const symbols = { USD: '$', EUR: '€', GBP: '£' };
    return symbols[currency] || '$';
  };

  const symbol = getCurrencySymbol(inputs.accountCurrency);

  const getStopRecommendationStatus = () => {
    if (!results.stopRecommendation) return { status: 'unknown', message: 'No recommendation available' };
    
    const { min, max } = results.stopRecommendation;
    const currentStop = results.stopDistance;
    
    if (currentStop >= min && currentStop <= max) {
      return { status: 'good', message: '✅ Within recommended range' };
    } else if (currentStop < min) {
      return { status: 'tight', message: '⚠️ Stop too tight - may get stopped by market noise' };
    } else {
      return { status: 'wide', message: '⚠️ Stop very wide - consider reducing position size' };
    }
  };

  const getRiskLevelDisplay = () => {
    const risk = inputs.riskPercentage;
    if (risk <= 1) return { level: 'Beginner Safe Zone', color: 'text-green-600', bg: 'bg-green-50' };
    if (risk <= 2) return { level: 'Experienced Traders Only', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Expert/High Risk', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const stopStatus = getStopRecommendationStatus();
  const riskDisplay = getRiskLevelDisplay();
  const isValidCalculation = results.validationErrors.length === 0 && results.positionSize > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Main Results */}
      <div className={`rounded-lg p-6 border-2 transition-all ${
        isCalculated && isValidCalculation 
          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' 
          : !isCalculated
            ? 'bg-gray-50 border-gray-200'
            : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <SafeIcon icon={FiTarget} className="text-xl mr-2" />
            Calculation Results
          </h3>
          
          {!isCalculated && (
            <div className="flex items-center text-gray-500">
              <SafeIcon icon={FiAlertCircle} className="text-lg mr-1" />
              <span className="text-sm font-medium">Click Calculate</span>
            </div>
          )}
          
          {isCalculated && isValidCalculation && (
            <div className="flex items-center text-green-600">
              <SafeIcon icon={FiCheckCircle} className="text-lg mr-1" />
              <span className="text-sm font-medium">Ready to Trade</span>
            </div>
          )}
          
          {isCalculated && !isValidCalculation && (
            <div className="flex items-center text-red-600">
              <SafeIcon icon={FiAlertCircle} className="text-lg mr-1" />
              <span className="text-sm font-medium">Check Errors</span>
            </div>
          )}
        </div>

        {/* Position Size - Most Prominent */}
        <div className={`text-center mb-6 p-4 rounded-lg shadow-sm ${
          isCalculated && isValidCalculation 
            ? 'bg-white' 
            : 'bg-gray-100'
        }`}>
          <div className="text-sm text-gray-600 mb-1">POSITION SIZE</div>
          <div className={`text-4xl font-bold ${
            isCalculated && isValidCalculation 
              ? 'text-blue-600' 
              : 'text-gray-400'
          }`}>
            {isCalculated ? results.positionSize.toFixed(2) : '0.00'} lots
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {inputs.tradeDirection === 'Buy' ? '📈 LONG' : '📉 SHORT'} {inputs.currencyPair}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <SafeIcon icon={FiDollarSign} className="text-lg text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Risk Amount</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {symbol}{isCalculated ? results.riskAmount.toFixed(2) : '0.00'}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <SafeIcon icon={FiBarChart} className="text-lg text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Stop Distance</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {isCalculated ? results.stopDistance.toFixed(1) : '0.0'} pips
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <SafeIcon icon={FiTarget} className="text-lg text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Pip Value Used</span>
            </div>
            <div className="text-xl font-bold text-gray-800">
              {symbol}{isCalculated ? results.pipValue.toFixed(2) : '0.00'}
            </div>
            <div className="text-xs text-gray-500">
              {inputs.pipValueMode === 'standard' ? 'Standard' : 'Custom'}
            </div>
          </div>

          <div className={`p-4 rounded-lg ${riskDisplay.bg}`}>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Risk Level</span>
            </div>
            <div className={`text-lg font-bold ${riskDisplay.color}`}>
              {riskDisplay.level}
            </div>
          </div>
        </div>

        {/* Calculation Status */}
        {!isCalculated && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <SafeIcon icon={FiAlertCircle} className="text-blue-600 mr-2" />
              <p className="text-sm text-blue-800">
                <strong>Ready to calculate:</strong> Click the "Calculate" button to process your trade setup
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Stop Loss Recommendation */}
      {isCalculated && results.stopRecommendation && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h4 className="text-md font-semibold text-gray-800 mb-4">🎯 Stop Loss Recommendation</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Recommended Range:</span>
              <span className="font-medium">
                {results.stopRecommendation.min}-{results.stopRecommendation.max} pips
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Your Stop Distance:</span>
              <span className="font-medium">{results.stopDistance.toFixed(1)} pips</span>
            </div>
            <div className={`p-3 rounded-lg ${
              stopStatus.status === 'good' 
                ? 'bg-green-50 border border-green-200' 
                : stopStatus.status === 'tight' 
                  ? 'bg-yellow-50 border border-yellow-200' 
                  : 'bg-red-50 border border-red-200'
            }`}>
              <p className="text-sm font-medium">{stopStatus.message}</p>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              💡 {results.stopRecommendation.message}
            </div>
          </div>
        </div>
      )}

      {/* Profit Targets */}
      {isCalculated && Object.keys(results.profitTargets).length > 0 && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h4 className="text-md font-semibold text-gray-800 mb-4">📈 Profit Targets</h4>
          <div className="space-y-3">
            {Object.entries(results.profitTargets).map(([ratio, target]) => (
              <div key={ratio} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-800">{ratio} R:R</span>
                  <div className="text-sm text-gray-600">
                    Price: {target.price.toFixed(inputs.currencyPair.includes('JPY') ? 3 : 5)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">
                    {symbol}{target.profit.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              💡 Break-even price: {(inputs.entryPrice + (inputs.tradeDirection === 'Buy' ? 0.0001 : -0.0001)).toFixed(5)} (includes typical 1 pip spread)
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ResultsSection;