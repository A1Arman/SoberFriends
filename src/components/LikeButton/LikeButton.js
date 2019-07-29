import React, {useState, useEffect} from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import Loader from '../Loader/Loader';

const {API_BASE_URL} = config;

function useMergeState(initialState) {
    const [state, setState] = useState(initialState);
    const setMergedState = newState => 
        setState(prevState => Object.assign({}, prevState, newState)
    );
    return [state, setMergedState];
}



function LikeButton(props) {
    const [likesRequest, setLikes] = useMergeState({
        likes: null,
        user: null,
        isLoading: true
    });

    async function fetchAllLikes() {
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
            const loggedInUserResponse = await fetch(`${API_BASE_URL}/users/user`, options);
            const loggedInUser = await loggedInUserResponse.json();
            const likeData = await likeResponse.json();
            setLikes({
                likes: likeData,
                user: loggedInUser,
                isLoading: false,
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    useEffect(() => {
        fetchAllLikes();
    }, []);

    const { likes, user, isLoading } = likesRequest;

    return (
        <>
        {isLoading ? <Loader /> 
            :  <>  
                {likes.findIndex(like => like.post_id === props.postId && like.owner === user.id) === -1
                ? <button className='deletePostBtn' onClick={() => props.handleLike(props.postId)}>Like</button> 
                : <button className='deletePostBtn' onClick={() => props.handleUnlike(props.postId)}>Unlike</button>}
            </> 
        }
        </>
    )
}

export default LikeButton;
