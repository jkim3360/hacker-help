import React, { Component } from 'react'
import { View, WebView, TextInput, StyleSheet, Button } from 'react-native'
import { Input } from '../../../common'
import { textColor, danger } from '../../../styles/Colors'

const Browser = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Input /> */}

      <WebView
        source={{
          uri: navigation.state.params.url
            ? navigation.state.params.url
            : 'https://www.stackoverflow.com/'
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
  },
  input: {
    backgroundColor: 'white',
    color: '#333333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'stretch',
    borderRadius: 20
  },
  inputError: {
    borderWidth: 2,
    borderColor: danger
  },
  text: {
    alignSelf: 'flex-start',
    color: textColor,
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'Avenir'
  },
  inputFocus: {
    borderWidth: 2,
    borderColor: textColor
  }
})
