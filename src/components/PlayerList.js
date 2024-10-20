import React, { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText, Typography, IconButton, Collapse } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpanLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const PlayerList = ({ players, setPlayers }) => {
    const [playerName, setPlayerName] = useState('');
    const [open, setOpen] = useState({})

    const addPlayer = () => {
        setPlayers([...players, { name: playerName, properties: [], balance: 1500 }]);
        setPlayerName('')
    };

    const removePlayer = (index) => {
        const newPlayers = players.filter((_, i) => i !== index)
        setPlayers(newPlayers)
    }

    const toggleOpen = (index) => {
        setOpen(prevOpen => ({ ...prevOpen, [index]: !prevOpen[index] }))
    }

    return (
        <div>
            <Typography variant="h4">Giocatori</Typography>
            <TextField
                label="Nome giocatore"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                variant="outlined" margin="dense"
            />
            <Button variant="contained" color="primary" onClick={addPlayer}>Aggiungi Giocatore</Button>
            <List>
                {players.map((player, index) => (
                    <div key={index}>
                        <ListItem button onClick={() => toggleOpen(index)}>

                            <ListItemText primary={`${player.name} - Saldo: $${player.balance}`} />
                            {open[index] ? <ExpanLess /> : <ExpandMore />}
                            <IconButton edge="end" aria-label="delete" onClick={() => removePlayer(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                        <Collapse in={open[index]} timeout="auto" unmountOnExit>

                            <List component="div" disablePadding>{player.properties.map((property, propIndex) => (
                                <ListItem key={propIndex} sx={{ pl: 4 }}>
                                    <ListItemText primary={property.name} />
                                </ListItem>
                            ))}
                            </List>
                        </Collapse>
                    </div>
                ))}
            </List>
        </div>
    );
};

export default PlayerList