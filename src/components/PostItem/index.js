import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';
import './style.css';

class PostItem extends Component {
  state = {
    urlPicture: '',
    postDay: '',
    postMonth: '',
    postYear: '',
    splettedText: []
  }

  componentWillMount() {
    const months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
    this.setState({ urlPicture: this.props.post.pictureURL });
    const formatedDate = new Date(this.props.post.date);
    this.setState({ postDay: formatedDate.getDate() });
    this.setState({ postMonth: months[formatedDate.getMonth()] });
    this.setState({ postYear: formatedDate.getFullYear() });
    this.setState({ splittedText: String(this.props.post.postText).split(/\r\n|\r|\n/g) })
  }

  handleDeletePost() {
    this.props.deletePost(this.props.id);
  }

  renderText() {
    return _.map(this.state.splittedText, (line, key) => {
      return <span>{line} <br /></span>
    });
  }

  render() {
    return (
        <article className='post'>
          <div className='post__delete' onClick={this.handleDeletePost.bind(this)}>X</div>
          <div className='post__photo'>
            <Link to={ 'posts/' + this.props.id }>
              <div className='wrapPhoto'>
                <img src={this.state.urlPicture} alt='' />
              </div>
            </Link>
          </div>
          <div className='post__content'>
            <div className='post__text'>
              <h3>
                {this.props.post.name}
              </h3>
              <p>{this.renderText()}</p>
            </div>
            <p className='post__date'>
              <span className='day'>{this.state.postDay}</span>
              <span className='month'>{this.state.postMonth}</span>
              <span className='year'>{this.state.postYear}</span>
            </p>
          </div>
        </article>
    );
  }
}

export default connect(null, actions)(PostItem);
