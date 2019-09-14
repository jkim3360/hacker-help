import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Text,
  View,
  Switch,
  Alert,
  AsyncStorage
} from 'react-native'
import BookMarks from '../Screens/AppScreens/BookMarks/BookMarks'


export default class ToggleSwitch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flatListItemTitle: this.props.flatListItemTitle,
      flatListItemScore: this.props.flatListItemScore,
      flatListItemBy: this.props.flatListItemBy,
      flatListItemUrl: this.props.flatListItemUrl,
      flatListItemId: this.props.flatListItemId
    }
  }

  storeData = async () => {
    try {
      const set = await AsyncStorage.multiSet([
        [`flatListItemScore_${this.state.flatListItemId}`, this.state.flatListItemScore.toString()],
        [`flatListItemTitle_${this.state.flatListItemId}`, this.state.flatListItemTitle],
        [`flatListItemBy_${this.state.flatListItemId}`, this.state.flatListItemBy],
        [`flatListItemUrl_${this.state.flatListItemId}`, this.state.flatListItemUrl],
        [`flatListItemId_${this.state.flatListItemId}`, this.state.flatListItemId.toString()]
      ])
    } catch (error) {
      throw error
    }
  }

  retrieveData = async () => {
    try {
      const get = await AsyncStorage.multiGet([
        `flatListItemTitle_${this.state.flatListItemId}`,
        `flatListItemScore_${this.state.flatListItemId}`,
        `flatListItemBy_${this.state.flatListItemId}`,
        `flatListItemUrl_${this.state.flatListItemId}`,
        `flatListItemId_${this.state.flatListItemId}`
      ])
      console.log(get)
    } catch (error) {
      throw error
    }
  }

  removeData = async () => {
    try {
      const remove = await AsyncStorage.multiRemove([
        `flatListItemTitle_${this.state.flatListItemId}`,
        `flatListItemScore_${this.state.flatListItemId}`,
        `flatListItemBy_${this.state.flatListItemId}`,
        `flatListItemUrl_${this.state.flatListItemId}`,
        `flatListItemId_${this.state.flatListItemId}`
      ])
    } catch (error) {
      throw error
    }
  }

  handleToggle = value => {
    this.setState({
      SwitchOnValueHolder: value
    })
    if (value == true) {
      this.storeData()
      this.props.navigation.navigate('BookMarks', {
        url: item.url
      })
      // console.log('Data stored')
      this.retrieveData()
    } else {
      this.removeData()
      // console.log('Data deleted')
      this.retrieveData()
    }
  }
  render() {
   console.log(this.props.navigation)
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 18 }}> Bookmark </Text>
        <Switch
          onValueChange={value => this.handleToggle(value)}
          style={{ marginBottom: 10 }}
          value={this.state.SwitchOnValueHolder}
        />
        {/* <BookMarks /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10
  }
})
