import React from "react";
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const TransactionHistory = ({ transactions }) => {

    return (
        <div>
            <Typography variant="h4">Storico delle Operazioni</Typography>
            <List>
                {transactions.map((transaction, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`${transaction.date.toLocaleString()} - ${transaction.description}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default TransactionHistory;