import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import SendFunds from './pages/SendFunds';
import ReceiveFunds from './pages/ReceiveFunds';
import Transactions from './pages/Transactions';
import { connectWallet, getWalletBalance } from './blockchain/walletConnect';
import { Transaction, WalletState } from './types';

export default function App() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: '0.00',
    isConnected: false,
  });
  const [signer, setSigner] = useState<any>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Mock data initialization
  useEffect(() => {
    setTransactions([
      {
        id: '0x7a2b...c3d4',
        sender: '0x1234...5678',
        recipient: '0xNGO...Relief',
        amount: '-0.02',
        purpose: 'Flood Relief',
        status: 'Verified',
        timestamp: Date.now() - 3600000,
      },
      {
        id: '0x9e1f...a8b7',
        sender: '0x8765...4321',
        recipient: '0x1234...5678',
        amount: '0.05',
        purpose: 'Micro-loan Return',
        status: 'Verified',
        timestamp: Date.now() - 86400000,
      },
      {
        id: '0x4c5d...e6f7',
        sender: '0x1234...5678',
        recipient: '0xAid...Dist',
        amount: '-0.01',
        purpose: 'Aid Distribution',
        status: 'Verified',
        timestamp: Date.now() - 10000,
      },
    ]);
    setWallet(prev => ({ ...prev, balance: '12450.00' }));
  }, []);

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
      // Mock for development if extension not found
      setWallet({
        address: '0x8a2f...421',
        balance: '12450.00',
        isConnected: true,
      });
    }
  };

  const refreshBalance = async () => {
    if (wallet.address) {
      try {
        const balance = await getWalletBalance(wallet.address);
        setWallet(prev => ({ ...prev, balance }));
      } catch (e) {
        console.log("Using mock balance refresh");
      }
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
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <Navbar address={wallet.address} onConnect={handleConnect} />
      
      <main className="md:pl-72 pt-20 min-h-screen">
        <div className="p-8">
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
