import React, { Component } from 'react';
import Menu from '../Menu/menu';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class Profile extends Component {
	state = {
		file: ''
	}

	handleChooseFile(event) {
	    const file = event.target.value;
	    this.setState({ file: file.substring(12) });  
	}

	downloadNewPhoto(event) {
		event.preventDefault();
	    const fileCont = this.fileInput.files;
	    this.props.downloadNewUserPhoto(fileCont[0], this.state.file); 
	}

	render () {
		return(
			<div>
				<Menu />
				<div className='container'>
					<input type='file' onChange={this.handleChooseFile.bind(this)} ref={ (input) => this.fileInput = input } />
					<button onClick={this.downloadNewPhoto.bind(this)}>Загрузить новое фото</button>
				</div>
			</div>
		);
	}
	
}

const mapStateToProps = (state, ownProps) => {
	return{

	}
}

export default connect(mapStateToProps, actions)(Profile);