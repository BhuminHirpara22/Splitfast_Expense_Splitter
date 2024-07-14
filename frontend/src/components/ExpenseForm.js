import React, { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
    const [description, setDescription] = useState('');//using usestate to store description as it gets updated
    const [amount, setAmount] = useState('');//using usestate to store amount as it gets updated

    //Adds description and amount to expenses and unsets them
    const handleSubmit = (e) => {
        e.preventDefault();
        if (description && amount) {
            addExpense({ description: description, amount: amount.toString() });
            setDescription('');
            setAmount('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;
