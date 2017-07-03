import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import PostItem from '../PostItem/';
import './app.css';
import Menu from '../Menu/menu';

class Posts extends Component {
  

  componentWillMount() {
    this.props.fetchPosts();
  }

  

  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      return <PostItem key={key} post={post} id={key} />
    }).reverse();
  }

  render() {
    return (
      <div>
        <Menu />
        <div className='container'>
          <div className='wrapper-posts'>
                {this.renderPosts()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { posts: state.posts, ownProps };
}

export default connect(mapStateToProps, actions)(Posts);
