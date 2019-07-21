import React, { useState, useEffect } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';

const {API_BASE_URL} = config;

function useMergeState(initialState) {
    const [state, setState] = useState(initialState);
    const setMergedState = newState => 
        setState(prevState => Object.assign({}, prevState, newState)
    );
    return [state, setMergedState];
}

function Likes(props) {
    const [likesRequest, setLikes] = useMergeState({
        likes: null
    });

    async function fetchLikes() {
        const postId = props.postId
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        }
        try {
            const likeResponse = await fetch(`${API_BASE_URL}/posts/${postId}/likes`, options);
            const likeData = await likeResponse.json();
            setLikes({
                likes: likeData
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    useEffect(() => {
        fetchLikes();
    }, []);

    const { likes } = likesRequest;
    
    return (
        <div>
            <h4>Likes: {likes ? likes.length : 0}</h4>
        </div>
    )
}

export default Likes;