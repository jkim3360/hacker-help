import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  LayoutAnimation,
  ActivityIndicator
} from 'react-native'
import { Input, Header } from '../../../common/'
import ToggleSwitch from '../../../common/ToggleSwitch'
const screenWidth = Math.round(Dimensions.get('window').width)
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import apiData from '../../../../services/apiData'

export default class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      topStoriesIds: [],
      topStoriesData: [],
      filterArray: [],
      search: '',
      searchResult: [],
      isLoading: false,
      bookMarked: false
    }
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut()
  }

  static navigationOptions = {
    title: 'Hacker Help'
  }

  async componentDidMount() {
    await this.getTopStoriesId()
    await this.getTopStories()
  }

  // get ids for urls
  getTopStoriesId = async () => {
    const topStoriesIds = await axios.get(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    )
    // console.log(topStoriesIds)
    this.setState({
      topStoriesIds: topStoriesIds.data
    })
    this.state.topStoriesIds
  }

  getTopStories = async () => {
    apiData.apiData.forEach(async element => {
      const story = await axios.get(element)
      //  console.log(story.data)
      this.setState({
        topStoriesData: [...this.state.topStoriesData, story.data],
        isLoading: false,
        filterArray: []
      })
    })

    // topStoriesIds.forEach(async element => {
    //     const story = await axios.get(
    //       `https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`
    //     )
    //     console.log(story)
    //     this.setState({
    //       topStoriesData: [...this.state.topStoriesData, story.data],
    //       isLoading: false,
    //       filterArray: []
    //     })
    //   })

    // console.log(this.state.topStoriesData)
    // const { topStoriesIds } = this.state
    // // console.log(topStoriesIds)
    // this.setState({ isLoading: true })
    // console.log(apiData.apiData)
    // topStoriesIds.map(async element=> {
    //   console.log(`https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`)
    // })
  }

  handleChange = async search => {
    this.setState({ isLoading: true })
    const filteredValue = this.state.topStoriesData.filter(article =>
      article.title.toLowerCase().includes(search.toLowerCase())
    )
    this.setState({ topStoriesData: filteredValue, isLoading: false })
    if (this.state.search.length < 2) await this.getTopStories()
  }

  toggleMeeting() {
    this.setState({
      bookMarked: !this.state.isMeetingStarted
    })
  }

  render() {
    // console.log(this.state.topStoriesData)
    const { search } = this.state
    const { navigate } = this.props.navigation
    return (
      <Fragment>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={styles.container}>
            <Header>
              <View style={styles.title}>
                <Ionicons
                  style={{ marginTop: 40 }}
                  name={'ios-code-working'}
                  size={130}
                  color={'#333333'}
                />
                <Text style={styles.titleText}>Hacker Help</Text>
              </View>
              <Input
                onChangeText={search => this.handleChange(search)}
                placeholder={'Search'}
              ></Input>
            </Header>
            <Text onPress={() => navigate('Article')}></Text>
            <View style={{ width: screenWidth }}></View>
          </View>
          <View style={styles.flatListView}>
            {this.state.isLoading === true ? (
              <ActivityIndicator size="large" />
            ) : (
              <FlatList
                keyExtractor={(item, index) => String(index)}
                style={styles.flatList}
                data={this.state.topStoriesData}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.flatListItem}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Article', {
                            url: item.url
                          })
                        }
                      >
                        <Text style={styles.title}>{item.title}</Text>
                      </TouchableOpacity>
                      <Text style={styles.details}>
                        {item.score} Points by {item.by}
                      </Text>
                      <ToggleSwitch
                        topStoriesData={this.state.topStoriesData}
                        flatListItemTitle={item.title}
                        flatListItemScore={item.score}
                        flatListItemBy={item.by}
                        flatListItemUrl={item.url}
                        flatListItemId={item.id}
                      />
                    </View>
                  )
                }}
              />
            )}
          </View>
        </View>
      </Fragment>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  flatListView: {
    margin: 3,
    flex: 2
  },
  flatList: {
    margin: 3,
    flex: 2
  },
  flatListItem: {
    margin: 5,
    borderBottomWidth: 5,
    borderBottomColor: '#f6f6f6'
  },
  listStyle: {
    alignSelf: 'stretch',
    flex: 1
  },
  searchBar: {
    marginTop: -10,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 18,
    flexShrink: 1
  },
  details: {
    fontSize: 11
  },
  titleText: {
    marginTop: -25,
    fontSize: 16,
    alignSelf: 'center',
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
