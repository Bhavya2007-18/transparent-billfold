import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Info, AlertCircle } from 'lucide-react';
import { ethers, parseEther } from 'ethers';
import { getContract } from '../blockchain/contract';

interface SendFundsProps {
  signer: any;
  onTransactionComplete: () => void;
}

const SendFunds = ({ signer, onTransactionComplete }: SendFundsProps) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('Donation');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signer) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // In a real app, we would call the contract
      // const contract = getContract(signer);
      // const tx = await contract.donate(purpose, { value: parseEther(amount) });
      // await tx.wait();

      // Mocking transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Transaction sent:', { recipient, amount, purpose });
      onTransactionComplete();
      setRecipient('');
      setAmount('');
      alert('Transaction Successful!');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <Send className="text-white w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Send Funds</h2>
            <p className="text-slate-500 font-medium">Transfer ETH for social impact</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Recipient Address</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              required
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm focus:border-emerald-500 focus:ring-0 transition-all font-mono"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Amount (ETH)</label>
              <input
                type="number"
                step="0.0001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm focus:border-emerald-500 focus:ring-0 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Purpose</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm focus:border-emerald-500 focus:ring-0 transition-all appearance-none"
              >
                <option>Donation</option>
                <option>Micro-loan</option>
                <option>Aid distribution</option>
                <option>Flood Relief</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <div className="bg-emerald-50 p-4 rounded-2xl flex gap-3">
            <Info className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-xs text-emerald-700 font-medium leading-relaxed">
              Your transaction will be processed through the Ethos Smart Contract. 
              A 0.5% protocol fee is applied to maintain the platform.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Confirm Transaction
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SendFunds;
