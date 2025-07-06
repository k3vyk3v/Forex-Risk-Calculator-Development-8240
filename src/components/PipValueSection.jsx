import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { pipValueTables } from '../data/forexData';

const { FiSettings, FiInfo } = FiIcons;

const PipValueSection = ({ inputs, updateInput, results }) => {
  const getCurrencySymbol = (currency) => {
    const symbols = { USD: '$', EUR: '€', GBP: '£' };
    return symbols[currency] || '$';
  };

  const standardPipValue = pipValueTables[inputs.accountCurrency][inputs.currencyPair] || 10;
  const symbol = getCurrencySymbol(inputs.accountCurrency);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gray-50 rounded-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <SafeIcon icon={FiSettings} className="text-xl mr-2" />
        Pip Value Selection
      </h3>

      <div className="space-y-4">
        {/* Standard Pip Values Option */}
        <div className="flex items-start space-x-3">
          <input
            type="radio"
            id="standard"
            name="pipValueMode"
            value="standard"
            checked={inputs.pipValueMode === 'standard'}
            onChange={(e) => updateInput('pipValueMode', e.target.value)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <div className="flex-1">
            <label htmlFor="standard" className="block text-sm font-medium text-gray-700">
              Use Standard Pip Values (Recommended)
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Automatic lookup from built-in currency tables
            </p>
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                📊 Using <strong>{symbol}{standardPipValue.toFixed(2)}</strong> per lot for <strong>{inputs.currencyPair}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Custom Pip Value Option */}
        <div className="flex items-start space-x-3">
          <input
            type="radio"
            id="custom"
            name="pipValueMode"
            value="custom"
            checked={inputs.pipValueMode === 'custom'}
            onChange={(e) => updateInput('pipValueMode', e.target.value)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <div className="flex-1">
            <label htmlFor="custom" className="block text-sm font-medium text-gray-700">
              Enter Custom Pip Value
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Find this in your broker's contract specifications
            </p>
            
            {inputs.pipValueMode === 'custom' && (
              <div className="mt-3 space-y-2">
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">{symbol}</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.10"
                    max="100.00"
                    value={inputs.customPipValue}
                    onChange={(e) => updateInput('customPipValue', parseFloat(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10.00"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 text-sm">per lot</span>
                </div>
                
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <SafeIcon icon={FiInfo} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-yellow-800">
                        <strong>Validation:</strong> Must be between {symbol}0.10 and {symbol}100.00
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">
                        <strong>Example:</strong> e.g., {symbol}9.50 for EUR/USD on your broker
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pip Value Information */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Pip Value Information</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Standard values are estimates based on typical exchange rates</li>
          <li>• USD pip values are most accurate as forex is USD-centric</li>
          <li>• EUR/GBP values are estimates - verify with your broker</li>
          <li>• All calculations assume standard lot sizes (100,000 units)</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default PipValueSection;