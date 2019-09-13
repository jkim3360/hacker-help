import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MyWebComponent from '../Webivew/Webview'

export default class Article extends Component {
  static navigationOptions = {
    title: 'Article'
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Article Page</Text>
          <Text style={{ color: 'black' }} onPress={() => navigate('Home')}>
            <Text>Home</Text>
          </Text>
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
    flex: 1
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
