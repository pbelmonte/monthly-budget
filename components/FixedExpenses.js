import React from 'react'
import { View, Text, StyleSheet, Modal, Button } from 'react-native'

const FixedExpenses = props => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <Text>Fixed Expenses</Text>
      </View>
      <View style={styles.button}>
        <Button title="Close" color="red" onPress={props.onClose} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {},
})

export default FixedExpenses