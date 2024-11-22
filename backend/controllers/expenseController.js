const Expense = require('../models/expense');
const Category = require('./models/category');
const PaymentMethod = require('./models/paymentMethod');
const Budget = require('../models/budget');

// Add a new expense
exports.addExpense = async (req, res) => {
    try {
        const { amount, date, description, categoryId, paymentMethodId } = req.body;
        const newExpense = await Expense.create({
            amount,
            date,
            description,
            categoryId,
            paymentMethodId
        });
        res.status(201).json(newExpense);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all expenses
exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll({
            include: [
                { model: Category },
                { model: PaymentMethod }
            ]
        });
        res.status(200).json(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a specific expense by ID
exports.getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findByPk(req.params.id, {
            include: [
                { model: Category },
                { model: PaymentMethod }
            ]
        });
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an expense
exports.updateExpense = async (req, res) => {
    try {
        const { amount, date, description, categoryId, paymentMethodId } = req.body;
        const [updated] = await Expense.update(
            { amount, date, description, categoryId, paymentMethodId },
            { where: { id: req.params.id } }
        );
        if (updated) {
            const updatedExpense = await Expense.findByPk(req.params.id);
            res.status(200).json(updatedExpense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
    try {
        const deleted = await Expense.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};