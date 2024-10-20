import React, { useState } from "react";
import { Button, Typography, MenuItem, Select, TextField } from "@mui/material";

const Bank = ({ players, setPlayers, addTransaction }) => {
    const [fromPlayer, setFromPlayer] = useState('')
    const [toPlayer, setToPlayer] = useState('')
    const [amount, setAmount] = useState('')
    const [passGoPlayer, setPassGoPlayer] = useState('')
    const [selectedPlayer, setSelecedPlayer] = useState('')

    const transferMoney = () => {
        const fromIndex = players.findIndex(player => player.name === fromPlayer);
        const toIndex = players.findIndex(player => player.name === toPlayer)
        if (fromIndex !== -1 && toIndex !== -1 && amount > 0 && fromPlayer !== toPlayer) {
            const newPlayers = [...players];
            newPlayers[fromIndex].balance -= parseInt(amount, 10);
            newPlayers[toIndex].balance += parseInt(amount, 10);
            setPlayers(newPlayers);
            addTransaction(`Trasferito $${amount} da ${players[fromIndex].name} a ${players[toIndex].name}`);
        } else {
            console.error('Player not found or invalid amount')
        }
    };

    const addMoney = () => {
        const playerIndex = players.findIndex(player => player.name === selectedPlayer)
        if (playerIndex !== -1 && amount > 0) {
            const newPlayers = [...players]
            newPlayers[playerIndex].balance += parseInt(amount, 10)
            setPlayers(newPlayers)

            addTransaction(`${players[playerIndex].name} ha ricevuto $${amount}`)
        } else {
            console.error('Player not found or invald amount')
        }
    }

    const subtractMoney = () => {
        const playerIndex = players.findIndex(player => player.name === selectedPlayer)
        if (playerIndex !== -1 && amount > 0) {
            const newPlayers = [...players]
            newPlayers[playerIndex].balance -= parseInt(amount, 10)
            setPlayers(newPlayers)
        }
    }

    const passGo = () => {
        const playerIndex = players.findIndex(player => player.name === passGoPlayer)
        if (playerIndex !== -1) {
            const newPlayers = [...players];
            newPlayers[playerIndex].balance += 200;
            setPlayers(newPlayers);

            addTransaction(`${players[playerIndex].name} ha passato il Via e ha ricevuto $200`);
        } else {
            console.error('Player not found')
        }

    };

    return (
        <div>
            <Typography variant="h4">Banca</Typography>
            <Select
                value={selectedPlayer}
                onChange={(e) => setSelecedPlayer(e.target.value)}
                displayEmpty
                variant="outlined"
                margin="dense"
            >
                <MenuItem value="" disabled>Seleziona Giocatore</MenuItem>
                {players.map((player, index) => (
                    <MenuItem key={index} value={player.name}>{player.name}</MenuItem>
                ))}
            </Select>

            <Button variant="contained" color="primary" onClick={addMoney}>Aggiungi Soldi</Button>
            <Button variant="contained" color="primary" onClick={subtractMoney}>Togli Soldi</Button>
            <Select
                value={fromPlayer}
                onChange={(e) => setFromPlayer(e.target.value)}
                displayEmpty
                variant="outlined"
                margin="dense"
            >
                <MenuItem value="" disabled>Seleziona Giocatore (Da)</MenuItem>
                {players.map((player, index) => (
                    <MenuItem key={index} value={player.name}>{player.name}</MenuItem>
                ))}
            </Select>
            <Select
                value={toPlayer}
                onChange={(e) => setToPlayer(e.target.value)}
                displayEmpty
                variant="outlined"
                margin="dense"
            >
                <MenuItem value="" disabled>Seleziona Giocatore (A)</MenuItem>
                {players.map((player, index) => (
                    <MenuItem key={index} value={player.name}>{player.name}</MenuItem>
                ))}
            </Select>
            <TextField
                label="Importo"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                variant="outlined"
                margin="dense"
                type="number"
            />
            <Button variant="contained" color="secondary" onClick={transferMoney}>Trasferisci Denaro</Button>
            <Select
                value={passGoPlayer}
                onChange={(e) => setPassGoPlayer(e.target.value)}
                displayEmpty
                variant="outlined"
                margin="dense"
            >

                <MenuItem value="" disabled>Seleziona Giocatore per Passaggio dal Via</MenuItem>
                {players.map((player, index) => (
                    <MenuItem key={index} value={player.name}>{player.name}</MenuItem>
                ))}
            </Select>
            <Button variant="contained" color="primary" onClick={() => passGo(fromPlayer)}>Passaggio dal Via</Button>
        </div>
    );
};

export default Bank;