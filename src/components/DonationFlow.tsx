import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Building2, Heart } from 'lucide-react';

const DonationFlow = () => {
  const steps = [
    { icon: Heart, label: 'Donor', color: 'bg-emerald-500' },
    { icon: Shield, label: 'Smart Contract', color: 'bg-blue-500' },
    { icon: Building2, label: 'NGO', color: 'bg-amber-500' },
    { icon: User, label: 'Beneficiary', color: 'bg-indigo-500' },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-8">Donation Flow Visualization</h3>
      <div className="flex items-center justify-between relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
        
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-3 relative z-10"
            >
              <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center shadow-lg shadow-${step.color.split('-')[1]}-200`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{step.label}</span>
            </motion.div>
            {index < steps.length - 1 && (
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="z-10"
              >
                <ArrowRight className="w-5 h-5 text-slate-300" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

import { User } from 'lucide-react';
export default DonationFlow;
