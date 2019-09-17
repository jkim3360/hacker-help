import React from 'react'
import SplashScreen from '../components/Screens/AuthScreens/SplashScreen'
import AuthScreen from '../components/Screens/AuthScreens/AuthScreen'
import SignInScreen from '../components/Screens/AuthScreens/SignInScreen'
import CreateAccountScreen from '../components/Screens/AuthScreens/CreateAccountScreen'
// import AccountCreatedScreen from '../components/Screens/AuthScreens/AccountCreatedScreen'
import { createStackNavigator } from 'react-navigation-stack'

export const AuthNavigator = createStackNavigator(
	{
		Splash: SplashScreen,
		AuthScreen: AuthScreen,
		SignIn: SignInScreen,
		CreateAccount: CreateAccountScreen,
		// AccountCreated: AccountCreatedScreen
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false
		}
	}
)
