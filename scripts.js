// Handle user login
document.querySelector('#loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.success) {
        window.location.href = 'dashboard.html';
    } else {
        alert('Login failed: ' + data.message);
    }
});

// Handle user registration
document.querySelector('#registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
    });

    const data = await response.json();
    if (data.success) {
        window.location.href = 'login.html';
    } else {
        alert('Registration failed: ' + data.message);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Handle logout
    document.getElementById('logout')?.addEventListener('click', () => {
      fetch('/auth/logout', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            window.location.href = 'login.html';
          }
        });
    });
  
    const loadExpenses = () => {
      fetch('/expenses')
        .then(response => response.json())
        .then(data => {
          const expensesList = document.getElementById('expenses-list');
          expensesList.innerHTML = '';
          data.forEach(expense => {
            const div = document.createElement('div');
            div.innerHTML = `
              <h3>${expense.amount} - ${expense.description}</h3>
              <p>Date: ${new Date(expense.date).toLocaleDateString()}</p>
              <p>Category: ${expense.category.name}</p>
              <p>Payment Method: ${expense.paymentMethod.name}</p>
            `;
            expensesList.appendChild(div);
          });
        });
    };
  
    if (window.location.pathname === '/dashboard.html') {
      loadExpenses();
    }
  });  