import {expenses} from "./data.js"
document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form')
    const monthSelect = document.getElementById('month')
    const yearSelect = document.getElementById('year')
    const amountInput = document.getElementById('amount')
    const expenseChart = document.getElementById('expense-chart')

    for(let year = 2020; year <= 2040; year++) {
        const option = document.createElement('option')
        option.value = year
        option.textContent = year
        yearSelect.appendChild(option)
    }

    function handleSubmit(event) {
        event.preventDefault()
    }

    expenseForm.addEventListener('submit', handleSubmit)
    

    function setDefaultMOnthYear() {
        const now = new Date()
        const initialMonth = now.toLocaleString('default', { month: 'long'})
        const initialYear = now.getFullYear()
        monthSelect.value = initialMonth
        yearSelect.value = initialYear
    }
    setDefaultMOnthYear()
})