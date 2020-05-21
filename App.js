import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'

export default function App() {
  let content = <HomeScreen />

  return (
    <View style={styles.screen}>
      <Header title="Presupuesto Mensual" />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
})
