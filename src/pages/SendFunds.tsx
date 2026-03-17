import React, { useState } from 'react';
import { motion } from 'motion/react';
import { parseEther } from 'ethers';

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
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signer) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const tx = await signer.sendTransaction({
        to: recipient,
        value: parseEther(amount)
      });
      
      await tx.wait();
      
      onTransactionComplete();
      setRecipient('');
      setAmount('');
      setSuccess(true);
    } catch (err: any) {
      console.error("Transaction error:", err);
      setError(err.reason || err.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  if (!signer) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl text-primary">account_balance_wallet</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
        <p className="text-on-surface-variant mb-8">You need to connect your wallet to send funds on the blockchain.</p>
        <div className="p-4 bg-surface-container-low rounded-xl text-sm text-on-surface-variant italic">
          Please use the "Connect" button in the navigation bar to get started.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
      <section className="flex-1">
        <div className="mb-10">
          <h2 className="text-4xl font-bold tracking-tight text-on-surface">Send Funds</h2>
          <p className="text-on-surface-variant mt-2">Transfer assets securely across the transparent ledger.</p>
        </div>
        <div className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0px_12px_32px_-4px_rgba(0,0,0,0.04)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Recipient */}
            <div>
              <label className="block text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-wider">Recipient Address</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">person_search</span>
                <input 
                  className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline" 
                  placeholder="Wallet address or @username" 
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => setRecipient('0x71c...8a2')} className="px-4 py-1.5 bg-surface-container-high rounded-full text-xs font-semibold text-on-surface-variant hover:bg-surface-container-highest transition-colors">Recent: 0x71c...8a2</button>
                <button type="button" onClick={() => setRecipient('@humanity_aid')} className="px-4 py-1.5 bg-surface-container-high rounded-full text-xs font-semibold text-on-surface-variant hover:bg-surface-container-highest transition-colors">Recent: @humanity_aid</button>
              </div>
            </div>

            {/* Amount & Currency */}
            <div>
              <label className="block text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-wider">Amount to Transfer</label>
              <div className="flex gap-4">
                <div className="relative flex-1 group">
                  <input 
                    className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 text-2xl font-bold focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline" 
                    placeholder="0.00" 
                    type="number"
                    step="0.0001"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-on-surface-variant">ETH</span>
                </div>
                <div className="w-32">
                  <select className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 font-bold text-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
                    <option>ETH</option>
                    <option>USDC</option>
                    <option>BTC</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Purpose Dropdown */}
            <div>
              <label className="block text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-wider">Purpose of Transaction</label>
              <select 
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 font-medium text-on-surface focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option>Donation</option>
                <option>Loan Payment</option>
                <option>Humanitarian Aid</option>
                <option>Personal Transfer</option>
                <option>Service Payment</option>
              </select>
            </div>

            {/* Transaction Summary Card */}
            <div className="bg-surface-container-low rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-on-surface-variant font-medium">Network Fee (Gas)</span>
                <span className="text-sm text-on-surface font-bold">~0.00042 ETH</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-outline-variant/20">
                <span className="text-base text-on-surface font-bold">Total Execution Cost</span>
                <span className="text-xl text-primary font-black">{amount ? (parseFloat(amount) + 0.00042).toFixed(5) : '0.00042'} ETH</span>
              </div>
            </div>

            {error && <p className="text-error text-sm font-bold">{error}</p>}
            {success && (
              <div className="p-4 bg-secondary/10 rounded-xl flex items-center gap-3 text-secondary">
                <span className="material-symbols-outlined">check_circle</span>
                <p className="text-sm font-bold">Transaction Successful! The ledger has been updated.</p>
              </div>
            )}

            {/* CTA */}
            <button 
              disabled={loading}
              className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-5 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3" 
              type="submit"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="material-symbols-outlined">verified_user</span>
                  Review & Send Funds
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      <aside className="w-full lg:w-80 space-y-6">
        <div className="bg-surface-container-high rounded-3xl p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-primary">security</span>
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-3">Security Checklist</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
              <p className="text-sm text-on-surface-variant">Verify the recipient's address character by character.</p>
            </li>
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
              <p className="text-sm text-on-surface-variant">Check network congestion for gas fee fluctuations.</p>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SendFunds;
