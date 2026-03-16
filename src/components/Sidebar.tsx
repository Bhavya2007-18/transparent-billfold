import React from 'react';
import { NavLink } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: 'dashboard', label: 'Dashboard' },
    { to: '/send', icon: 'send', label: 'Send Funds' },
    { to: '/receive', icon: 'payments', label: 'Receive Funds' },
    { to: '/history', icon: 'receipt_long', label: 'Transactions' },
    { to: '#', icon: 'monitoring', label: 'Impact Tracker' },
    { to: '#', icon: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-surface-container-low flex flex-col py-8 px-4 z-40 hidden md:flex border-none">
      <div className="px-2 mb-8">
        <div className="flex flex-col">
          <span className="text-2xl font-black text-primary tracking-tighter">Lucid Ledger</span>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-70">Transparency Platform</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-3 gap-3 my-1 mx-2 rounded-xl transition-all duration-300 active:scale-[0.98]",
                isActive
                  ? "bg-surface-container-lowest text-primary font-bold shadow-sm"
                  : "text-on-surface-variant font-medium hover:bg-surface-container-highest"
              )
            }
          >
            <span className="material-symbols-outlined text-[20px]" style={item.icon === 'dashboard' ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {item.icon}
            </span>
            <span className="text-sm tracking-tight">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-6 mt-auto">
        <button className="w-full bg-primary text-white rounded-xl py-3 font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20">
          Connect New Wallet
        </button>
        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-surface-container-highest">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-on-surface">Alex Rivers</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-black uppercase w-max">Verified Donor</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
