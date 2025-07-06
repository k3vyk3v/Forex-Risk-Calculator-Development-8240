import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';
import ForexCalculator from './components/ForexCalculator';
import './App.css';

const { FiTrendingUp, FiDollarSign, FiShield } = FiIcons;

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center items-center mb-4">
            <SafeIcon icon={FiTrendingUp} className="text-4xl text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              Forex Risk Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional risk management tool for forex traders of all levels. 
            Calculate position sizes, manage risk, and get intelligent stop loss recommendations.
          </p>
        </motion.div>

        {/* Main Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ForexCalculator />
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 text-gray-500"
        >
          <div className="flex justify-center items-center mb-2">
            <SafeIcon icon={FiShield} className="text-lg mr-2" />
            <span className="text-sm">
              Risk management is more important than perfect analysis
            </span>
          </div>
          <p className="text-xs">
            Educational tool only. Past performance does not guarantee future results.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;