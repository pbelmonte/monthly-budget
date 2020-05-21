import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'

import Money from '../functions/money'
import { today, daysInMonth } from '../functions/date'
import Colors from '../constants/colors'
import { pad } from '../functions/utils'
import emptyMonth from '../functions/emptyMonth'

import Table from '../components/Table'
import Income from '../components/Income'
import FixedExpenses from '../components/FixedExpenses'
import AddExpense from '../components/AddExpense'
import Card from '../components/Card'

const HomeScreen = props => {
  const todayDate = today()
  const emptyMonthData = emptyMonth(todayDate.year, todayDate.monthNumber, daysInMonth(todayDate.monthNumber, todayDate.year))

  const [incomeOpen, setIncomeOpen] = useState(false)
  const [fixedExpensesOpen, setFixedExpensesOpen] = useState(false)
  const [addExpenseOpen, setAddExpenseOpen] = useState(false)
  const [monthData, setMonthData] = useState(emptyMonthData)
  const [start, setStart] = useState(true)

  const computeBudgets = () => {
    const data = monthData

    data.monthlyBudget = parseInt(data.totalIncome) - parseInt(data.savings) - parseInt(data.totalFixedExpenses)

    data.dailyBudget = parseInt(data.monthlyBudget) / daysInMonth(todayDate.monthNumber, todayDate.year)

    data.days.forEach((day, index) => {
      day[2] = parseInt(data.dailyBudget) + (index === 0 ? 0 : parseInt(data.days[index - 1][3]))
      day[3] = parseInt(day[2]) - parseInt(day[1])
    })

    setMonthData(data)
  }

  useEffect(() => {
    if (start) {
      computeBudgets()

      setStart(false)
    }
  }, [start])

  const incomeCloseHandler = () => {
    setIncomeOpen(false)
  }

  const addIncomeHandler = data => {
    setMonthData(data)
    computeBudgets()
  }

  const fixedExpensesCloseHandler = () => {
    setFixedExpensesOpen(false)
  }

  const addExpenseCancelHandler = () => {
    setAddExpenseOpen(false)
  }

  const addExpenseHandler = data => {
    setMonthData(data)
    computeBudgets()
  }

  return (
    <View style={styles.screen}>
      <Income
        visible={incomeOpen}
        monthData={monthData}
        onClose={incomeCloseHandler}
        onConfirm={addIncomeHandler}
      />
      <FixedExpenses visible={fixedExpensesOpen} onClose={fixedExpensesCloseHandler} />
      <AddExpense
        visible={addExpenseOpen}
        onCancel={addExpenseCancelHandler}
        date={todayDate}
        monthData={monthData}
        onConfirm={addExpenseHandler}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.openIncomeButton }}
          onPress={() => setIncomeOpen(true)}
        >
          <Text>Ingresos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.fixedExpensesButton }}
          onPress={() => setFixedExpensesOpen(true)}
        >
          <Text>Gastos Fijos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.addExpenseButton }}
          onPress={() => setAddExpenseOpen(true)}
        >
          <Text>Agregar Gasto</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.monthContainer}>
        <Text style={styles.monthText}>{todayDate.monthSpanish} {todayDate.year}</Text>
      </View>
      <View style={styles.date}>
        <Text>Fecha:</Text>
        <Text style={styles.dateDate}>{todayDate.year}-{pad(todayDate.monthNumber, 2)}-{todayDate.date}</Text>
      </View>
      <Card style={styles.budgetsContainer}>
        <Text style={styles.budgetTitle}>Presupuesto</Text>
        <View style={styles.budgetContainer}>
          <Text>Mensual:</Text>
          <Text style={styles.budget}>{Money(monthData.monthlyBudget)}</Text>
        </View>
        <View style={styles.budgetContainer}>
          <Text>Diario:</Text>
          <Text style={styles.budget}>{Money(monthData.dailyBudget)}</Text>
        </View>
        <View style={styles.budgetContainer}>
          <Text>Hoy:</Text>
          <Text style={styles.budget}>{Money(monthData.days[todayDate.date - 1][2])}</Text>
        </View>
      </Card>
      <Table data={{
        header: ['Fecha', 'Gastos', 'Presupuesto', 'Saldo'],
        body: monthData.days,
        footer: ['Total', Money(monthData.totalExpenses), Money(monthData.days[monthData.days.length - 1][2]), Money(monthData.days[monthData.days.length - 1][3])],
        applyColors: [false, false, true, true],
        money: [false, true, true, true],
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  openIncomeButton: {
    backgroundColor: Colors.positive,
  },
  fixedExpensesButton: {
    backgroundColor: Colors.secondary,
  },
  addExpenseButton: {
    backgroundColor: Colors.tertiary,
  },
  monthContainer: {
    marginVertical: 5,
  },
  monthText: {
    fontSize: 26,
  },
  date: {
    flexDirection: 'row',
    width: 140,
    maxWidth: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateDate: {
    fontSize: 18,
  },
  budgetsContainer: {
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    width: 250,
    maxWidth: '80%',
    borderColor: Colors.secondary,
  },
  budgetTitle: {
    fontSize: 24,
    marginBottom: 2,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    maxWidth: '95%',
    marginVertical: 2,
  },
  budget: {
    fontSize: 20,
    marginLeft: 20,
  },
})

export default HomeScreen