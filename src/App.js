import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LandingNav from './components/LandingNav/LandingNav';
import Posts from './components/Posts/Posts';
import AppNav from './components/AppNav/AppNav';
import Profile from './components/Profile/Profile';
import AddPost from './components/AddPost/AddPost';
import Footer from './components/Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isShowing: false,
        posts: [],
        user: null,
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
      content: e.target.post_content.value,
    }
    this.addPost(post)
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
          <Route exact path='/' render={(props => <LandingNav {...props} openModalHandler={this.openModalHandler} />)} />
          <Route exact path='/posts' component={AppNav} />
          <Route exact path='/profile' component={AppNav} />
          <Route exact path='/addPost' component={AppNav} />
        </header>
        <>
          <Route exact path='/' render={(props) => <LandingPage {...props} closeModalHandler={this.closeModalHandler} isShowing={this.state.isShowing} handleUserSubmit={(event) => this.handleUserSubmit(event)}/>} />
          <Route exact path='/posts' render={(props) => <Posts {...props} posts={this.state.posts} user={this.state.user} />} />
          <Route exact path='/profile' render={(props) => <Profile {...props} user={this.state.user}/>} />
          <Route exact path='/addPost' render={(props) => <AddPost {...props} handleSubmit={(event) => this.handleSubmit(event)} />} />
        </>
        <>
          <Route exact path='/' component={Footer} />
        </>
      </div>
    );
  }
}

export default App;
