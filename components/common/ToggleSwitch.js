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
      flatListItemTitle: this.props.flatListItemTitle,
      flatListItemScore: this.props.flatListItemScore,
      flatListItemBy: this.props.flatListItemBy,
      flatListItemUrl: this.props.flatListItemUrl,
      flatListItemId: this.props.flatListItemId
    }
  }

  async componentDidMount() {
    const topStoriesIds = await apiCall.get(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    )
    this.setState({
      topStoriesIds: topStoriesIds.data
    })
  }

  addBookMark = async () => {
    const { flatListItemId } = this.state
    await apiCall.post('/bookmarks/1/add', { api_id: flatListItemId })
  }

  removeBookMark = async () => {
    const { flatListItemId } = this.state
    await apiCall.delete(`/bookmarks/1/remove/${flatListItemId}`)
  }

  handleToggle = async value => {
    const { flatListItemId } = this.state
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
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 18 }}> Bookmark </Text>
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
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10
  }
})
