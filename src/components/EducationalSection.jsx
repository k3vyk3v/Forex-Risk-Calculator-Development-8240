import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBook, FiAlertTriangle, FiTrendingUp, FiShield } = FiIcons;

const EducationalSection = ({ inputs, results }) => {
  const [activeTab, setActiveTab] = useState('whatif');

  const getCurrencySymbol = (currency) => {
    const symbols = { USD: '$', EUR: '€', GBP: '£' };
    return symbols[currency] || '$';
  };

  const symbol = getCurrencySymbol(inputs.accountCurrency);

  const generateWhatIfTable = () => {
    const risks = [0.25, 0.5, 1, 1.5, 2, 3];
    return risks.map(risk => ({
      risk,
      amount: (inputs.accountBalance * risk) / 100,
      level: risk <= 1 ? 'Safe' : risk <= 2 ? 'Caution' : 'High Risk'
    }));
  };

  const calculateRecoveryTrades = () => {
    const losses = [5, 10, 15, 20, 25, 30];
    return losses.map(loss => ({
      loss,
      tradesNeeded: Math.ceil(loss / (100 - loss) * 100)
    }));
  };

  const getHourlyWageComparison = () => {
    const minWage = 15; // $15/hour assumption
    const riskAmount = results.riskAmount;
    const hours = riskAmount / minWage;
    return hours.toFixed(1);
  };

  const tabs = [
    { id: 'whatif', label: 'What-If Analysis', icon: FiTrendingUp },
    { id: 'recovery', label: 'Recovery Calculator', icon: FiAlertTriangle },
    { id: 'education', label: 'Risk Education', icon: FiBook },
    { id: 'safety', label: 'Safety Tips', icon: FiShield }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-lg p-6 border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <SafeIcon icon={FiBook} className="text-xl mr-2" />
        Educational Resources
      </h3>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <SafeIcon icon={tab.icon} className="text-sm mr-1" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'whatif' && (
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Risk Amount by Percentage</h4>
            <div className="space-y-2">
              {generateWhatIfTable().map(item => (
                <div key={item.risk} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">{item.risk}%</span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded ${
                      item.level === 'Safe' ? 'bg-green-100 text-green-800' :
                      item.level === 'Caution' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.level}
                    </span>
                  </div>
                  <span className="font-bold">{symbol}{item.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 This risk equals {symbol}{results.riskAmount.toFixed(2)} or about {getHourlyWageComparison()} hours of minimum wage work
              </p>
            </div>
          </div>
        )}

        {activeTab === 'recovery' && (
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Recovery After Loss</h4>
            <div className="space-y-2">
              {calculateRecoveryTrades().map(item => (
                <div key={item.loss} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>After {item.loss}% loss</span>
                  <span className="font-bold text-red-600">
                    Need {item.tradesNeeded}% gain to recover
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Large losses become exponentially harder to recover from
              </p>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h5 className="font-medium text-green-800 mb-2">✅ Best Practices</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Most profitable traders risk 0.5-2% per trade maximum</li>
                <li>• Use technical levels for stops, not just distance</li>
                <li>• Risk management is more important than perfect analysis</li>
                <li>• Start with smaller risks while learning</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-2">📚 Stop Loss Guidelines</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Support/resistance levels override distance recommendations</li>
                <li>• Wider stops help avoid market noise while learning</li>
                <li>• Tighter stops require more precise entry timing</li>
                <li>• Always consider the overall market volatility</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h5 className="font-medium text-red-800 mb-2">🚨 Warning Signs</h5>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Risking more than 2% per trade</li>
                <li>• Increasing risk after losses</li>
                <li>• Ignoring stop losses</li>
                <li>• Trading with money you can't afford to lose</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h5 className="font-medium text-gray-800 mb-2">📋 Safety Checklist</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• ✓ Never risk more than you can afford to lose</li>
                <li>• ✓ Always use stop losses</li>
                <li>• ✓ Keep detailed trading records</li>
                <li>• ✓ Practice with demo accounts first</li>
                <li>• ✓ Continuously educate yourself</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>Disclaimer:</strong> This is an educational tool only. Past performance does not guarantee future results. 
          Trading forex involves substantial risk of loss. Always verify calculations with your broker and seek professional advice.
        </p>
      </div>
    </motion.div>
  );
};

export default EducationalSection;