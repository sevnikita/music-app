import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './style.css';

class Player extends Component {
	state = {
		duration: ''
	}

	player = new Audio();

	pauseMusic(){
		this.player.pause();
	}

	componentDidUpdate() {
		if(this.player.src != this.props.currentTrack.trackURL){
			this.player.src = this.props.currentTrack.trackURL;
		}
		this.player.play();
	}

  render() {
    return (
      <div className='wrapper-player'>
        <p>{this.props.currentTrack.name}</p>
        <a onClick={this.pauseMusic.bind(this)} >pause</a>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { currentTrack: state.currentTrack };
}

export default connect(mapStateToProps, actions)(Player);