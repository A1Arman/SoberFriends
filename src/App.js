import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LandingNav from './components/LandingNav/LandingNav';
import Posts from './components/Posts/Posts';
import AppNav from './components/AppNav/AppNav';
import Profile from './components/Profile/Profile';
import AddPost from './components/AddPost/AddPost';
import Footer from './components/Footer/Footer';
import LoginForm from './components/LoginForm/LoginForm';
import LoginNav from './components/LoginNav/LoginNav';
import AuthApiService from './services/auth-api-service';
import TokenService from './services/token-service';
import config from './config';
import Dashboard from './components/Dashboard/Dashboard';

const { API_BASE_URL } = config;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isShowing: false,
        isShowingUpdate: false,
        isShowingDelete: false,
        isShowingDeletePost: false,
        posts: [],
        user: null,
        logInError: false,
        loggedIn: false,
        myPost: [],
        postId: null,
        postTitle: null,
        isLoading: false,
        postContentValid: false,
        error: null,
        likeError: null,
    }
  }

  handleLogOut = () => {
    TokenService.clearAuthToken();
  }

  handleCommentSubmit = e => {
    e.preventDefault();
    const comment = {
      comment: e.target.comment.value,
      post_id: this.state.postId
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    }

    fetch(`${API_BASE_URL}/comments`, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(err => {throw new Error(err)})
        }
      })
      .then(comment => {
        const form = document.getElementById('comment-form')
        form.reset();
        this.setState({isShowing: false})
      })
  }

  handleUpdateSubmit = (e, postId) => {
    e.preventDefault();
    const post = {
      post_title: e.target.post_title.value,
      post_content: e.target.post_content.value
    }

    const options = {
      method: 'PATCH',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        'Authorization':  `bearer ${TokenService.getAuthToken()}`
      }
    }

    if (this.state.postContentValid) {
      fetch(`${API_BASE_URL}/posts/${postId}`, options)
      .then(res => {
        if (res.ok) {
          window.location.href='/posts'
        } else {
          return res.json().then(error => {
            throw new Error(error)
          })
        }
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const post = {
      post_title: e.target.post_title.value,
      post_content: e.target.post_content.value,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    }

    if (this.state.postContentValid) {
      fetch(`${API_BASE_URL}/posts`, options)
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(post => {
        const form = document.getElementById('add-post-form');
        form.reset();
        window.location.href='/posts'
      })
      .catch(error => {
        throw new Error(error)
      })
    } 
  }

  handleLikeClick = postId => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    }

    fetch(`${API_BASE_URL}/posts/${postId}/likes`, options)
      .then(res => {
        return res.json();
      })
      .then(likes => {
        if (likes) {
          this.setState({likeError: likes})
        }
        window.location.reload(true);
      })
      .catch(error => {
        this.setState({likeError: error})
      })
  }

  handleLogin = e => {
    this.setState({isLoading: true})
    e.preventDefault();
    const { email, password } = e.target
    AuthApiService.postLogin({
      email: email.value,
      password: password.value
    })
      .then(res => {
        if (res.error) {
          return this.setState({logInError: true})
        } else {
          return res;
        }
      })
      .then(user => {
        email.value = ''
        password.value = ''
        TokenService.saveAuthToken(user.authToken);
        this.setState({
          loggedIn: true,
          isLoading: false,
        });
        window.location.href = '/dashboard'
      })
      .catch(err => {
        this.setState({error: err})
      })
  }

  handleDeleteUser = () => {
    fetch(`${API_BASE_URL}/users/user`, {
      method: "DELETE",
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw new Error(error);
          });
        }
      })
      .then(() => {
        this.setState({posts: this.state.posts.filter(post => post.owner !== this.state.user.id)})
        TokenService.clearAuthToken()
        window.location.href='/'
      })
  }

  handleDeletePost = () => {
    const postId = this.state.postId

    fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      } 
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw new Error(error);
          })
        }
      })
      .then(() => {
        this.setState({
          myPost: this.state.myPost.filter(post => post.id !== postId),
          posts: this.state.posts.filter(post => post.id !== postId),
          isShowingDeletePost: false
        });
        window.location.reload(true);
      })
      .catch(error => {
        throw new Error(error);
      })
  }

  addPost = post => {
    this.setState({
      posts: [...this.state.posts, post]
    })
  }

  openModalHandler = (id, title) => {
      this.setState({
          postId: id,
          postTitle: title
      },  function() {
        this.setState({
          isShowing: true
        })
      });
  }

  closeModalHandler = () => {
      this.setState({
          isShowing: false
      });
  }

  openModalDeleteHandler = () => {
    this.setState({isShowingDelete: true})
  }

  closeModalDeleteHandler = () => {
    this.setState({isShowingDelete: false})
  }

  openModalDeletePostHandler = (postId) => {
    this.setState({
        postId: postId
    }, function() {
      this.setState({
        isShowingDeletePost: true
      })
    });
  }

  closeModalDeletePostHandler = () => {
    this.setState({isShowingDeletePost: false})
  }  

  openModalUpdateHandler = (postId) => {
    this.setState({
        postId: postId
    }, function() {
      this.setState({
        isShowingUpdate: true
      })
    });
  }

  closeModalUpdateHandler = () => {
    this.setState({
        isShowingUpdate: false
    });
}

  trimfield = (str) => 
  { 
    return str.replace(/^\s+|\s+$/g,''); 
  }

  validate = () =>
  {
     var obj1 = document.getElementById('post_title');
     var obj2 = document.getElementById('post_content');
         if(this.trimfield(obj1.value) === '') 
         {      
            this.setState({postContentValid: false}) 
            obj1.focus();
         }
         else if(this.trimfield(obj2.value) === '')
         {     
          this.setState({postContentValid: false})  
          obj2.focus(); 
        }
        else {
          this.setState({postContentValid: true})
        }
  }


  render() {
    return (
      <div className='App'>
        <span className='container'>
        <header>
          <Route exact path='/' render={(props) => <LandingNav {...props} openModalHandler={this.openModalHandler} logOut={this.handleLogOut} isShowing={this.state.isShowing} closeModalHandler={this.closeModalHandler}/>} />
          <Route exact path='/posts' render={(props) => <AppNav {...props} handleLogout={this.handleLogOut} />} />
          <Route exact path='/profile' render={(props) => <AppNav {...props} handleLogout={this.handleLogOut} />} />
          <Route exact path='/addPost' render={(props) => <AppNav {...props} handleLogout={this.handleLogOut} />} />
          <Route exact path='/dashboard' render={(props) => <AppNav {...props} handleLogout={this.handleLogOut} />} />
          <Route exact path='/login' render={(props) => <LoginNav {...props} openModalHandler={this.openModalHandler}/>} />
        </header>
        <main className='main-container'>
          <Route exact path='/' render={(props) => 
              <LandingPage {...props} closeModalHandler={this.closeModalHandler} isShowing={this.state.isShowing} isLoggedIn={this.state.loggedIn}/>}/>
          <Route exact path='/posts' render={(props) => 
              <Posts {...props} likeError={this.state.likeError} posts={this.state.posts} handleLike={postId => this.handleLikeClick(postId)} closeModalHandler={this.closeModalHandler} user={this.state.user}  openModalHandler={(id, title) => this.openModalHandler(id, title)} postTitle={this.state.postTitle} postId={this.state.postId} isShowing={this.state.isShowing} handleCommentSubmit={(event) => this.handleCommentSubmit(event)}/>} />
          <Route exact path='/profile' render={(props) => 
              <Profile {...props} user={this.state.user} validation={this.validate} handleDeletePost={(postId) => this.handleDeletePost(postId)} deleteAccount={this.handleDeleteUser} postId={this.state.postId} closeModalUpdateHandler={this.closeModalUpdateHandler} isShowingDelete={this.state.isShowingDelete} openModalDeleteHandler={this.openModalDeleteHandler} closeModalDeleteHandler={this.closeModalDeleteHandler} 
                openModalUpdateHandler={(postId) => this.openModalUpdateHandler(postId)} openModalDeletePostHandler={(postId) => this.openModalDeletePostHandler(postId)} closeModalDeletePostHandler={this.closeModalDeletePostHandler} isShowingDeletePost={this.state.isShowingDeletePost} isShowingUpdate={this.state.isShowingUpdate} handleUpdateSubmit={(event) => this.handleUpdateSubmit(event, this.state.postId)}/>}/>
          <Route exact path='/addPost' render={(props) => 
              <AddPost {...props} contentValid={this.state.postContentValid} handleValidation={this.validate} handleSubmit={(event) => this.handleSubmit(event)} />}/>
          <Route exact path='/login' render={(props) => 
              <LoginForm {...props} closeModalHandler={this.closeModalHandler} isShowing={this.state.isShowing} logInError={this.state.logInError} handleLogin={(event) => this.handleLogin(event)} />} />
          <Route exact path='/dashboard' render={(props) => 
              <Dashboard {...props} postId={this.state.postId} isShowing={this.state.isShowing} openModalHandler={(id, title) => this.openModalHandler(id, title)} handleLike={postId => this.handleLikeClick(postId)} closeModalHandler={this.closeModalHandler} handleCommentSubmit={(event) => this.handleCommentSubmit(event)}/>}/>
        </main>
        <footer>
          <Route exact path='/' component={Footer} />
        </footer>
        </span>
      </div>
    );
  }
}

export default App;
