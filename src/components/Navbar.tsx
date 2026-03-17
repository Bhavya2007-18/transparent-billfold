import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  address: string | null;
  onConnect: () => void;
}

const Navbar = ({ address, onConnect }: NavbarProps) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-3xl flex justify-between items-center h-20 px-8 md:pl-80">
      <div className="flex items-center flex-grow max-w-2xl">
        <div className="relative w-full hidden md:block">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input 
            className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all" 
            placeholder="Search transactions, NGOs, or blocks..." 
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-8">
        <div className="hidden lg:flex items-center gap-6">
          <Link className="text-primary border-b-2 border-primary font-semibold py-1 text-sm" to="/">Dashboard</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-semibold text-sm" to="/history">History</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-semibold text-sm" to="/reports">Reports</Link>
        </div>

        <div className="flex items-center gap-2 bg-surface-container-highest px-4 py-2 rounded-full">
          <span className="material-symbols-outlined text-primary text-sm">account_balance_wallet</span>
          <span className="text-xs font-mono font-bold">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '0x000...000'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          {!address && (
            <button 
              onClick={onConnect}
              className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all active:scale-95"
            >
              Connect
            </button>
          )}
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/30">
            <img 
              alt="User Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCho7WfwXxhKu31q4pBcUXOuEQW1LwIvUyrQustt6d_dVU72F3O2DaSNMbRMa1Ltaz0E8K-ptTZ2VIIWU1pJ6ZQxAQewkYBLZU3LMiAoeqoNMkWqgNrUINqGlzY12nqZfVYNadHq80dRyMOgeP2gtz8NJVZmuF1CAw3KxAE6dKFiUD9-UJtS3ufitOd_scsRQBP-8IvV6bqDBOvlfhAzlefhmnax0ELBp4gyb-nmepZvKDEJ9QxllLweS7QGx6LqaOfzwWzO5mgwA"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
