import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LandingNav from './components/LandingNav/LandingNav';
import Posts from './components/Posts/Posts';
import AppNav from './components/AppNav/AppNav';
import Profile from './components/Profile/Profile';
import AddPost from './components/AddPost/AddPost';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isShowing: false,
        posts: []
    }
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
          <Route exact path='/' render={(props) => <LandingPage {...props} closeModalHandler={this.closeModalHandler} isShowing={this.state.isShowing}/>} />
          <Route exact path='/posts' component={Posts} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/addPost' render={(props) => <AddPost {...props} handleSubmit={(event) => this.handleSubmit(event)} />} />
        </>
      </div>
    );
  }
}

export default App;
