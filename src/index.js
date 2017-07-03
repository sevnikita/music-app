import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import {Router, Route, browserHistory, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import * as actions from './actions';

import Posts from './components/Posts';
import Login from './components/Login/login';
import Post from './components/Post';
import MusicList from './components/MusicList';
import Editor from './components/PostEditor';
import Profile from './components/Profile';
import Player from './components/Player';
import BandPage from './components/BandPage';
import reducers from './reducers';
import * as firebase from 'firebase';
import { SET_CURRENT_USER } from './actions/types';


// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(reducers);
const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxThunk)));
const history = syncHistoryWithStore( browserHistory, store );

const auth = firebase.auth();


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    const admin = (user.email == 'user@gmail.com') ? 'admin' : 'noadmin';
    const userParams = {
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      admin: admin
    };
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: userParams
    });
  } else {
    const userParams = {
      email:'',
      name: '',
      photoURL: '',
      admin: 'noadmin'
    };
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: userParams
    });
    // browserHistory.push('/login');
  }
});

const checkAdmin = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      if(user.email == 'user@gmail.com'){
        
      } else {
        browserHistory.push('/posts');
      }
    } else {
      browserHistory.push('/login');
    }
  });
}

class App extends Component {
  render() {
    return(
      <Provider store={store}>
          <div>
            <Router history={history}>
              <Route path='/posts' component={Posts}/>
              <Route path='/posts/:id' component={Post}/>
              <Route path='/login' component={Login}/>
              <Route path='/music' component={MusicList}/>
              <Route path='/music/:id' component={BandPage}/>
              <Route path='/editor' component={Editor} onEnter={checkAdmin}/>
              <Route path='/profile' component={Profile} />
              <Redirect from='/' to='/posts'/>
            </Router>
            <Player />
          </div>
        </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// ReactDOM.render(
//   <Provider store={store}>
//     <div>
//       <Router history={history}>
//       	<Route path='/posts' component={Posts}/>
//     		<Route path='/posts/:id' component={Post}/>
//       	<Route path='/login' component={Login}/>
//         <Route path='/music' component={MusicList}/>
//         <Route path='/music/:id' component={BandPage}/>
//         <Route path='/editor' component={Editor} onEnter={checkAdmin}/>
//       	<Route path='/profile' component={Profile} />
//       	<Redirect from='/' to='/posts'/>
//       </Router>
//       <Player />
//     </div>
//   </Provider>
//   , document.getElementById('root')
//   );
