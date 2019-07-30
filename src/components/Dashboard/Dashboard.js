import React, { useState, useEffect } from 'react';
import TokenService from '../../services/token-service';
import moment from 'moment';
import config from '../../config';
import Likes from '../Likes/Likes';
import Loader from '../Loader/Loader';
import Comment from '../Comment/Comment';
import LikeButton from '../LikeButton/LikeButton';
import './Dashboard.css';

const { API_BASE_URL } = config;


function useMergeState(initialState) {
    const [state, setState] = useState(initialState);
    const setMergedState = newState => 
        setState(prevState => Object.assign({}, prevState, newState)
    );
    return [state, setMergedState];
}

function Dashboard(props) {
    const [userRequest, setUser] = useMergeState({
        user: null,
        isLoading: true,
        post: null,
    })


    async function getUser() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        }
        try {
            const userResponse = await fetch(`${API_BASE_URL}/users/user`, options);
            const postResponse = await fetch(`${API_BASE_URL}/posts/getRandom`, options);
            const postData = await postResponse.json();
            const userData = await userResponse.json();
            setUser({
                user: userData,
                isLoading: false,
                post: postData
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    

    useEffect(() => {
        getUser();
    }, []);

    const { user, isLoading, post } = userRequest;
    const currentDate = moment();
    
    return (
        <>
            { props.isShowing ? <div onClick={props.closeModalHandler} className="back-drop"></div> : null }
            {props.isShowing ? <Comment className='modal' postId={props.postId} postTitle={props.postTitle} handleSubmit={props.handleCommentSubmit} show={props.isShowing} close={props.closeModalHandler} /> : null}
            {props.likeError ? <p>{props.likeError.error}</p> : null}
            {isLoading ? <Loader {...props} /> : (
                <>
                    <header>
                        <h1 className='dash-header'>Dashboard</h1>
                    </header>
                    <main>
                        <section className='dash-header-container'>
                            <svg className="pulse" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                                <circle id="Oval" cx="512" cy="512" r="512"></circle>
                                <circle id="Oval" cx="512" cy="512" r="512"></circle>
                                <circle id="Oval" cx="512" cy="512" r="512"></circle>
                            </svg>
                            <h2 id='greeting-title'>Welcome Back {user.first_name}</h2>
                            <h3>Days Sober: {currentDate.diff(moment(user.start_date), 'days')}</h3>
                            <progress id='progress2' className="progress is-medium" value={currentDate.diff(moment(user.start_date), 'days')} max="100"></progress>
                            <h3>Money Saved: ${currentDate.diff(moment(user.start_date), 'days') * user.money_spent}</h3>
                            <progress id='progress3' className="progress is-medium" value={currentDate.diff(moment(user.start_date), 'days') * user.money_spent} max="1000"></progress>
                        </section>
                        <section id='impact-section'>    
                            <h4 id='impact-title'>Quitting your addiction will impact your life by:</h4> 
                            <p id='user-impact'>{user.impact}</p>
                        </section>
                        <section id='featured-card-container'>
                        <h3 id='featured-card-title'>Featured Post</h3>
                        <section className='card dash-card'>
                            <header id='dash-card-head'>
                                <h4 id='dash-card-title'>{post.post_title}</h4>
                                <h4 id='dash-card-name'>{post.first_name} {post.last_name}</h4>
                                <Likes id='dash-card-like' postId={post.id} />
                            </header>
                            <p id='dash-card-content'>{post.post_content}</p>
                            <div id='dash-card-btns'>
                                <button className='deletePostBtn' onClick={() => props.openModalHandler(post.id, post.post_title)}>Comments</button>
                                <LikeButton handleUnlike={(postId) => props.handleUnlike(postId)} handleLike={(postId) => props.handleLike(postId)} postId={post.id}/>
                            </div>
                        </section>
                        </section>
                    </main>
                </>
            )}
        </>
    )
}

export default Dashboard;