import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';

const GroupPage = ({ groupName, userName, socket }) => {
    const [expenses, setExpenses] = useState([]);//using usestate to store expenses as it gets added
    const [messages, setMessages] = useState([]);//using usestate to store messages as it gets added
    const [transactionMessages, setTransactionMessages] = useState([]);//using usestate to store transctions as it gets updated

    useEffect(() => {
        //setting previous messages for new user
        socket.on('loadMessages', (messages) => {
            setMessages(messages);
        });

        //setting new messages 
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        //setting personalised transcations for user
        socket.on('transactions', (transactions) => {

            const messages = [];

            transactions.forEach(transaction => {
                if(transaction.to === userName){
                    messages.push(`${transaction.from} owes $${transaction.amount} to You`);
                }
            });

            transactions.forEach(transaction => {
                if(transaction.from === userName){
                    messages.push(`You owe $${transaction.amount} to ${transaction.to}`);
                }
            });

            setTransactionMessages(messages);
        });

        return () => {
            socket.off('loadMseaages');
            socket.off('message');
            socket.off('transactions');
        };
    }, [groupName, userName, socket]);

    //setting payments of user and passing it to the backend
    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
        socket.emit('sendMessage',expense);
    };

    return (
        <div className="group-page">
            <h2>Group: {groupName}</h2>
            <h2>User: {userName}</h2>
            <ExpenseForm addExpense={addExpense} />
            <div className='transactions'>
                <h2>Your Payments</h2>
                    <ul>
                        {expenses.map((expense, index) => (
                            <li key={index}>
                                {expense.description} - ${expense.amount}
                            </li>
                        ))}
                    </ul>
                <h2>Transactions</h2>
                <ul>
                    {transactionMessages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
            <div className='messages'>
                <h2>Messages</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GroupPage;
