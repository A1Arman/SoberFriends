import React from 'react';
import './DeleteMyPost.css';

function DeleteMyPost(props) {
    const post = props.posts.filter(post => post.id === props.postId)
    return (
        <>
        <div className='modal-wrapper deletePost'
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className='modal-header'>
                    <h3 id='deletePostTitle'>Delete Post "{post[0].post_title}"?</h3>
                </div>
                <div className='modal-body'>
                    <p>Post Deletions Cannot be Undone!</p>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}><span>CLOSE</span></button>
                    <button className="btn-continue" type='button' onClick={props.handleDelete}><span>CONTINUE</span></button>
                </div>
            </div>
        </>
    )
}

export default DeleteMyPost;