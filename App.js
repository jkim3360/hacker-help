import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation-stack'
// import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import createBottomTabNavigator from 'react-navigation-tabs'
// import { Ionicons } from '@expo/vector-icons'
// import { Platform } from '@unimodules/core'
import Expo from 'expo'
import ArticleScreen from './components/Screens/AppScreens/Article/Article'
// import { highlightColor, textColor, primary } from './components/styles/Colors'
import HomeScreen from './components/Screens/AppScreens/Home/Home'

const HackerHelpApp = createStackNavigator(
  {
    Home: HomeScreen,
    Article: ArticleScreen
  },
 
)

export default App = createAppContainer(HackerHelpApp)
  
