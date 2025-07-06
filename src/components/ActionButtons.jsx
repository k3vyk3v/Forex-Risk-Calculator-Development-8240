import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiRefreshCw, FiArrowRight, FiCopy, FiCheck, FiPlay, FiLoader } = FiIcons;

const ActionButtons = ({ 
  onReset, 
  onCalculate, 
  onProceed, 
  isCalculated, 
  hasChanges, 
  isCalculating, 
  hasErrors 
}) => {
  const shouldShowCalculate = !isCalculated || hasChanges;
  const canProceed = isCalculated && !hasErrors && !hasChanges;

  return (
    <div className="flex items-center space-x-3">
      {/* Reset Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        disabled={isCalculating}
        className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SafeIcon icon={FiRefreshCw} className="text-lg mr-2" />
        Reset
      </motion.button>

      {/* Calculate Button - Shows when needed */}
      {shouldShowCalculate && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: isCalculating ? 1 : 1.05 }}
          whileTap={{ scale: isCalculating ? 1 : 0.95 }}
          onClick={onCalculate}
          disabled={isCalculating}
          className={`flex items-center px-6 py-2 rounded-lg font-medium transition-all ${
            isCalculating 
              ? 'bg-blue-500 text-white cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
          }`}
        >
          <SafeIcon 
            icon={isCalculating ? FiLoader : FiPlay} 
            className={`text-lg mr-2 ${isCalculating ? 'animate-spin' : ''}`} 
          />
          {isCalculating ? 'Calculating...' : 'Calculate'}
        </motion.button>
      )}

      {/* Proceed Button - Shows when calculation is complete */}
      {!shouldShowCalculate && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: canProceed ? 1.05 : 1 }}
          whileTap={{ scale: canProceed ? 0.95 : 1 }}
          onClick={onProceed}
          disabled={!canProceed}
          className={`flex items-center px-6 py-2 rounded-lg font-medium transition-all ${
            canProceed
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-md'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <SafeIcon 
            icon={canProceed ? FiCopy : FiCheck} 
            className="text-lg mr-2" 
          />
          {canProceed ? 'Copy Trade Setup' : 'Ready'}
        </motion.button>
      )}

      {/* Status Indicator */}
      {hasChanges && isCalculated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center text-yellow-600 text-sm"
        >
          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
          Changes detected
        </motion.div>
      )}
    </div>
  );
};

export default ActionButtons;