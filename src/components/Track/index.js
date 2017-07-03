import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './style.css';

class Track extends Component {
	state = { url: this.props.track.trackURL,
		name: this.props.track.name,
		id: this.props.id
	 }

	playTrack() {
		this.props.setCurrentTrack(this.props.track);
	}

	pauseTrack(){
		this.audio.pause();
	}

	render () {
		return(
			<div className='wrapper-track'>
				<p>{this.props.track.name}</p>
				<a onClick={this.playTrack.bind(this)}>play</a>
				<a onClick={this.pauseTrack.bind(this)}>pause</a>
				<audio src={this.props.track.trackURL} ref = { (el) => this.audio = el }/>
			</div>
		);
	}
	
}

const mapStateToProps = () => {
	return { }
}


export default connect(mapStateToProps, actions)(Track);