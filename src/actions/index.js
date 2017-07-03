import * as firebase from 'firebase';
import {
  FETCH_POSTS,
  FETCH_TRACKS,
  GET_POST,
  SET_CURRENT_USER,
  DOWNLOAD_NEW_USER_PHOTO,
  SET_CURRENT_TRACK,
  FETCH_BANDS
} from './types';
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDyFz5fKg8mc7g-Qu_oYINMtS8elzn869g",
    authDomain: "mytestproject-1e717.firebaseapp.com",
    databaseURL: "https://mytestproject-1e717.firebaseio.com",
    projectId: "mytestproject-1e717",
    storageBucket: "mytestproject-1e717.appspot.com",
    messagingSenderId: "541142410339"
  };
  firebase.initializeApp(config);
// const bd = new Firebase('https://mytestproject-1e717.firebaseio.com/');
const Posts = firebase.database().ref().child('posts');
const Tracks = firebase.database().ref().child('tracks');
const Bands = firebase.database().ref().child('bands');
const auth = firebase.auth();
const storage = firebase.storage();
const storageRef = storage.ref();


export function downloadNewUserPhoto(photo, filename) {
  return dispatch => {
    const cloudRef = storageRef.child('usersPhoto/' + filename);
    cloudRef.put(photo).then(function(snapshot) {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            user.updateProfile({
          photoURL: snapshot.downloadURL
        }).then(function() {
          dispatch({
            type: DOWNLOAD_NEW_USER_PHOTO,
            payload: snapshot.downloadURL
          });
        }, function(error) {
          // An error happened.
        });
          } else {
            // browserHistory.push('/login');
          }
        });
      });
  };
}

export function userLogIn(login,pass) {
  return dispatch => {
    const promise = auth.signInWithEmailAndPassword(login, pass);
    promise.catch(event => console.log(event.message));
  };
}

export function userSignUp(login,pass) {
  return dispatch => {
    const promise = auth.createUserWithEmailAndPassword(login, pass);
    promise.catch(event => console.log(event.message));
  };
}

export function userLogOut() {
  return dispatch => {
    firebase.auth().signOut();
  };
}

export function fetchPosts() {
  return dispatch => {
    Posts.on('value', snapshot => {
      dispatch({
        type: FETCH_POSTS,
        payload: snapshot.val()
      });
    });
  };
}

export function fetchTracks() {
  return dispatch => {
    Tracks.on('value', snapshot => {
      dispatch({
        type: FETCH_TRACKS,
        payload: snapshot.val()
      });
    });
  };
}

export function getPost(id) {
  return dispatch => {
    Posts.child(id).on('value', snapshot => {
      dispatch({
        type: GET_POST,
        payload: snapshot.val()
      });
    }); 
  };
}

export function createPost(post, postPicture) {
  return dispatch => {
    const cloudRef = storageRef.child('images/' + post.picture);
    cloudRef.put(postPicture).then(function(snapshot) {
      var newPost = {
        name: post.name,
        date: post.date,
        picture: post.picture,
        pictureURL: snapshot.downloadURL,
        postText: post.postText
      }
      Posts.push(newPost);
    });
    
  }
}

export function downloadNewTrack(track, trackname) {
  return dispatch => {
    const cloudRef = storageRef.child('tracks/' + trackname);
    cloudRef.put(track).then(function(snapshot) {
      var newTrack = {
        name: trackname,
        trackURL: snapshot.downloadURL
      }
      Tracks.push(newTrack);
    });
  }
}

export function deletePost(key) {
  return dispatch => Posts.child(key).remove();
}

export function setCurrentTrack(track) {
  return dispatch => {
    dispatch({
        type: SET_CURRENT_TRACK,
        payload: track
      });
  }
}

export function createNewBand(bandPicture, bandName) {
  return dispatch => {
    storageRef.child(bandName);
    const cloudRef = storageRef.child('tracks/' + bandName + '/' + bandName + '.jpg');
    cloudRef.put(bandPicture).then(function(snapshot) {
      var newBand = {
        name: bandName,
        pictureURL: snapshot.downloadURL
      }
      Bands.push(newBand);
    });
  }
}

export function fetchBands(){
  return dispatch => {
    Bands.on('value', snapshot => {
      dispatch({
        type: FETCH_BANDS,
        payload: snapshot.val()
      });
    });
  }
}
