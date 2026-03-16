import React from 'react';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Download, Share2 } from 'lucide-react';
import { useState } from 'react';

interface ReceiveFundsProps {
  address: string | null;
}

const ReceiveFunds = ({ address }: ReceiveFundsProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Download className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Wallet Not Connected</h3>
        <p className="text-slate-500 max-w-xs mt-2">Please connect your wallet to view your receiving address and QR code.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl text-center"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Receive Funds</h2>
        <p className="text-slate-500 font-medium mb-10">Scan the QR code to receive ETH</p>

        <div className="bg-slate-50 p-8 rounded-[2rem] inline-block mb-10 border-2 border-slate-100">
          <QRCodeSVG
            value={address}
            size={200}
            level="H"
            includeMargin={false}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-6">
          <div className="relative">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-left ml-1">Your Wallet Address</p>
            <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 flex items-center justify-between gap-4">
              <code className="text-sm font-mono text-slate-700 break-all text-left">
                {address}
              </code>
              <button
                onClick={handleCopy}
                className="shrink-0 p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5 text-slate-500" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-colors">
              <Download className="w-4 h-4" />
              Save QR
            </button>
            <button className="flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReceiveFunds;
