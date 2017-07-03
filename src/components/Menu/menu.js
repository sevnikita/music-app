import React from 'react';
import { Link } from 'react-router';
import './menu.css';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const Menu = ({ fetchCurrentUser, userPhoto, userName, userEmail, userLogOut, admin }) => {
	return (
		<div className='wrapper-menu'>
			<Link activeClassName='active' className='linkRoute' to='/posts'>Posts</Link>
			<Link activeClassName='active' className='linkRoute' to='/music'>Music</Link>
			<Link activeClassName='active' className={(admin == 'admin') ? 'linkRoute' : 'hidden'} to='/editor'>Editor</Link>
			<div className='userInfo'>
				<div className={userEmail ? 'active' : 'hidden'}>
					<div className='texts'>
						<p className='userName'>{userName}</p>
						<p className='userEmail'>{userEmail}</p>
						<a onClick={userLogOut}>Выйти</a>
					</div>
					<Link to='/profile'>
						<div className='wrap-photo-user'><img src={userPhoto} alt=''/></div>
					</Link>
				</div>
				<div className={'auth-buttons ', userEmail ? 'hidden' : 'active'}>
					<Link to='/login'>LOGIN</Link>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		userPhoto: state.user.photoURL,
		userName: state.user.name,
		userEmail: state.user.email,
		admin: state.user.admin
	};
};

export default connect(mapStateToProps, actions)(Menu);;