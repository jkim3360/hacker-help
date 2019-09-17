import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { View, StyleSheet } from 'react-native'
import { gradient } from '../styles/Colors'

export const Gradient = ({ children, style }) => {
	return (
		<View style={styles.container}>
			<LinearGradient colors={gradient} style={[styles.gradient, style]}>
				{children}
			</LinearGradient>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	gradient: {
		flex: 1,
		// alignItems: 'center',
		justifyContent: 'center'
	}
})
