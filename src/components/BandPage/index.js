import React, { Component } from 'react';
import _ from 'lodash';

import Menu from '../Menu/menu';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Track from '../Track';
import './style.css';


class BandPage extends Component {
	state = {
		bandName: '',
		bandPictureUrl: '',
		filterTracks: ''
	}

	componentWillMount() {
		this.props.fetchBands();
		this.props.fetchTracks();
	}

	componentDidUpdate() {
		if(this.state.bandName == ''){
			for(var band in this.props.bands ){
				if(this.props.bands[band].name == this.props.ownProps.params.id){
					this.setState({ bandName: this.props.bands[band].name,
					bandPictureUrl: this.props.bands[band].pictureURL })
				}
			}
		}
		if(this.state.filterTracks == ''){
			const listOfTracks = [];
			for(var track in this.props.tracks ){
				if(this.props.tracks[track].band == this.props.ownProps.params.id){
					listOfTracks.push(this.props.tracks[track]);
				}
			}
			this.setState({ filterTracks: listOfTracks });
		}	
	}

	renderTracks() {
	    return _.map(this.state.filterTracks, (track, key) => {
	      return <Track key={key} track={track} id={key} />
	    }).reverse();
	}

	render () {
		return(
			<div className='band-wrap'>
				<Menu />
				<div className='container'>
					<h1>{this.state.bandName}</h1>
					<div className='wrap-img'>
						<img src={this.state.bandPictureUrl} />
					</div>
					<div className='lisoOfTracks'>
						{this.renderTracks()}
					</div>
				</div>
			</div>
		);
	}
	
}

const mapStateToProps = (state, ownProps) => {
	return {
		bands: state.bands, tracks: state.tracks, ownProps
	}
}

export default connect(mapStateToProps, actions)(BandPage);