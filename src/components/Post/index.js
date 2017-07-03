import React from 'react';
import { connect } from 'react-redux';
import Menu from '../Menu/menu';
import * as actions from '../../actions';

const Post = ({ name, getPost, ownProps, picture }) => {
	getPost(ownProps.params.id);
	return(
		<div>
		<Menu />
			<p>{ name }</p>
			<p>{ picture }</p>
		</div>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		name: state.currentPost.name,
		picture: state.currentPost.picture,
		ownProps
	};
};

export default connect(mapStateToProps, actions)(Post);