let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('price-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');
const searchInput = document.getElementById('search-input');
const navigateBtn = document.getElementById('navigate-btn');

loadExpenses();

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid price');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    let expense = { category, amount, date };
    expenses.push(expense);

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount.toFixed(2);

    addExpenseRow(expense);

    saveExpenses();
});

clearAllBtn.addEventListener('click', function() {
    expenses = [];

    totalAmount = 0;
    totalAmountCell.textContent = totalAmount.toFixed(2);

    expensesTableBody.innerHTML = '';


    saveExpenses();
});

searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    const filteredExpenses = expenses.filter(expense =>
        expense.category.toLowerCase().includes(query) ||
        expense.date.includes(query)
    );
    renderExpenses(filteredExpenses);
    calculateTotal(filteredExpenses);
});



function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
    totalAmount = 0;
    expenses.forEach(expense => {
        totalAmount += expense.amount;
        addExpenseRow(expense);
    });
    totalAmountCell.textContent = totalAmount.toFixed(2);
}

    function addExpenseRow(expense) {
    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        const index = expenses.indexOf(expense);
        if (index > -1) {
            expenses.splice(index, 1);

            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount.toFixed(2);

            newRow.remove();

            saveExpenses();
        }
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount.toFixed(2);
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
}

function renderExpenses(expensesToRender) {
    expensesTableBody.innerHTML = '';
    expensesToRender.forEach(expense => {
        addExpenseRow(expense);
    });
}

function calculateTotal(expensesToCalculate) {
    const total = expensesToCalculate.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountCell.textContent = total.toFixed(2);
}
