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
import AuthApiService from './services/auth-api-service';
import TokenService from './services/token-service';
import config from './config';

const { API_BASE_URL } = config;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isShowing: false,
        isShowingUpdate: false,
        posts: [],
        user: null,
        logInError: null,
        loggedIn: false,
        myPost: [],
        postId: null,
    }
  }

  handleLogOut = () => {
    TokenService.clearAuthToken();
  }

  handleUserSubmit = e => {
    e.preventDefault();

    const user = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      money_spent: e.target.money_spent.value,
      impact: e.target.impact.value
    }

    this.setState({
      user: user,
      isShowing: false
    });
  }

  handleCommentSubmit = e => {
    e.preventDefault();
    const comment = {
      comment: e.target.comment.value
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
    console.log('Im running')
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
        alert(`something went wrong: ${error.message}`)
      })
  }

  handleLogin = e => {
    e.preventDefault();
    const { email, password } = e.target
    AuthApiService.postLogin({
      email: email.value,
      password: password.value
    })
      .then(res => {
        email.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken);
        this.setState({loggedIn: true});
        window.location.href = '/posts'
      })
      .catch(err => {
        this.setState({logInError: err})
      })
  }

  handleDeletePost = postId => {
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
          posts: this.state.posts.filter(post => post.id !== postId)
        });
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

  openModalHandler = () => {
      this.setState({
          isShowing: true
      });
  }

  closeModalHandler = () => {
      this.setState({
          isShowing: false
      });
  }

  openModalUpdateHandler = (postId) => {
    this.setState({
        isShowingUpdate: true,
        postId: postId
    });
  }

  closeModalUpdateHandler = () => {
    this.setState({
        isShowingUpdate: false
    });
}

  render() {
    return (
      <div className='App'>
        <header>
          <Route exact path='/' render={(props) => <LandingNav {...props} openModalHandler={this.openModalHandler} isShowing={this.state.isShowing} closeModalHandler={this.closeModalHandler}/>} />
          <Route exact path='/posts' render={(props) => <AppNav {...props} handleLogout={this.handleLogOut} />} />
          <Route exact path='/profile' component={AppNav} />
          <Route exact path='/addPost' component={AppNav} />
          <Route exact path='/login' component={LandingNav} />
        </header>
        <>
          <Route exact path='/' render={(props) => <LandingPage {...props} closeModalHandler={this.closeModalHandler} isShowing={this.state.isShowing} handleUserSubmit={(event) => this.handleUserSubmit(event)}/>} isLoggedIn={this.state.loggedIn} />
          <Route exact path='/posts' render={(props) => <Posts {...props} posts={this.state.posts} closeModalHandler={this.closeModalHandler} user={this.state.user}  openModalHandler={this.openModalHandler} isShowing={this.state.isShowing} handleCommentSubmit={(event) => this.handleCommentSubmit(event)}/>} />
          <Route exact path='/profile' render={(props) => <Profile {...props} user={this.state.user} handleDeletePost={(postId) => this.handleDeletePost(postId)} postId={this.state.postId} closeModalUpdateHandler={this.closeModalUpdateHandler} openModalUpdateHandler={(postId) => this.openModalUpdateHandler(postId)} isShowingUpdate={this.state.isShowingUpdate} handleUpdateSubmit={(event) => this.handleUpdateSubmit(event, this.state.postId)}/>}/>
          <Route exact path='/addPost' render={(props) => <AddPost {...props} handleSubmit={(event) => this.handleSubmit(event)} />} />
          <Route exact path='/login' render={(props) => <LoginForm {...props} handleLogin={(event) => this.handleLogin(event)} />} />
        </>
        <>
          <Route exact path='/' component={Footer} />
        </>
      </div>
    );
  }
}

export default App;
