import React from 'react';

//Maps payments to elements of list
const ExpenseList = ({ expenses }) => {
    return (
        <ul>
            {expenses.map((expense, index) => (
                <li key={index}>
                    {expense.description} - ${expense.amount}
                </li>
            ))}
        </ul>
    );
};

export default ExpenseList;
