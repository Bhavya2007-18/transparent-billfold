import React from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

interface WalletCardProps {
  balance: string;
  address: string | null;
}

const WalletCard = ({ balance, address }: WalletCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2rem] p-8 text-white shadow-2xl shadow-emerald-200 relative overflow-hidden group"
    >
      {/* Decorative circles */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-3xl" />

      <div className="flex justify-between items-start mb-12 relative z-10">
        <div>
          <p className="text-emerald-100 text-sm font-medium mb-1 opacity-80 uppercase tracking-widest">Total Balance</p>
          <h2 className="text-5xl font-bold tracking-tight flex items-baseline gap-2">
            {balance} <span className="text-2xl font-medium opacity-70">ETH</span>
          </h2>
        </div>
        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
          <CreditCard className="w-6 h-6" />
        </div>
      </div>

      <div className="flex justify-between items-end relative z-10">
        <div>
          <p className="text-emerald-100 text-xs font-medium mb-1 opacity-60 uppercase tracking-widest">Wallet Address</p>
          <p className="font-mono text-sm tracking-wider bg-black/10 px-3 py-1 rounded-lg">
            {address ? `${address.slice(0, 12)}...${address.slice(-8)}` : 'Not Connected'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default WalletCard;
