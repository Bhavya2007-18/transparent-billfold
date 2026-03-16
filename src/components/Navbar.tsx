import React from 'react';
import { Bell, Search, User, Wallet } from 'lucide-react';

interface NavbarProps {
  address: string | null;
  onConnect: () => void;
}

const Navbar = ({ address, onConnect }: NavbarProps) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions, NGOs..."
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
        </button>

        {address ? (
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Wallet className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-500 font-medium">Connected Wallet</p>
              <p className="text-sm font-bold text-slate-900">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={onConnect}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-200"
          >
            Connect Wallet
          </button>
        )}

        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
          <User className="w-6 h-6 text-slate-400" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
