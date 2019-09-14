import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Button, Header } from '../../../common'
import { ListItem } from 'react-native-elements'
import apiData from '../../../../services/apiData'
import { apiCall } from '../../../../services/apiServices'
import axios from 'axios'

export default class BookMarks extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static navigationOptions = {
    title: 'Bookmarks',
    apiId: []
  }

  async componentDidMount() {
    const bookMarksData = await apiCall.get('/bookmarks')
    this.setState({
      bookMarksData: bookMarksData.data
    })
    const apiIds = this.state.bookMarksData.map(element => {
      return element.api_id
    })
    this.setState({
      apiIds
    })
    // console.log(this.state.apiIds)
    await this.fetchBookMarkApi()
  }

  fetchBookMarkApi = async () => {
    const { apiIds } = this.state
    console.log(apiIds)
    apiIds.forEach(async element =>{
      const bookMarkApiData = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`
      )
      this.setState({
        bookMarkApiData: bookMarkApiData.data
      })
      console.log(bookMarkApiData.data)
    })
    // console.log(test)
  }

  render() {
    const dummyData = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        url:
          'https://hacker-news.firebaseio.com/v0/item/20951444.json?print=pretty"'
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        url:
          'https://hacker-news.firebaseio.com/v0/item/20951444.json?print=pretty"'
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        url:
          'https://hacker-news.firebaseio.com/v0/item/20951444.json?print=pretty"'
      }
    ]
    // console.log(apiData)

    const { navigate } = this.props.navigation
    const { bookMarkApiData } = this.state
    return (
      <View style={styles.container}>
        <Header style={{ flex: 1.5 }}>
          <Text style={styles.title}>Bookmarks</Text>
        </Header>
        <View style={styles.flatListView}>
          <FlatList
            style={styles.flatList}
            data={bookMarkApiData}
            keyExtractor={item => item.id}
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
                  <Text style={styles.details}>ID: {item.id}</Text>
                </View>
              )
            }}
          />
        </View>
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
  flatListView: {
    margin: 3,
    flex: 9
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
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 60,
    flex: 5,
    fontSize: 30,
    color: 'black'
  },
  details: {
    flex: 1,
    fontSize: 11
  }
})
