import React from 'react';
import { Transaction } from '../types';

interface TransactionsProps {
  transactions: Transaction[];
}

const Transactions = ({ transactions }: TransactionsProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-on-surface">Transaction History</h2>
          <p className="text-on-surface-variant mt-2">Complete audit trail of all transparent fund movements.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-surface-container-highest text-on-surface px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-surface-container-high transition-all">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Filters
          </button>
          <button className="bg-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-lg">download</span>
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-surface-container-low rounded-2xl p-4 mb-8 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-outline-variant/30">
          <span className="text-xs font-bold text-on-surface-variant uppercase">Status:</span>
          <select className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 cursor-pointer">
            <option>All Transactions</option>
            <option>Verified</option>
            <option>Pending</option>
            <option>Flagged</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-outline-variant/30">
          <span className="text-xs font-bold text-on-surface-variant uppercase">Date Range:</span>
          <span className="text-sm font-bold">Last 30 Days</span>
          <span className="material-symbols-outlined text-sm">calendar_today</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-outline-variant/30">
          <span className="text-xs font-bold text-on-surface-variant uppercase">Type:</span>
          <select className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 cursor-pointer">
            <option>All Types</option>
            <option>Donations</option>
            <option>Aid Release</option>
            <option>Admin</option>
          </select>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-[0px_12px_32px_-4px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-on-surface-variant text-[10px] uppercase tracking-widest border-b border-surface-container-low">
                <th className="p-6 font-bold">Entity & Trust</th>
                <th className="p-6 font-bold">Block Details</th>
                <th className="p-6 font-bold">Validation</th>
                <th className="p-6 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {transactions.map((tx) => (
                <tr key={tx.id} className="group hover:bg-surface-container-low transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center relative">
                        <span className="material-symbols-outlined text-primary">
                          {tx.amount.startsWith('-') ? 'send' : 'volunteer_activism'}
                        </span>
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
                  <td className="p-6">
                    <p className="text-sm font-medium">{new Date(tx.timestamp).toLocaleDateString()}</p>
                    <p className="text-[10px] text-primary font-mono bg-primary/5 px-2 py-0.5 rounded-full w-max">#{tx.id.slice(0, 8)}</p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-black uppercase">{tx.status}</span>
                      <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <span className={`text-lg font-black ${tx.amount.startsWith('-') ? 'text-on-surface' : 'text-secondary'}`}>
                      {tx.amount} ETH
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
