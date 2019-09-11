import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Header, Input, ViewContainer } from '../../../common/'
import axios from 'axios'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Hacker Help',
    topStoriesId: []
  }

  async componentDidMount() {
    await this.getTopStoriesId()
    await this.getStories()
  }

  getTopStoriesId = async () => {
    const topStoriesId = await axios.get(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    )
    this.setState({
      topStoriesId: topStoriesId
    })
  }

  getStories = async () => {
    const stories = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/9127232.json?print=pretty`
    )
    console.log(stories)
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Welcome</Text>
        </View>
        <Input>Search</Input>

        <Text onPress={() => navigate('Article')}>
          <Text>Article</Text>
        </Text>
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
  },
  topContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  bottomContainer: {
    flex: 4,
    justifyContent: 'center'
  },
  listStyle: {
    alignSelf: 'stretch',
    flex: 1
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 0
  },
  titleText: {
    marginTop: 50,
    // margin and height have to be integers for react native to pick up
    // color: textColor,
    fontSize: 18,
    fontWeight: '700'
    // fontweight take string for some reason
  },
  card: {
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
    flexDirection: 'row',
    marginTop: 20,
    padding: 10,
    flex: 1
  },
  image: {
    height: 32,
    width: 32,
    marginRight: 5
  },
  text: {
    alignSelf: 'center',
    // color: textColor,
    fontSize: 18
  }
})
