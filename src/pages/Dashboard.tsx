import React from 'react';
import { Transaction } from '../types';
import { motion } from 'motion/react';

interface DashboardProps {
  balance: string;
  address: string | null;
  transactions: Transaction[];
}

const Dashboard = ({ balance, address, transactions }: DashboardProps) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Row: Balance & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Wallet Balance Card */}
        <section className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-10 flex flex-col justify-between min-h-[320px] shadow-[0px_12px_32px_-4px_rgba(0,0,0,0.04)] relative overflow-hidden group">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>
          <div>
            <span className="text-on-surface-variant font-medium tracking-wide uppercase text-xs">Total Accessible Balance</span>
            <div className="mt-4 flex items-baseline gap-2">
              <h1 className="text-[4rem] font-black leading-none tracking-tight text-on-surface transition-all duration-500">
                ${parseFloat(balance).toLocaleString()}
              </h1>
              <span className="text-secondary font-bold text-xl flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                +4.2%
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-2 font-mono">Last updated: 32 seconds ago (Block #18,452,901)</p>
          </div>
          <div className="flex gap-4 mt-8 relative z-10">
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-on-primary-fixed-variant transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">north_east</span>
              Send Funds
            </button>
            <button className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-surface-container-high transition-all active:scale-[0.98]">
              <span className="material-symbols-outlined">south_west</span>
              Receive
            </button>
          </div>
        </section>

        {/* System Health */}
        <section className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-8 shadow-[0px_12px_32px_-4px_rgba(0,0,0,0.04)] flex flex-col h-full">
          <h3 className="font-bold text-lg mb-6 flex items-center justify-between">
            System Health
            <span className="text-xs bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full animate-pulse">Live</span>
          </h3>
          <div className="flex-1 flex flex-col justify-center space-y-8">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 shrink-0">
                <svg className="w-full h-full -rotate-90">
                  <circle className="text-surface-container-high" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" strokeWidth="6"></circle>
                  <circle className="text-primary" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" strokeDasharray="150.8" strokeDashoffset="3.01" strokeWidth="6"></circle>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black">98%</span>
              </div>
              <div>
                <p className="text-sm font-bold">Verified Transactions</p>
                <p className="text-xs text-on-surface-variant">Real-time ledger audit</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container-low rounded-xl">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Active Aid</p>
                <p className="text-xl font-black text-secondary">$1.2M</p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-xl">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Trust Score</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-xl font-black text-primary">9.8</p>
                  <span className="text-[10px] font-bold">/10</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Transparency Flow Visualizer */}
      <section className="bg-surface-container-low rounded-2xl p-8 relative overflow-hidden">
        <div className="flex items-center justify-between mb-10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">Real-Time Impact Flow</h3>
              <p className="text-xs text-on-surface-variant">End-to-end traceability of the latest $500.00 transfer</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur px-4 py-2 rounded-full border border-white/50">
            <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="text-xs font-bold text-secondary">Verified on Blockchain</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 items-center gap-4 relative z-10">
          <div className="col-span-1 flex flex-col items-center text-center p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">person</span>
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Donor</span>
            <span className="text-sm font-black">$500.00</span>
            <span className="text-[10px] text-primary font-mono mt-1">0x8a...421</span>
          </div>
          <div className="col-span-1 hidden md:flex flex-col items-center justify-center gap-2">
            <div className="w-full h-1 bg-surface-container-high rounded-full relative overflow-hidden flow-line"></div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">Signed</span>
          </div>
          <div className="col-span-1 flex flex-col items-center text-center p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">code_blocks</span>
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Smart Contract</span>
            <span className="text-xs font-black text-secondary">Escrowed</span>
            <span className="text-[10px] text-on-surface-variant mt-1 italic">Automated</span>
          </div>
          <div className="col-span-1 hidden md:flex flex-col items-center justify-center gap-2">
            <div className="w-full h-1 bg-surface-container-high rounded-full relative overflow-hidden flow-line"></div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">Release</span>
          </div>
          <div className="col-span-1 flex flex-col items-center text-center p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative verified-glow">
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg shadow-secondary/20 z-10">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
            </div>
            <div className="w-14 h-14 bg-tertiary/10 rounded-full flex items-center justify-center text-tertiary mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">corporate_fare</span>
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">NGO</span>
            <span className="text-xs font-black text-on-surface">Verified</span>
            <span className="text-[10px] text-on-surface-variant mt-1">Proof Uploaded</span>
          </div>
          <div className="col-span-1 hidden md:flex flex-col items-center justify-center gap-2">
            <div className="w-full h-1 bg-surface-container-high rounded-full relative overflow-hidden flow-line"></div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">Impact</span>
          </div>
          <div className="col-span-1 flex flex-col items-center text-center p-5 bg-primary text-white rounded-2xl shadow-xl shadow-primary/30 group">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">local_mall</span>
            </div>
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-1">Beneficiary</span>
            <span className="text-xs font-black">Aid Delivered</span>
            <span className="text-[10px] text-white/50 mt-1">GPS Verified</span>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_12px_32px_-4px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-xl">Recent Activity</h3>
            <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded text-[10px] font-bold text-on-surface-variant">
              <span className="material-symbols-outlined text-[10px]">sync</span>
              LIVE LEDGER
            </div>
          </div>
          <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
            Full Explorer
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-on-surface-variant text-[10px] uppercase tracking-widest border-b border-surface-container-low">
                <th className="pb-4 font-bold">Entity & Trust</th>
                <th className="pb-4 font-bold">Block Details</th>
                <th className="pb-4 font-bold">Validation</th>
                <th className="pb-4 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {transactions.slice(0, 3).map((tx) => (
                <tr key={tx.id} className="group hover:bg-surface-container-low transition-colors">
                  <td className="py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center relative">
                        <span className="material-symbols-outlined text-primary">volunteer_activism</span>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-white border-2 border-white">
                          <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-on-surface">{tx.purpose}</p>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-black uppercase">Verified</span>
                        </div>
                        <p className="text-xs text-on-surface-variant font-mono">{tx.recipient.slice(0, 10)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <p className="text-sm font-medium">{new Date(tx.timestamp).toLocaleDateString()}</p>
                    <p className="text-[10px] text-primary font-mono bg-primary/5 px-2 py-0.5 rounded-full w-max">#{tx.id.slice(0, 8)}</p>
                  </td>
                  <td className="py-6">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-black uppercase">{tx.status}</span>
                      <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                    </div>
                  </td>
                  <td className="py-6 text-right">
                    <span className={`text-lg font-black ${tx.amount.startsWith('-') ? 'text-on-surface' : 'text-secondary'}`}>
                      {tx.amount} ETH
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
