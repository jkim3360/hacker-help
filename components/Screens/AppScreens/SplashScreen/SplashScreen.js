import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class SplashScreen extends React.Component {
  render() {
    const viewStyles = [styles.container, { backgroundColor: 'orange' }]
    const textStyles = {
      color: '#333333',
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'GermaniaOne-Regular',
    }

    return (
      <View style={viewStyles}>
        <Ionicons
          name={'ios-code-working'}
          size={130}
          color={'#333333'}
        />
        
        <Text style={textStyles}>Hackmeister </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
