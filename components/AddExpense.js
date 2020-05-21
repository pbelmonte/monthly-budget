import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, Button, TextInput } from 'react-native'

import Card from './Card'
import Input from './Input'

import { pad } from '../functions/utils'
import Colors from '../constants/colors'
import Money from '../functions/money'

const AddExpense = props => {
  const [enteredValue, setEnteredValue] = useState('')
  const [enteredText, setEnteredText] = useState('')

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

  const cancelHandler = () => {
    resetValues()
    props.onCancel()
  }

  const confirmHandler = () => {
    if (enteredValue !== '' && enteredValue !== '$0') {
      const data = props.monthData
      const amount = enteredValue.replace('$', '').replace('.', '')
      const day = data.days[props.date.date - 1]

      data.expenses.push({
        text: enteredText,
        amount: parseFloat(amount),
        day: props.date.date,
      })

      day[1] = parseFloat(day[1]) + parseFloat(amount)

      resetValues()
      props.onConfirm(data)
      props.onCancel()
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
          <Text style={styles.title}>Agregar Gasto</Text>
          <View style={styles.date}>
            <Text>Fecha:</Text>
            <Text>{props.date.year}-{pad(props.date.monthNumber, 2)}-{pad(props.date.date, 2)}</Text>
          </View>
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
              <Button title="Cancelar" color="red" onPress={cancelHandler} />
            </View>
            <View style={styles.button}>
              <Button title="Confirmar" color={Colors.primary} onPress={confirmHandler} />
            </View>
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
    borderColor: Colors.tertiary,
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
  date: {
    flexDirection: 'row',
    width: 150,
    maxWidth: '95%',
    justifyContent: 'space-evenly',
    marginVertical: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {},
})

export default AddExpense