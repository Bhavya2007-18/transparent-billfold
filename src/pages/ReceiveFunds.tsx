import React from 'react';

interface ReceiveFundsProps {
  address: string | null;
}

const ReceiveFunds = ({ address }: ReceiveFundsProps) => {
  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      alert('Address copied to clipboard!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
      <section className="flex-1">
        <div className="mb-10">
          <h2 className="text-4xl font-bold tracking-tight text-on-surface">Receive Funds</h2>
          <p className="text-on-surface-variant mt-2">Share your address or QR code to receive transparent donations.</p>
        </div>
        <div className="bg-surface-container-lowest rounded-[2rem] p-10 shadow-[0px_12px_32px_-4px_rgba(0,0,0,0.04)] flex flex-col items-center">
          {/* QR Code Placeholder */}
          <div className="w-64 h-64 bg-white p-4 rounded-3xl shadow-inner border-4 border-surface-container-high mb-8 relative group">
            <div className="w-full h-full bg-surface-container-low rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                alt="QR Code" 
                className="w-48 h-48 opacity-80 group-hover:scale-110 transition-transform duration-500" 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${address || '0x000'}`}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/40 backdrop-blur-sm rounded-3xl">
              <button className="bg-primary text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">Download QR</button>
            </div>
          </div>

          <div className="w-full max-w-md space-y-6">
            <div>
              <label className="block text-center text-sm font-bold text-on-surface-variant mb-4 uppercase tracking-widest">Your Public Wallet Address</label>
              <div className="flex items-center gap-2 bg-surface-container-low p-2 rounded-2xl border border-outline-variant/30">
                <div className="flex-1 px-4 font-mono text-sm font-bold truncate text-primary">
                  {address || '0x0000000000000000000000000000000000000000'}
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="bg-white text-on-surface p-3 rounded-xl hover:bg-surface-container-highest transition-all active:scale-90 shadow-sm"
                >
                  <span className="material-symbols-outlined text-xl">content_copy</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-surface-container-high">
              <h4 className="text-sm font-bold text-on-surface mb-4">Request Specific Amount</h4>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input 
                    className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 font-bold focus:ring-2 focus:ring-primary/20 transition-all" 
                    placeholder="0.00" 
                    type="number"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-on-surface-variant">ETH</span>
                </div>
                <button className="bg-primary text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95">Update QR</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside className="w-full lg:w-80 space-y-6">
        <div className="bg-secondary-container/30 rounded-3xl p-6 border border-secondary-container">
          <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-secondary">verified</span>
          </div>
          <h3 className="text-lg font-bold text-on-secondary-container mb-3">Verified Recipient</h3>
          <p className="text-sm text-on-secondary-container/80 leading-relaxed">Your account is verified. All incoming funds will be automatically tracked for transparency reports.</p>
        </div>
      </aside>
    </div>
  );
};

export default ReceiveFunds;
