export interface Transaction {
  id: string;
  sender: string;
  recipient: string;
  amount: string;
  purpose: string;
  status: 'Confirmed' | 'Pending' | 'Failed';
  timestamp: number;
}

export interface WalletState {
  address: string | null;
  balance: string;
  isConnected: boolean;
}
