import React, { useState } from 'react';
import './App.css';
import PlayerList from './components/PlayerList'
import PropertyList from './components/PropertyList'
import TransactionHistory from './components/TransactionHistory';
import Bank from './components/Bank';
import { Container, Typography } from '@mui/material';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [transactions, setTransactions] = useState([])

  const addTransaction = (description) => {
    setTransactions([...transactions, {
      description, date: new Date()
    }])
  }

  return (
    <Container>
      <Typography variant='h2' align='center' gutterBottom>Banca del Monopoli</Typography>
      <PlayerList players={players} setPlayers={setPlayers} />
      <PropertyList players={players} setPlayers={setPlayers} />
      <Bank players={players} setPlayers={setPlayers} addTransaction={addTransaction} />
      <TransactionHistory transactions={transactions} />
    </Container>
  );
};

export default App;
