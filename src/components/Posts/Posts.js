import React, { useState, useEffect } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import Comment from '../Comment/Comment';
import { async } from 'q';

const {API_BASE_URL} = config;

function useMergeState(initialState) {
    const [state, setState] = useState(initialState);
    const setMergedState = newState => 
        setState(prevState => Object.assign({}, prevState, newState)
    );
    return [state, setMergedState];
}

function Posts(props) {
    const [postsRequest, setPosts] = useMergeState({
        posts: [],
        user: null,
    });

    async function fetchPosts() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        }
        try {
            const postResponse = await fetch(`${API_BASE_URL}/posts`, options);
            const userResponse = await fetch(`${API_BASE_URL}/users/user`, options);
            const postData = await postResponse.json();
            const userData = await userResponse.json();
            setPosts({
                posts: postData,
                user: userData
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const { posts, user } = postsRequest; 

    return (
        <>
        { props.isShowing ? <div onClick={props.closeModalHandler} className="back-drop"></div> : null }
        <main role="main">
            <header role="banner">
                <h1>Posts</h1>
            </header>
            {posts.map(post => {
                return (
                    <section className='card' key={post.id}>
                        <header>
                            <h3>{post.post_title}</h3>
                            <p>{user.first_name} {user.last_name}</p>
                            <p>{user.start_date}</p>
                        </header>
                        <p>{post.post_content}</p>
                        <button onClick={props.openModalHandler}>Comment</button>
                    </section>
                )
            })}
        </main>
        </>
    )
}

export default Posts;