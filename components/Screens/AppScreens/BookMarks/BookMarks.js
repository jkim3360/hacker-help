import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Button
} from 'react-native'
import { Header } from '../../../common'
import { apiCall } from '../../../../services/apiServices'
import { AppLoading, Font } from 'expo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SwipeView from 'react-native-swipeview'

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
    // const bookMarksData = await apiCall.get('/bookmarks')
    // this.setState({
    //   bookMarksData: bookMarksData.data,
    //   isLoading: false,
    //   refreshing: false
    // })
    this.makeRequest()
  }

  makeRequest= async () => {
    const bookMarksData = await apiCall.get('/bookmarks')
    this.setState({
      bookMarksData: bookMarksData.data,
      isLoading: false,
      refreshing: false
    })
  }

  handleRefresh = () => {
    this.setState({
        refreshing: true,
    }, () => {
        this.makeRequest();
    })
}

  getFont = async () => {}

  render() {
    const { bookMarksData } = this.state
    return (
      <View style={styles.container}>
        <Header style={{ flex: 1.5 }}>
          <Ionicons
            style={{ marginTop: 40 }}
            name={'ios-bookmarks'}
            size={50}
            color={'#333333'}
          />
          <Text style={styles.titleText}>Bookmarks</Text>
        </Header>
        <View style={styles.flatListView}>
          {this.state.isLoading === true ? (
            <View>
              <Text>Loading...</Text>
              <ActivityIndicator style={{ marginTop: 300 }} size="large" />
            </View>
          ) : (
            <FlatList
              style={styles.flatList}
              data={bookMarksData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.flatListItem}>
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
                      <Button
                        title="Remove"
                        onPress={() => {
                          this.removeBookMark(item.api_id)
                        }}
                      />
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
    margin: 3,
    flex: 9
  },
  flatList: {
    flex: 2
  },
  flatListItem: {
    margin: 5,
    borderBottomWidth: 5,
    borderBottomColor: '#f6f6f6'
  },
  flatListItemTop: {
    flex: 1
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
    color: '#333333'
    // fontweight take string for some reason
  },
  details: {
    flex: 1,
    fontSize: 11
  }
})
