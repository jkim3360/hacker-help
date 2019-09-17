import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const ViewContainer = () => {
  return (
    <View
      style={{
        flexDirection: 'column',
        height: 100,
        padding: 20,
      }}
    >
      <View style={{ backgroundColor: 'red', flex: 0.5, }}>
        <Text style={{ textAlign: 'center' }}>Hey</Text>
      </View>
    </View>
  )
}
