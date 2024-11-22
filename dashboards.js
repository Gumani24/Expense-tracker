// Fetch and display expenses
async function loadExpenses() {
    const response = await fetch('/api/expenses/view');
    const expenses = await response.json();

    const expensesTable = document.querySelector('#expensesTable tbody');
    expensesTable.innerHTML = '';

    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td>${expense.description}</td>
            <td>
                <button onclick="editExpense(${expense.id})">Edit</button>
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        `;
        expensesTable.appendChild(row);
    });
}

loadExpenses();

// Add Expense Button Click
document.querySelector('#addExpenseBtn').addEventListener('click', () => {
    // Navigate to add expense page or show modal to add expenses
});
