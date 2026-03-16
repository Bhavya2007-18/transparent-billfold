import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SendFunds from './pages/SendFunds';
import ReceiveFunds from './pages/ReceiveFunds';
import Transactions from './pages/Transactions';
import { connectWallet, getWalletBalance } from './blockchain/walletConnect';
import { Transaction, WalletState } from './types';

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '0x7a2b...c3d4',
    sender: '0x1234...5678',
    recipient: '0xNGO...Relief',
    amount: '-0.02',
    purpose: 'Flood Relief',
    status: 'Confirmed',
    timestamp: Date.now() - 3600000,
  },
  {
    id: '0x9e1f...a8b7',
    sender: '0x8765...4321',
    recipient: '0x1234...5678',
    amount: '0.05',
    purpose: 'Micro-loan Return',
    status: 'Confirmed',
    timestamp: Date.now() - 86400000,
  },
  {
    id: '0x4c5d...e6f7',
    sender: '0x1234...5678',
    recipient: '0xAid...Dist',
    amount: '-0.01',
    purpose: 'Aid Distribution',
    status: 'Pending',
    timestamp: Date.now() - 10000,
  },
  {
    id: '0x1a2b...3c4d',
    sender: '0xNGO...Relief',
    recipient: '0x1234...5678',
    amount: '0.10',
    purpose: 'Grant Received',
    status: 'Confirmed',
    timestamp: Date.now() - 172800000,
  },
];

export default function App() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: '0.00',
    isConnected: false,
  });
  const [signer, setSigner] = useState<any>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  const handleConnect = async () => {
    try {
      const data = await connectWallet();
      setWallet({
        address: data.address,
        balance: data.balance,
        isConnected: true,
      });
      setSigner(data.signer);
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  const refreshBalance = async () => {
    if (wallet.address) {
      const balance = await getWalletBalance(wallet.address);
      setWallet(prev => ({ ...prev, balance }));
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          handleConnect();
        } else {
          setWallet({ address: null, balance: '0.00', isConnected: false });
          setSigner(null);
        }
      });
    }
  }, []);

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          <Navbar address={wallet.address} onConnect={handleConnect} />
          
          <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
            <Routes>
              <Route 
                path="/" 
                element={<Dashboard balance={wallet.balance} address={wallet.address} transactions={transactions} />} 
              />
              <Route 
                path="/send" 
                element={<SendFunds signer={signer} onTransactionComplete={refreshBalance} />} 
              />
              <Route 
                path="/receive" 
                element={<ReceiveFunds address={wallet.address} />} 
              />
              <Route 
                path="/history" 
                element={<Transactions transactions={transactions} />} 
              />
            </Routes>
          </main>
          
          <footer className="p-8 text-center text-slate-400 text-sm font-medium">
            <p>© 2026 Ethos Blockchain Wallet. Built for Social Impact.</p>
          </footer>
        </div>
      </div>
    </Router>
  );
}
