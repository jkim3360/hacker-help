import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Header } from '../../../common'
import { apiCall } from '../../../../services/apiServices'
import Ionicons from 'react-native-vector-icons/Ionicons'
const screenWidth = Math.round(Dimensions.get('window').width)

export default class BookMarks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isReady: false
    }
  }
  static navigationOptions = {
    title: 'Bookmarks'
  }

  removeBookMark = async api_id => {
    await apiCall.delete(`/bookmarks/1/remove/${api_id}`)
  }

  componentDidMount() {
    this.makeRequest()
  }

  makeRequest = async () => {
    const bookMarksData = await apiCall.get('/bookmarks')
    this.setState({
      bookMarksData: bookMarksData.data,
      isLoading: false,
      refreshing: false
    })
  }

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRequest()
      }
    )
  }

  getFont = async () => {}

  render() {
    const { bookMarksData } = this.state

    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={this.makeRequest} />
        <Header style={{ flex: 1.5 }}>
          <Ionicons
            style={{ marginTop: 40 }}
            name={'ios-bookmarks'}
            size={50}
            color={'#E8F3F1'}
          />
          <Text style={styles.titleText}>Bookmarks</Text>
        </Header>
        <View style={styles.flatListView}>
          {this.state.isLoading === true ? (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <FlatList
              style={styles.flatList}
              data={bookMarksData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.flatListItem}>
                    <Ionicons
                      style={{ marginTop: 0, marginLeft: 9 }}
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
                        <Text style={styles.details}>
                        {item.score} views 
                        </Text>
                      </TouchableOpacity>
                    </View>
              
                  </View>
                )
              }}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          )}
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
    width: screenWidth,
    margin: 3,
    flex: 9,
  },
  activityIndicatorContainer: {
    flexDirection: 'column',
    marginTop: 300
  },
  flatList: {
    flex: 2
  },
  flatListItem: {
    flexDirection: 'row',
    margin: 5,
    borderBottomWidth: 5,
    borderBottomColor: '#f6f6f6',
    
  },
  flatListItemTop: {
    flex: 1,
    marginLeft: 10
  },
  header: {
    marginTop: 50,
    fontSize: 50
  },
  title: {
    fontSize: 18,
    flexShrink: 1
  },
  titleText: {
    marginTop: -5,
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: '700',
    color: '#E8F3F1',
    fontFamily: 'Avenir'
    },
  details: {
    marginTop: 5,
    marginBottom: 10,
    flex: 1,
    fontSize: 11
  }
})
