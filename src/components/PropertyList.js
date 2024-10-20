import React, { useState } from "react";
import { List, ListItem, ListItemText, Button, Typography, Select, MenuItem } from "@mui/material";

const PropertyList = ({ players, setPlayers }) => {
    const [properties, setProperties] = useState([
        { name: 'Viale dei Giardini', price: 200 },
        { name: 'Parco della Vittora', price: 400 }
    ]);

    const [selectedPlayer, setSelectedPlayer] = useState('');

    const buyProperty = (property) => {
        const playerIndex = players.findIndex(player => player.name === selectedPlayer);
        if (playerIndex !== -1) {

            const newPlayers = [...players];

            newPlayers[playerIndex].properties.push(property);
            newPlayers[playerIndex.balance] -= property.price;
            setPlayers(newPlayers);
            setProperties(properties.filter(p => p.name !== property.name));
        } else {
            console.error('Player not found')
        }
    };

    return (
        <div>
            <Typography variant="h4">Proprietà Disponibili</Typography>
            <Select
                value={selectedPlayer}
                onChange={(e) => setSelectedPlayer(e.target.value)}
                displayEmpty
                variant="outlined"
                margin="dense"
            >
                <MenuItem value="" disabled>Seleziona Giocatore</MenuItem>
                {players.map((player, index) => (
                    <MenuItem key={index} value={player.name}>{player.name}</MenuItem>
                ))}
            </Select>
            <List>
                {properties.map((property, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`${property.name} - $${property.price}`} />
                        <Button variant="contained" color="secondary" onClick={() => buyProperty(property)}>Compra</Button>
                    </ListItem>
                ))}
            </List>
        </div>
    )
};
export default PropertyList;