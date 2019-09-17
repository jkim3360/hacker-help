import React, { Component } from 'react'
import {
	ScrollView,
	Text,
	StyleSheet,
	LayoutAnimation,
	ActivityIndicator
} from 'react-native'
import { Gradient, Input, Button } from '../../common'
import { danger, highlightColor } from '../../styles/Colors'
import { signUpUser } from '../../../services/apiServices'

export default class CreateAccountScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			isError: false,
			isLoading: false
		}
	}

	componentWillUpdate() {
		LayoutAnimation.spring()
	}

	handleChange = (name, value) => {
		this.setState({
			[name]: value,
			isError: false,
			isLoading: false
		})
	}

	setErrorMsg = (msg) => {
		this.setState({
			isError: true,
			errorMsg: msg,
			isLoading: false
		})
	}

	handleVerify = () => {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if (!reg.test(this.state.email)) this.setErrorMsg('Email is invalid')
		if (!this.state.password) this.setErrorMsg('Password is required')
		if (this.state.password !== this.state.confirmPassword)
			this.setErrorMsg('Passwords do not match')
	}

	handleSubmit = async () => {
		this.setState({ isLoading: true })
		await this.handleVerify()
		const { username, name, password, email } = this.state
		try {
			if (!this.state.isError) {
				const resp = await signUpUser({ username, password, email, name })
				if (resp.status === 200) {
					this.props.navigation.navigate('AccountCreated')
				}
			}
		} catch (error) {
			throw error
		}
	}

	renderButton = () => {
		switch (true) {
			case this.state.isLoading:
				return (
					<Button
						title="Create Account"
						onPress={this.handleSubmit}
						disabled={this.state.isError}>
						<ActivityIndicator size="small" color={highlightColor} />
					</Button>
				)
			case this.state.isError:
				return (
					<Button
						title="Create Account"
						onPress={this.handleSubmit}
						disabled={this.state.isError}
					/>
				)
			default:
				return (
					<Button
						title="Create Account"
						onPress={this.handleSubmit}
						disabled={this.state.isError}
					/>
				)
		}
	}

	render() {
		return (
			<Gradient style={styles.container}>
				<ScrollView
					contentContainerStyle={styles.scrollContainer}
					scrollEnabled={true}>
					<Input
						label="Name"
						error={this.state.isError}
						onChangeText={(text) => this.handleChange('name', text)}
					/>
					<Input
						label="Username"
						error={this.state.isError}
						onChangeText={(text) => this.handleChange('username', text)}
					/>
					<Input
						label="Email"
						error={this.state.isError}
						onChangeText={(text) => this.handleChange('email', text)}
					/>
					<Input
						label="Password"
						secureTextEntry={true}
						error={this.state.isError}
						onChangeText={(text) => this.handleChange('password', text)}
					/>
					<Input
						label="Confirm Password"
						secureTextEntry={true}
						error={this.state.isError}
						onChangeText={(text) => this.handleChange('confirmPassword', text)}
					/>
					{this.state.isError ? (
						<Text style={styles.error}>{this.state.errorMsg}</Text>
					) : null}
					{this.renderButton()}
				</ScrollView>
			</Gradient>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	scrollContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flexGrow: 1
	},
	error: {
		color: danger,
		fontSize: 18,
		marginBottom: 20
	}
})
