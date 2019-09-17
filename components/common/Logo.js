import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

export const Logo = ({style, size}) => {
  return (
    <Ionicons
      style={style}
      name={'ios-code-working'}
      size={size}
      color={'#E8F3F1'}
    />
  )
}
