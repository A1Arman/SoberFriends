import React, { useState, useEffect } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import Comment from '../Comment/Comment';
import Loader from '../Loader/Loader';
import Likes from '../Likes/Likes';
import LikeButton from '../LikeButton/LikeButton';
import './Post.css';

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
        isLoading: true,
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
            const postData = await postResponse.json();
            setPosts({
                posts: postData,
                isLoading: false
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const { posts,  isLoading } = postsRequest; 

    return (
        <>
        {isLoading ? <Loader {...props} /> : (
            <>
                { props.isShowing ? <div onClick={props.closeModalHandler} className="back-drop"></div> : null }
                <main role="main">
                    <header role="banner">
                        <h1>Posts</h1>
                    </header>
                    {props.isShowing ? <Comment className='modal' postId={props.postId} postTitle={props.postTitle} handleSubmit={props.handleCommentSubmit} show={props.isShowing} close={props.closeModalHandler} /> : null}
                    {props.likeError ? <p>{props.likeError.error}</p> : null}
                    {posts.map(post => {
                        return (
                            <section className='card card-grid-container' key={post.id}>
                                <header className='card-header-container'>
                                    <h3 id='post-main-title'>{post.post_title}</h3>
                                    <h4>{post.first_name} {post.last_name}</h4>
                                    <Likes postId={post.id} />
                                </header>
                                <p id='post-content'>{post.post_content}</p>
                                <div className='btn-grid-container'>
                                    <button id='comment-btn' className='updatePostBtn' onClick={() => props.openModalHandler(post.id, post.post_title)}>Comments</button>
                                    <LikeButton id='like-btn' handleUnlike={(postId) => props.handleUnlike(postId)} handleLike={(postId) => props.handleLike(postId)} postId={post.id}/>
                                </div>
                            </section>
                        )
                    })}
                </main>
            </>
        )
    }
    </>
)}

export default Posts;