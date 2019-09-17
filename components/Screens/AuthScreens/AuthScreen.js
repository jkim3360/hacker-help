import React, { Component } from 'react'
import { Gradient, Button } from '../../common'

export default class AuthScreen extends Component {
	render() {
		return (
			<Gradient>
				<Button
					title="Sign In"
					onPress={() => this.props.navigation.navigate('SignIn')}
					style={{ width: 350, margin: 20 }}
				/>
				<Button
					title="Create Account"
					onPress={() => this.props.navigation.navigate('CreateAccount')}
					style={{ width: 350 }}
				/>
			</Gradient>
		)
	}
}
