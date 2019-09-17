import React, { Component } from 'react'
import {
	Text,
	StyleSheet,
	LayoutAnimation,
	ActivityIndicator,
	AsyncStorage
} from 'react-native'
import { Gradient, Button, Input } from '../../common'
import { danger, highlightColor } from '../../styles/Colors'
import { loginUser } from '../../../services/apiServices'
import { storeUser } from '../../../services/Credentials'

export default class SignInScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			isError: false,
			isLoading: false,
			errorMsg: ' Username Or Password Incorrect'
		}
	}

	componentWillUpdate() {
		LayoutAnimation.spring()
	}

	handleChange = (name, value) => {
		this.setState({ [name]: value, isError: false })
	}

	handleError = (msg) =>
		this.setState({ errorMsg: msg, isError: true, isLoading: false })

	handleVerify = () => {
		
		if (!this.state.username) this.handleError('Username is required')
		if (!this.state.password) this.handleError('Password is required')
	}

	handleSubmit = async () => {
		this.setState({ isLoading: true })
		const { username, password } = this.state
		const user = { username: username.toLowerCase(), password: password }
		try {
			await this.handleVerify()
			const resp = await loginUser(user)
			if (resp.status === 200) {
				const setUser = await storeUser(resp.token, resp.userId.toString())
				if (setUser) {
					await this.props.navigation.navigate('App')
				}
			}
		} catch (error) {
			if (error) this.handleError('Invalid Username or Password')
		}
	}

	renderButton = () => {
		switch (true) {
			case this.state.isLoading:
				return (
					<Button onPress={this.handleSubmit} disabled={this.state.isError}>
						<ActivityIndicator size="small" color={highlightColor} />
					</Button>
				)
			case this.state.isError:
				return (
					<Button
						title="Sign in"
						onPress={this.handleSubmit}
						disabled={this.state.isError}
					/>
				)
			default:
				return (
					<Button
						title="Sign In"
						onPress={this.handleSubmit}
						disabled={this.state.isError}
					/>
				)
		}
	}

	render() {
		return (
			<Gradient style={styles.container}>
				<Input
					label="Username"
					error={this.state.isError}
					onChangeText={(text) => this.handleChange('username', text)}
				/>
				<Input
					label="Password"
					error={this.state.isError}
					secureTextEntry={true}
					onChangeText={(text) => this.handleChange('password', text)}
				/>
				{this.state.isError ? (
					<Text style={styles.error}>{this.state.errorMsg}</Text>
				) : null}
				{this.renderButton()}
			</Gradient>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	error: {
		color: danger,
		fontSize: 18,
		marginBottom: 20
	}
})
