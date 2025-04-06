import { useState } from 'react'
import './App.css'
import AddMedicineForm from "./components/AddMedicineForm";
import MedicineList from './components/MedicineList';

function App() {
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (!window.ethereum) return alert('🦊 MetaMask is not installed!');

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
      console.log('🟢 Connected to:', accounts[0]);
    } catch (err) {
      console.error('❌ Failed to connect:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <button
      onClick={connectWallet}
      className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold"
    >
      {account ? `Connected: ${account.slice(0, 6)}...` : '🔗 Connect Wallet'}
    </button>
      <AddMedicineForm />
      <MedicineList/>
    </div>
  );
}

export default App
