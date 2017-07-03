import _ from 'lodash';
import React, { Component } from 'react';
import Menu from '../Menu/menu';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Track from '../Track';
import Band from '../Band';


class MusicList extends Component {
	state = {
		track: '',
		album: '',
		band: ''
	}

	componentWillMount() {
		this.props.fetchTracks();
		this.props.fetchBands();
	}

	handleChooseTrack(event) {
	    const file = event.target.value;
	    this.setState({ file: file.substring(12) });  
	}

	handleInputBandName(event){
		this.setState({ band: event.target.value });
	}

	downloadNewTrack(event) {
	    const fileCont = this.fileInputTrack.files;
	    this.props.downloadNewTrack(fileCont[0], this.state.track); 
	}

	createNewBand(event) {
	    const fileCont = this.fileInputBand.files;
	    this.props.createNewBand(fileCont[0], this.state.band); 
	}

	renderTracks() {
	    return _.map(this.props.tracks, (track, key) => {
	      return <Track key={key} track={track} id={key} />
	    }).reverse();
	  }
  	renderBands(){
  		return _.map(this.props.bands, (band, key) => {
  			return <Band key={key} band={band} id={key} />
  		}).reverse();
  	}

	render () {
		return(
			<div>
				<Menu />
				<div className='container'>
					<div className='create-block create-track'>
						<input type='file' onChange={this.handleChooseTrack.bind(this)} ref={ (input) => this.fileInputTrack = input } />
						<button onClick={this.downloadNewTrack.bind(this)}>Загрузить новый трек</button>
					</div>
					<div className='create-block create-band'>
						<input type='text' onChange={this.handleInputBandName.bind(this)} ref={ el => this.inputBandName = el } />
						<input type='file' ref={ (input) => this.fileInputBand = input } />
						<button onClick={this.createNewBand.bind(this)}>Создать новую группу</button>
					</div>
					<div className='bands-list'>
						{this.renderBands()}
					</div>
					<div className='view-block'>
						{this.renderTracks()}
					</div>
				</div>
			</div>
		);
	}
	
}

const mapStateToProps = (state, ownProps) => {
	return{
		tracks: state.tracks,
		bands: state.bands
	}
}

export default connect(mapStateToProps, actions)(MusicList);