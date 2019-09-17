import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { primary } from '../styles/Colors'


export const Header = ({ children, style }) => {
	return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#40E0D0',
		flex: 1,
		alignSelf: 'stretch',
		alignItems: 'center',
	}
})
