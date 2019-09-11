import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import createBottomTabNavigator from 'react-navigation-tabs'

import ArticleScreen from './components/Screens/AppScreens/Article/Article'
import HomeScreen from './components/Screens/AppScreens/Home/Home'

const HackerHelpApp = createStackNavigator({
  Home: HomeScreen,
  Article: ArticleScreen
})

export default App = createAppContainer(HackerHelpApp)
