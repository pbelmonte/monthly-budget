import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

import Money from '../functions/money'
import Colors from '../constants/colors'

const Table = props => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {
          props.data.header.map((cell, index) =>
            <View key={index} style={styles.cell(props.data.header.length)}>
              <Text>{cell}</Text>
            </View>
          )
        }
      </View>
      <ScrollView style={styles.body}>
        {
          props.data.body.map((row, index) =>
            <View key={index} style={styles.row}>
              {
                row.map((cell, index) =>
                  <View key={index} style={styles.cell(props.data.header.length)}>
                    <Text style={styles.styleCell(props.data.applyColors[index], cell)}>
                      {
                        props.data.money[index]
                         ? Money(cell)
                         : cell
                      }
                    </Text>
                  </View>
                )
              }
            </View>
          )
        }
      </ScrollView>
      <View style={styles.footer}>
        {
          props.data.footer.map((cell, index) =>
            <View key={index}>
              <Text>{cell}</Text>
            </View>
          )
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.primary,
  },
  body: {},
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.secondary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  cell: length => ({
    width: `${100 / length}%`,
    alignItems: 'center',
  }),
  styleCell: (applyColor, cell) => (
    applyColor
      ? cell < 0
        ? { color: Colors.negative }
        : { color: Colors.positive }
      : {}
  )
})

export default Table