import React, { useState, useEffect } from 'react';
import config from '../../config';
import moment from 'moment';
import TokenService from '../../services/token-service';
import './Comment.css';

const { API_BASE_URL } = config;

function useMergeState(initialState) {
    const [state, setState] = useState(initialState);
    const setMergedState = newState => 
        setState(prevState => Object.assign({}, prevState, newState)
    );
    return [state, setMergedState];
}

function Comment(props) {
    const [commentsRequest, setComments] = useMergeState({
        comments: [],
        isLoading: true
    });

    async function fetchComments() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        }
        try {
            const commentResponse = await fetch(`${API_BASE_URL}/comments/${props.postId}`, options);
            const commentsData = await commentResponse.json();
            setComments({
                comments: commentsData,
                isLoading: false
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    useEffect(() => {
        fetchComments();
    }, []);

    const { comments, isLoading } = commentsRequest;


    return (
        <>
        {isLoading ? null : (
            <div className='modal-wrapper comment-modal'
                    style={{
                        transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                    <div className='modal-header'>
                        <h3 className='comment-title'>{props.postTitle}</h3>
                    </div>
                    <div className='modal-body'>
                        <header>
                            {comments.map(comment => {
                                return (
                                    <div key={comment.id} className='comment-grid-container'>
                                        <p id='comment-name'>{comment.first_name}</p>
                                        <p id='comment-content'>{comment.comment}</p>
                                        <p id='comment-date'>{moment(comment.date_commented).format('MM.DD.YY')}</p>
                                    </div>
                                )
                            })}
                        </header>
                        <main>
                            <form className='comment-form' id='comment-form' onSubmit={props.handleSubmit}>
                                <div className='grid-container'>
                                    <label htmlFor='comment' id='comment-label'>Comment</label>
                                    <input placeholder='Show your support!' type='text' name='comment' id='comment' required/>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn-cancel" onClick={props.close}><span>CLOSE</span></button>
                                    <button className="btn-continue" type='submit'><span>CONTINUE</span></button>
                                </div>
                            </form>
                        </main>
                    </div>
                </div>
            )}
        </>
    )
}

export default Comment;