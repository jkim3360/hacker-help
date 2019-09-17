import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { Input, Header, Logo } from '../../../common/'
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
      search: '',
      isLoading: true,
      searchResults: []
    }
  }

  componentWillUpdate() {
    // LayoutAnimation.linear()
  }

  static navigationOptions = {
    title: 'Hackmeister'
  }

  async componentDidMount() {
    // await this.props.navigation.navigate('Splash')

    await this.getTopStories()
    await this.fetchArticles()
  }

  getTopStories = async () => {
    apiData.apiData.forEach(async element => {
      const story = await axios.get(element)
      this.setState({
        topStoriesData: [...this.state.topStoriesData, story.data],
        isLoading: false
      }) // await this.props.navigation.navigate('App')
    })
  }

  // fetchArticles = async () => {
  //   const { search } = this.state
  //   console.log('hello')
  //   const searchResults = await axios.get(
  //     `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=javascript&site=stackoverflow`
  //   )
  //   console.log(searchResults.data)
  //   // title view_count owner.user_id link question_id
  //   this.setState({
  //     searchResults: searchResults.data.items
  //   })
  //   console.log(searchResults)

  //   // searchResults.data.items.forEach(element => {
  //   // })
  // }

  handleChange = async search => {
    this.setState({ isLoading: true })
    const filteredValue = this.state.topStoriesData.filter(article =>
      article.title.toLowerCase().includes(search.toLowerCase())
    )
    this.setState({ topStoriesData: filteredValue, isLoading: false })
    if (this.state.search.length < 2) await this.getTopStories()
  }

  render() {
    const { search } = this.state
    const { navigate } = this.props.navigation
    return (
      <Fragment>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={styles.container}>
            {/* header */}
            <Header>
              <View style={styles.title}>
                <Logo style={styles.logo} size={80} />
                <Text style={styles.titleText}>Hackmeister</Text>
              </View>
            </Header>
          </View>
          <View style={styles.flatListView}>
            <View style={styles.inputContainer}>
              <Input
                onChangeText={search => this.handleChange(search)}
                placeholder={'Search'}
              />
            </View>
            {this.state.isLoading === true ? (
              <ActivityIndicator style={{ marginTop: 100 }} size="large" />
            ) : (
              <FlatList
                keyExtractor={(item, index) => String(index)}
                style={styles.flatList}
                data={this.state.topStoriesData}
                initialNumToRender={10}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.flatListItem}>
                      <Ionicons
                        style={{ marginTop: 5, marginLeft: 9 }}
                        name={'md-paper'}
                        size={30}
                        color={'#333333'}
                      />
                      <View style={styles.flatListItemTop}>
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
                          {item.score} points by {item.by}
                        </Text>
                      </View>
                      <View>
                        <ToggleSwitch
                          topStoriesData={this.state.topStoriesData}
                          flatListItemTitle={item.title}
                          flatListItemScore={item.score}
                          flatListItemBy={item.by}
                          flatListItemUrl={item.url}
                          flatListItemId={item.id}
                        />
                      </View>
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
    flex: 0.659,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    marginTop: 22
  },
  flatListView: {
    width: screenWidth,
    margin: 0,
    flex: 4
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.1,
    backgroundColor: '#E8F3F1'
  },
  flatList: {
    flex: 2
  },
  flatListItem: {
    flexDirection: 'row',
    margin: 5,
    borderBottomWidth: 5,
    borderBottomColor: '#f6f6f6'
  },
  flatListItemTop: {
    flex: 1,
    marginLeft: 10
  },
  searchBar: {
    marginTop: -10,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 18,
    flexShrink: 1,
    lineHeight: 25,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Avenir'
  },
  details: {
    fontSize: 11,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'Avenir'
  },
  titleText: {
    marginTop: -20,
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: '700',
    color: '#E8F3F1',
    fontFamily: 'Avenir'
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
    fontSize: 18
  }
})
