import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { pipValueTables, stopLossRecommendations, currencyPairs } from '../data/forexData';
import InputSection from './InputSection';
import PipValueSection from './PipValueSection';
import ResultsSection from './ResultsSection';
import EducationalSection from './EducationalSection';
import ActionButtons from './ActionButtons';

const { FiCalculator } = FiIcons;

const ForexCalculator = () => {
  const [inputs, setInputs] = useState({
    accountBalance: 10000,
    accountCurrency: 'USD',
    riskPercentage: 1,
    tradeDirection: 'Buy',
    currencyPair: 'EUR/USD',
    entryPrice: 1.0850,
    stopLossPrice: 1.0800,
    pipValueMode: 'standard',
    customPipValue: 10.00
  });

  const [results, setResults] = useState({
    riskAmount: 0,
    stopDistance: 0,
    positionSize: 0,
    pipValue: 0,
    stopRecommendation: null,
    profitTargets: {},
    validationErrors: [],
    riskLevel: 'safe'
  });

  const [isCalculated, setIsCalculated] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Default values for reset
  const defaultInputs = {
    accountBalance: 10000,
    accountCurrency: 'USD',
    riskPercentage: 1,
    tradeDirection: 'Buy',
    currencyPair: 'EUR/USD',
    entryPrice: 1.0850,
    stopLossPrice: 1.0800,
    pipValueMode: 'standard',
    customPipValue: 10.00
  };

  // Track input changes to show calculate button
  useEffect(() => {
    if (isCalculated) {
      setHasChanges(true);
    }
  }, [inputs]);

  const calculateResults = () => {
    setIsCalculating(true);
    
    // Add small delay for visual feedback
    setTimeout(() => {
      const {
        accountBalance,
        accountCurrency,
        riskPercentage,
        tradeDirection,
        currencyPair,
        entryPrice,
        stopLossPrice,
        pipValueMode,
        customPipValue
      } = inputs;

      const errors = [];
      
      // Validate inputs first
      if (!accountBalance || accountBalance <= 0) {
        errors.push('Account balance must be greater than 0');
      }
      
      if (!riskPercentage || riskPercentage <= 0) {
        errors.push('Risk percentage must be greater than 0');
      }
      
      if (!entryPrice || entryPrice <= 0) {
        errors.push('Entry price must be greater than 0');
      }
      
      if (!stopLossPrice || stopLossPrice <= 0) {
        errors.push('Stop loss price must be greater than 0');
      }
      
      // Calculate risk amount
      const riskAmount = (accountBalance * riskPercentage) / 100;

      // Calculate stop distance
      let stopDistance = 0;
      if (tradeDirection === 'Buy') {
        stopDistance = entryPrice - stopLossPrice;
        if (stopDistance <= 0) {
          errors.push('Stop loss must be below entry price for long trades');
        }
      } else {
        stopDistance = stopLossPrice - entryPrice;
        if (stopDistance <= 0) {
          errors.push('Stop loss must be above entry price for short trades');
        }
      }

      // Convert to pips
      const pipMultiplier = currencyPair.includes('JPY') ? 100 : 10000;
      const stopDistancePips = Math.abs(stopDistance * pipMultiplier);

      // Get pip value
      let pipValue = 0;
      if (pipValueMode === 'standard') {
        pipValue = pipValueTables[accountCurrency][currencyPair] || 10;
      } else {
        pipValue = customPipValue;
        if (pipValue < 0.10 || pipValue > 100.00) {
          errors.push('Custom pip value must be between $0.10 and $100.00');
        }
      }

      // Calculate position size
      const positionSize = stopDistancePips > 0 ? riskAmount / (stopDistancePips * pipValue) : 0;

      // Position size validation
      if (positionSize > 2) {
        errors.push('Position size over 2 lots - consider reducing risk');
      }
      if (positionSize < 0.01 && positionSize > 0) {
        errors.push('Position size below minimum trade size (0.01 lots)');
      }

      // Get stop loss recommendation
      const riskLevel = getRiskLevel(riskPercentage);
      const stopRecommendation = stopLossRecommendations[riskLevel][currencyPair];

      // Calculate profit targets
      const profitTargets = calculateProfitTargets(
        entryPrice,
        stopDistancePips,
        tradeDirection,
        positionSize,
        pipValue,
        currencyPair
      );

      setResults({
        riskAmount,
        stopDistance: stopDistancePips,
        positionSize,
        pipValue,
        stopRecommendation,
        profitTargets,
        validationErrors: errors,
        riskLevel
      });

      // Mark as calculated if no errors and valid position size
      setIsCalculated(errors.length === 0 && positionSize > 0);
      setHasChanges(false);
      setIsCalculating(false);
    }, 300);
  };

  const getRiskLevel = (risk) => {
    if (risk <= 1) return 'beginner';
    if (risk <= 2) return 'experienced';
    return 'expert';
  };

  const calculateProfitTargets = (entryPrice, stopDistancePips, direction, positionSize, pipValue, currencyPair) => {
    const targets = {};
    const multipliers = [1, 2, 3];
    
    // Determine pip multiplier for price conversion
    const pipMultiplier = currencyPair.includes('JPY') ? 100 : 10000;
    
    multipliers.forEach(mult => {
      // Target distance in pips (multiple of stop distance)
      const targetDistancePips = stopDistancePips * mult;
      
      // Convert pips back to price difference
      const priceDistance = targetDistancePips / pipMultiplier;
      
      // Calculate target price based on trade direction
      let targetPrice = 0;
      if (direction === 'Buy') {
        targetPrice = entryPrice + priceDistance;
      } else {
        targetPrice = entryPrice - priceDistance;
      }
      
      // Calculate profit in account currency
      const profit = targetDistancePips * pipValue * positionSize;
      
      targets[`${mult}:1`] = {
        price: targetPrice,
        profit: profit
      };
    });
    
    return targets;
  };

  const updateInput = (key, value) => {
    setInputs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    setInputs(defaultInputs);
    setIsCalculated(false);
    setHasChanges(false);
    setResults({
      riskAmount: 0,
      stopDistance: 0,
      positionSize: 0,
      pipValue: 0,
      stopRecommendation: null,
      profitTargets: {},
      validationErrors: [],
      riskLevel: 'safe'
    });
  };

  const handleCalculate = () => {
    calculateResults();
  };

  const handleProceed = () => {
    // Generate trade summary
    const tradeSummary = generateTradeSummary();
    
    // Copy to clipboard
    navigator.clipboard.writeText(tradeSummary).then(() => {
      alert('Trade summary copied to clipboard!');
    }).catch(() => {
      // Fallback - show in alert
      alert(`Trade Summary:\n\n${tradeSummary}`);
    });
  };

  const generateTradeSummary = () => {
    const symbol = inputs.accountCurrency === 'USD' ? '$' : inputs.accountCurrency === 'EUR' ? '€' : '£';
    
    return `
FOREX TRADE SETUP
=================

Pair: ${inputs.currencyPair}
Direction: ${inputs.tradeDirection.toUpperCase()}
Entry Price: ${inputs.entryPrice.toFixed(inputs.currencyPair.includes('JPY') ? 3 : 5)}
Stop Loss: ${inputs.stopLossPrice.toFixed(inputs.currencyPair.includes('JPY') ? 3 : 5)}

RISK MANAGEMENT
===============
Risk Amount: ${symbol}${results.riskAmount.toFixed(2)}
Risk %: ${inputs.riskPercentage}%
Stop Distance: ${results.stopDistance.toFixed(1)} pips
Position Size: ${results.positionSize.toFixed(2)} lots

PROFIT TARGETS
==============
1:1 R:R - ${Object.values(results.profitTargets)[0]?.price.toFixed(inputs.currencyPair.includes('JPY') ? 3 : 5)} (${symbol}${Object.values(results.profitTargets)[0]?.profit.toFixed(2)})
2:1 R:R - ${Object.values(results.profitTargets)[1]?.price.toFixed(inputs.currencyPair.includes('JPY') ? 3 : 5)} (${symbol}${Object.values(results.profitTargets)[1]?.profit.toFixed(2)})
3:1 R:R - ${Object.values(results.profitTargets)[2]?.price.toFixed(inputs.currencyPair.includes('JPY') ? 3 : 5)} (${symbol}${Object.values(results.profitTargets)[2]?.profit.toFixed(2)})

Generated: ${new Date().toLocaleString()}
    `.trim();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <SafeIcon icon={FiCalculator} className="text-3xl text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Risk Calculator</h2>
          </div>
          
          {/* Action Buttons */}
          <ActionButtons 
            onReset={handleReset}
            onCalculate={handleCalculate}
            onProceed={handleProceed}
            isCalculated={isCalculated}
            hasChanges={hasChanges}
            isCalculating={isCalculating}
            hasErrors={results.validationErrors.length > 0}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <InputSection 
              inputs={inputs}
              updateInput={updateInput}
              validationErrors={results.validationErrors}
            />
            <PipValueSection 
              inputs={inputs}
              updateInput={updateInput}
              results={results}
            />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <ResultsSection 
              inputs={inputs}
              results={results}
              isCalculated={isCalculated}
            />
            <EducationalSection 
              inputs={inputs}
              results={results}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForexCalculator;