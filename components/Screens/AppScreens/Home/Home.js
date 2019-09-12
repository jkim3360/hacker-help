import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  FlatList,
  Dimensions
} from 'react-native'
import { Button, Header, Input, ViewContainer } from '../../../common/'
const screenWidth = Math.round(Dimensions.get('window').width)


import axios from 'axios'

export default class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      topStoriesIds: [],
      topStoriesData: []
    }
  }

  static navigationOptions = {
    title: 'Hacker Help'
  }
  async componentDidMount() {
    await this.getTopStoriesId()
    await this.getTopStories()
    // console.log(this.state.topStoriesdata)
  }

  getTopStoriesId = async () => {
    const topStoriesIds = await axios.get(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    )
    // console.log(topStoriesIds.data)
    this.setState({
      topStoriesIds: topStoriesIds.data
    })
  }

  getTopStories = async () => {
    const { topStoriesIds } = this.state

    const storiesData = await topStoriesIds.map(async element => {
      const story = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`
      )
      // console.log(story)
      this.setState(prevState => {
        return (this.state.topStoriesData = [
          ...prevState.topStoriesData,
          story.data
        ])
      })
    })
  }

  renderTopStories = () => {
    return this.state.topStoriesData.map((element, index) => {
      let url = element.url
      return (
        <Text
          key={index}
          style={{ color: 'blue' }}
          onPress={() => Linking.openURL(url)}
        >
          {element.title}
        </Text>
      )
    })
  }

  renderTest = () => {
    return (
      <Text
        style={{ color: 'blue' }}
        onPress={() =>
          Linking.openURL(
            `https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`
          )
        }
      >
        Story
      </Text>
    )
  }

  render() {
    const { topStoriesIds } = this.state
    // console.log(this.state.topStoriesData)
    const { navigate } = this.props.navigation
    return (
      <ScrollView>
        <View style={styles.container}>
          <Header>
            <View style={styles.title}>
              <Text style={styles.titleText}>Search</Text>
            </View>
            <Input></Input>
          </Header>
          <Text onPress={() => navigate('Article')}>
            <Text>Article</Text>
          </Text>
          <View style={{ width: screenWidth }}>
            <FlatList />
            <ScrollView>{this.renderTopStories()}</ScrollView>
          </View>
        </View>
      </ScrollView>
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
  searchBar: {
    backgroundColor: 'white'
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
    fontWeight: '700',
    color: '#333333'
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
