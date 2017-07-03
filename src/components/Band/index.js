import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';
import './style.css';

class Band extends Component {

	render () {
		return(
			<div className='wrapper-band'>
				<Link to={'/music/' + this.props.band.name}>
					<div className='wrap-img'>
						<img src={this.props.band.pictureURL} />
					</div>
				</Link>
			</div>
		);
	}
	
}

const mapStateToProps = () => {
	return { }
}


export default connect(mapStateToProps, actions)(Band);