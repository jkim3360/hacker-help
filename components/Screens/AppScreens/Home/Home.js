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

const articles = [
  20990140,
  20990156,
  20985875,
  20990583,
  20990350,
  20987628,
  20984691,
  20965605,
  20987292,
  20988477,
  20987946,
  20987197,
  20990552,
  20985429,
  20989179,
  20986967,
  20988584,
  20986411,
  20982401,
  20983234,
  20963700,
  20987485,
  20985308,
  20984731,
  20989709,
  20987123,
  20989000,
  20984866,
  20988908,
  20990211,
  20983247,
  20975662,
  20989696,
  20983239,
  20983922,
  20989382,
  20986730,
  20978958,
  20983229,
  20987813,
  20983930,
  20986874,
  20986079,
  20975611,
  20990251,
  20989389,
  20988060,
  20965386,
  20989894,
  20986450,
  20983971,
  20982161,
  20988512,
  20989556,
  20984358,
  20966214,
  20965827,
  20986585,
  20985339,
  20975438,
  20983780
]

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
    // await this.getJobsData()
    await this.getTopStories()
    await this.fetchArticles()
  }

  getTopStories = async () => {
    apiData.apiData.forEach(async element => {
      const story = await axios.get(element)
      this.setState({
        topStoriesData: [...this.state.topStoriesData, story.data],
        isLoading: false
      })
    })
  }

  // get array of ids to api calls
  // getJobsData = async () => {
  //   const jobs = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
  //   console.log(jobs)
  //     this.setState({
  //       jobStories: [... this.state.jobStories, jobs.data]
  //     })
  // }

  // map array of ids for list of api urls
  // getJobsData = async () => {
  //   articles.map(element => {
  //     console.log(`https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`)
  //   })

  // }

  fetchArticles = async search => {
    // const { search } = this.state
    console.log('hello')
    const searchResults = await axios
      .get
      // `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${search}&site=stackoverflow`
      ()
    console.log(searchResults.data)
    // title view_count owner.user_id link question_id
    this.setState({
      searchResults: searchResults.data.items
    })
    console.log(searchResults)

    // searchResults.data.items.forEach(element => {
    // })
  }

  handleChange = async search => {
    this.setState({ isLoading: true })
    const filteredValue = this.state.searchResults.filter(article =>
      article.title.toLowerCase().includes(search.toLowerCase())
    )
    this.setState({ searchResults: filteredValue, isLoading: false })
    if (this.state.search.length < 2) await this.fetchArticles()
  }

  render() {
    const { search } = this.state
    const { navigate } = this.props.navigation
    return (
      <Fragment>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={styles.container}>
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
                data={this.state.searchResults}
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
                              url: item.link
                            })
                          }
                        >
                          <Text style={styles.title}>{item.title}</Text>
                        </TouchableOpacity>
                        <Text style={styles.details}>
                          {item.view_count} points by {item.answer_count}
                        </Text>
                      </View>
                      <View>
                        <ToggleSwitch
                          topStoriesData={this.state.searchResults}
                          flatListItemTitle={item.title}
                          flatListItemScore={item.view_count}
                          flatListItemBy={item.title}
                          flatListItemUrl={item.link}
                          flatListItemId={item.question_id}
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
