import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Send, Download, History, Wallet } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/send', icon: Send, label: 'Send Funds' },
    { to: '/receive', icon: Download, label: 'Receive' },
    { to: '/history', icon: History, label: 'History' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
          <Wallet className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">Ethos</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-emerald-50 text-emerald-700 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-900 rounded-2xl p-4 text-white">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Network</p>
          <p className="text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Ethereum Mainnet
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
