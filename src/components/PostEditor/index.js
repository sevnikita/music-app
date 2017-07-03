import React, { Component } from 'react';
import Menu from '../Menu/menu';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Editor extends Component {

	state = { name: '', file: '', postText : '' };

	handleInputChange(event){
	   	this.setState({ name: event.target.value });
	}

	handleChooseFile(event){
	    const file = event.target.value;
	    this.setState({ file: file.substring(12) }); 
	}

	handleFormSubmit(event){
	    event.preventDefault();
	    // Save file
	    const postPicture = this.fileInput.files[0];
	    const newdate = new Date();
	    const post = {
	      name: this.state.name,
	      date: newdate.getTime(),
	      picture: this.state.file,
	      pictureURL: '',
	      postText: this.postText.value
	    };
	    this.props.createPost(post, postPicture);
	    this.setState({ name: '', postText: '' });
	}

	handleChangePostText(event){
		this.setState({ postText: event.target.value });
	}

	render() {
		return (
			<div>
				<Menu />
				<div className='container'>
		          <h4>Создай новый пост</h4>
		          <form onSubmit={this.handleFormSubmit.bind(this)} className="form-inline">
		            <div className="form-group">
		              <input
		                className="form-control"
		                placeholder="Add a post"
		                value={this.state.name}
		                onChange={this.handleInputChange.bind(this)} />
		              <input type='file' onChange={this.handleChooseFile.bind(this)} ref={ (input) => this.fileInput = input } />
		              <textarea onChange={this.handleChangePostText.bind(this)} ref={ (textarea) => this.postText = textarea } />
		              <button action="submit" className="btn btn-primary">Create Post</button>
		            </div>
		          </form>
				</div>
			</div>
		)
	}
}

export default connect(null, actions)(Editor);