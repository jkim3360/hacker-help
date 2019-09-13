import React, { Component } from 'react'
// import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StyleSheet } from 'react-native'
import ArticleScreen from './components/Screens/AppScreens/Article/Article'
import HomeScreen from './components/Screens/AppScreens/Home/Home'
import BookMarksScreen from './components/Screens/AppScreens/BookMarks/BookMarks'
// import MyWebComponent from './components/Webview'
import Browser from './components/Screens/AppScreens/Webivew/Webview'



const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Article: Browser,
    BookMarks: BookMarksScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let IconComponent = Ionicons
        let iconName
        if (routeName === 'Home') {
          iconName = 'ios-code-working'
        } else if (routeName === 'Article') {
          iconName = `ios-document`
        } else if (routeName === 'BookMarks') {
          iconName = `ios-bookmark`
        }

        // You can return any component that you like here!
        return (
          <IconComponent
            style={styles.icon}
            name={iconName}
            size={25}
            color={tintColor}
          />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    }
  }
)

// const HackerHelpApp = createStackNavigator({
//   Home: HomeScreen,
//   Article: ArticleScreen
// })

// export default App = createAppContainer(HackerHelpApp)

export default createAppContainer(TabNavigator)

const styles = StyleSheet.create({
  icon: {
    marginTop: 10
  }
})
