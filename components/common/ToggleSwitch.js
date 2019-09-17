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
import { apiCall } from '../../services/apiServices'
import axios from 'axios'

export default class ToggleSwitch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topStoriesIds: [],
      api_id: this.props.flatListItemId,
      title: this.props.flatListItemTitle,
      url: this.props.flatListItemUrl,
      score: this.props.flatListItemScore,
      by: this.props.flatListItemBy
    }
  }

  addBookMark = async () => {
    const { api_id, title, score, by, url } = await this.state
    await apiCall.post('/bookmarks/1/add', { api_id, title, score, by, url })
  }

  removeBookMark = async () => {
    const { api_id } = this.state
    await apiCall.delete(`/bookmarks/1/remove/${api_id}`)
  }

  handleToggle = async value => {
    this.setState({
      SwitchOnValueHolder: value
    })
    if (value == true) {
      this.addBookMark()
    } else {
      this.removeBookMark()
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.text}> Save </Text>
        <Switch
          onValueChange={value => this.handleToggle(value)}
          style={{ marginBottom: 10 }}
          value={this.state.SwitchOnValueHolder}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 3
  },
  text: {
    fontSize: 17,
    marginBottom: 9,
    fontFamily: 'Avenir'
  }
})
