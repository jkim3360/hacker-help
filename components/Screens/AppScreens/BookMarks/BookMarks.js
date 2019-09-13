import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Button, Header } from '../../../common'
import { ListItem } from 'react-native-elements'

export default class BookMarks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  static navigationOptions = {
    title: 'Bookmarks'
  }

  Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    )
  }

  retrieveData = async () => {
    try {
      const get = await AsyncStorage.multiGet([
        'flatListItemTitle',
        'flatListItemScore',
        'flatListItemBy',
        'flatListItemUrl'
      ])
     
      console.log(get)
    } catch (error) {
      throw error
    }
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Bookmarks Page</Text>
          <Text style={{ color: 'black' }} onPress={() => navigate('Home')}>
            <Text>Home</Text>
          </Text>    
          
        </View>
 
        {/* <FlatList
          keyExtractor={(item, index) => String(index)}
          style={styles.flatList}
          data={this.props.topStoriesData}
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
                  flatListItemTitle={item.title}
                  flatListItemScore={item.score}
                  flatListItemBy={item.by}
                />
              </View>
            )
          }}
        /> */}
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
  flatListItem: {
    margin: 5,
    borderBottomWidth: 5,
    borderBottomColor: '#f6f6f6'
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1
  },
  details: {
    fontSize: 11
  }
})
