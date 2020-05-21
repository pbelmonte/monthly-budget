import { pad } from '../functions/utils'

const daysArray = (year, month, numberOfDays) => {
  let days = []

  for (let i = 1; i <= numberOfDays; i++) {
    days.push([
      `${year}-${pad(month, 2)}-${pad(i, 2)}`,
      0,
      0,
      0
    ])
  }

  return days
}

export default (year, month, numberOfDays) => ({
  income: [],
  totalIncome: 0,
  savings: 0,
  fixedExpenses: [],
  totalFixedExpenses: 0,
  totalExpenses: 0,
  monthlyBudget: 0,
  dailyBudget: 0,
  numberOfDays: numberOfDays,
  days: daysArray(year, month, numberOfDays),
  expenses: [],
})