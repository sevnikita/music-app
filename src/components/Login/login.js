import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Menu from '../Menu/menu';



class Login extends Component{
	state = {
		login: '',
		pass: ''
	}
	handleLoginChange(event){
		this.setState({ login : event.target.value })
	}
	handlePassChange(event){
		this.setState({ pass : event.target.value })
	}
	loginSubmit(event){
		const email = this.state.login;
		const pass = this.state.pass;
		this.props.userLogIn(email, pass);
	}
	signupSubmit(event){
		const email = this.state.login;
		const pass = this.state.pass;
		this.props.userSignUp(email, pass);		
	}
	logoutSubmit(){
		this.props.userLogOut();
	}
	render() {
		return (
			<div className={this.props.visibility}>
				<Menu />
				<div className='container'>
					<input id='txtEmail' type='email' placeholder='email' onChange={this.handleLoginChange.bind(this)} value={this.state.login} />
					<input id='txtPassword' type='password' placeholder='password' onChange={this.handlePassChange.bind(this)} value={this.state.pass} />
					<button id='btnLogin' onClick={this.loginSubmit.bind(this)}> Log in </button>
					<button id='btnSignUp' onClick={this.signupSubmit.bind(this)}> Sign up </button>
					<button id='btnLogout' onClick={this.logoutSubmit.bind(this)}> Log out </button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {

	}
}

export default connect(mapStateToProps, actions)(Login);