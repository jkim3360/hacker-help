import React, { Component } from 'react'
import { View, WebView, StyleSheet } from 'react-native'
const Browser = ({ navigation }) => {
  console.log(navigation)
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: navigation.state.params.url
            ? navigation.state.params.url
            : 'http://google.com'
        }}
      />
    </View>
  )
}
export default Browser


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  }
})
