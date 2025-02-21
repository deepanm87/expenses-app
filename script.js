import {expenses} from "./data.js"
document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form')
    const monthSelect = document.getElementById('month')
    const yearSelect = document.getElementById('year')
    const amountInput = document.getElementById('amount')
    const expenseChart = document.getElementById('expense-chart')
    let selectedMonth
    let selectedYear
    let myChart

    for(let year = 2025; year <= 2050; year++) {
        const option = document.createElement('option')
        option.value = year
        option.textContent = year
        yearSelect.appendChild(option)
    }

    function getExpensesFromLocalStorage(month, year) {
        const key = `${month}-${year}`
        return JSON.parse(localStorage.getItem(key)) || {}
    }

    function saveExpensesToLocalStorage(month, year) {
        const key = `${month}-${year}`
        localStorage.setItem(key, JSON.stringify(expenses[month]))
    }

    function getSelectedMonthYear() {
        selectedMonth = monthSelect.value
        selectedYear = yearSelect.value
        if(!selectedMonth || !selectedYear) {
            alert('Month or year not selected')
            return
        }
        if(!expenses[selectedMonth]) {
            expenses[selectedMonth] = {
                Housing: 0,
                Food: 0,
                Transportation: 0,
                Bills: 0,
                Miscellaneous: 0
            }
        }


    }

    function updateChart() {
        getSelectedMonthYear()
        const expenseData = getExpensesFromLocalStorage(selectedMonth, selectedYear)
        Object.assign(expenses[selectedMonth], expenseData)
        const ctx =  expenseChart.getContext('2d')
        if(myChart) {
            myChart.destroy()
        }
        myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: Object.keys(expenses[selectedMonth]),
              datasets: [{
                data: Object.values(expenses[selectedMonth]),
                backgroundColor: [
                    '#FF6384',
                    '#4CAF50',
                    '#FFCE56',
                    '#36A2EB',
                    '#FF9F40'
                ],
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: $${tooltipItem.raw}`
                        }
                    }
                }
              }
            }
          });
    }


    function handleSubmit(event) {
        event.preventDefault()
        getSelectedMonthYear()

        const category = event.target.category.value
        const amount = parseFloat(event.target.amount.value)
        const currentAmount = expenses[selectedMonth][category] || 0

        if(amount > 0) {
            expenses[selectedMonth][category] = currentAmount + amount
        } else if (amount < 0 && currentAmount >= Math.abs(amount)) {
            expenses[selectedMonth][category] = currentAmount + amount
        }  else {
            alert('Invalid amount: Cannot reduce the category below zero.')
            return
        }
        saveExpensesToLocalStorage(selectedMonth, selectedYear)
        updateChart()
        amountInput.value = ''
    }

    expenseForm.addEventListener('submit', handleSubmit)
    monthSelect.addEventListener('onchange', updateChart)
    yearSelect.addEventListener('onchange', updateChart)
    

    function setDefaultMOnthYear() {
        const now = new Date()
        const initialMonth = now.toLocaleString('default', { month: 'long'})
        const initialYear = now.getFullYear()
        monthSelect.value = initialMonth
        yearSelect.value = initialYear
    }
    setDefaultMOnthYear()
    updateChart()
})