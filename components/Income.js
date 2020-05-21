import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, Button, TextInput } from 'react-native'

import Card from './Card'
import Input from './Input'
import Table from './Table'

import { pad } from '../functions/utils'
import Colors from '../constants/colors'
import Money from '../functions/money'

const Income = props => {
  const [enteredValue, setEnteredValue] = useState('')
  const [enteredText, setEnteredText] = useState('')

  const incomeData = props.monthData.income.map(data => [data.text, data.amount])

  const numberInputHandler = inputText => {
    setEnteredValue(Money(inputText.replace(/[^0-9]/g, '')))
  }

  const textInputHandler = inputText => {
    setEnteredText(inputText)
  }

  const resetValues = () => {
    setEnteredValue('')
    setEnteredText('')
  }

  const confirmHandler = () => {
    if (enteredValue !== '' && enteredValue !== '$0') {
      const data = props.monthData
      const amount = enteredValue.replace('$', '').replace('.', '')

      data.income.push({
        text: enteredText,
        amount: parseFloat(amount),
      })

      data.totalIncome += parseFloat(amount)

      resetValues()
      props.onConfirm(data)
    }
  }

  return (
    <Modal
      visible={props.visible}
      animationType="slide"
      transparent={true}
      onRequestClose={props.onCancel}
    >
      <View style={styles.container}>
        <Card style={styles.content}>
          <Text style={styles.title}>Ingresos</Text>
          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Valor:</Text>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
            </View>
            <View style={styles.textAreaInputContainer}>
              <Text style={styles.inputText}>Descripción:</Text>
              <View style={{ ...styles.textAreaContainer, ...styles.input }}>
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Escribe algo"
                  placeholderTextColor="grey"
                  numberOfLines={4}
                  multiline={true}
                  onChangeText={textInputHandler}
                  value={enteredText}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <Button title="Cancelar" color="red" onPress={resetValues} />
            </View>
            <View style={styles.button}>
              <Button title="Confirmar" color={Colors.primary} onPress={confirmHandler} />
            </View>
          </View>
          <View style={styles.tableContainer}>
            <Table data={{
              header: ['Descripción', 'Valor'],
              body: incomeData,
              footer: ['Total', Money(props.monthData.totalIncome)],
              applyColors: [false, false],
              money: [false, true],
            }} />
          </View>
          <View style={styles.button}>
            <Button title="Cerrar" color="red" onPress={props.onClose} />
          </View>
        </Card>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 380,
    maxWidth: '95%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.positive,
  },
  title: {
    fontSize: 30,
  },
  inputsContainer: {
    alignItems: 'center',
    marginVertical: 10,
    width: 350,
    maxWidth: '95%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  textAreaInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  input: {
    flex: 4,
  },
  inputText: {
    flex: 2,
  },
  textAreaContainer: {
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 50,
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {},
  tableContainer: {
    maxHeight: 200,
    marginVertical: 10,
    paddingTop: 10,
    borderTopWidth: 2,
  },
})

export default Income