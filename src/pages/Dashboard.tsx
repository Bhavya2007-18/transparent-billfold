import React from 'react';
import WalletCard from '../components/WalletCard';
import TransactionTable from '../components/TransactionTable';
import DonationFlow from '../components/DonationFlow';
import { Transaction } from '../types';
import { motion } from 'motion/react';
import { TrendingUp, Users, HeartHandshake } from 'lucide-react';

interface DashboardProps {
  balance: string;
  address: string | null;
  transactions: Transaction[];
}

const Dashboard = ({ balance, address, transactions }: DashboardProps) => {
  const stats = [
    { label: 'Total Donated', value: '1.24 ETH', icon: HeartHandshake, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Loans', value: '3', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Beneficiaries', value: '12', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <WalletCard balance={balance} address={address} />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4 shadow-sm"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <DonationFlow />
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
            <HeartHandshake className="w-10 h-10 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Impact Summary</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto">
            Your contributions have helped 12 families in the Flood Relief program this month.
          </p>
          <button className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
            View Impact Report
          </button>
        </div>
      </div>

      <TransactionTable transactions={transactions.slice(0, 5)} />
    </div>
  );
};

export default Dashboard;
