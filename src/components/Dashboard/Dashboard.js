import React, { useState, useEffect } from 'react';
import TokenService from '../../services/token-service';
import moment from 'moment';
import config from '../../config';
import Likes from '../Likes/Likes';
import Loader from '../Loader/Loader';
import Comment from '../Comment/Comment';
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
                        <h2>Welcome Back {user.first_name}</h2>
                        <h3>Days Sober: {currentDate.diff(moment(user.start_date), 'days')}</h3>
                        <h3>Money Saved: ${currentDate.diff(moment(user.start_date), 'days') * user.money_spent}</h3>
                        <h4>Quitting your addiction will impact your life by:</h4> 
                        <p>{user.impact}</p>
                        <section>
                            <h3>Featured Post</h3>
                            <h4>{post.post_title}</h4>
                            <p>{post.first_name} {post.last_name}</p>
                            <Likes postId={post.id} />
                            <p>{post.post_content}</p>
                            <button onClick={() => props.openModalHandler(post.id, post.post_title)}>Comments</button>
                            <button onClick={() => props.handleLike(post.id)}>Like</button>
                        </section>
                    </main>
                </>
            )}
        </>
    )
}

export default Dashboard;