import React from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import {
  background,
  textColor,
  danger,
  placeHolderColor
} from '../styles/Colors'

export const Input = ({
  label,
  value,
  onChangeText,
  style,
  secureTextEntry,
  placeholder,
  error,
  focused
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        value={value}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={placeHolderColor}
        autoCompleteType="off"
        autoCapitalize="none"
        clearButtonMode="while-editing"
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        style={[
          error
            ? [styles.input, styles.inputError, style]
            : [styles.input, style],
          focused
            ? [styles.input, style, styles.inputFocus]
            : [styles.input, style]
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: 350,
    marginBottom: 20
  },
  input: {
    backgroundColor: 'white',
    color: '#333333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'stretch',
    borderRadius: 20,
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
