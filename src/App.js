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
        posts: [],
        user: null,
        logInError: null,
        loggedIn: false
    }
  }

  handleUserSubmit = e => {
    e.preventDefault();
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    let startDate = `${mm}/${dd}/${yyyy}`;

    const user = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      money_spent: e.target.money_spent.value,
      impact: e.target.impact.value,
      start_date: startDate
    }

    this.setState({
      user: user,
      isShowing: false
    });
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
    console.log('run')
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

  render() {
    return (
      <div className='App'>
        <header>
          <Route exact path='/' render={(props => <LandingNav {...props} openModalHandler={this.openModalHandler} isShowing={this.state.isShowing} closeModalHandler={this.closeModalHandler}/>)} />
          <Route exact path='/posts' component={AppNav} />
          <Route exact path='/profile' component={AppNav} />
          <Route exact path='/addPost' component={AppNav} />
          <Route exact path='/login' component={LandingNav} />
        </header>
        <>
          <Route exact path='/' render={(props) => <LandingPage {...props} closeModalHandler={this.closeModalHandler} isShowing={this.state.isShowing} handleUserSubmit={(event) => this.handleUserSubmit(event)}/>} isLoggedIn={this.state.loggedIn} />
          <Route exact path='/posts' render={(props) => <Posts {...props} posts={this.state.posts} closeModalHandler={this.closeModalHandler} user={this.state.user}  openModalHandler={this.openModalHandler} isShowing={this.state.isShowing} handleCommentSubmit={(event) => this.handleCommentSubmit(event)}/>} />
          <Route exact path='/profile' render={(props) => <Profile {...props} user={this.state.user}/>} />
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
