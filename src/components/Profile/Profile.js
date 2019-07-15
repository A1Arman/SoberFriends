import React, {useState, useEffect} from 'react';
import moment from 'moment';
import TokenService from '../../services/token-service';
import config from '../../config';
import UpdateMyPost from '../UpdateMyPost/UpdateMyPost';

const {API_BASE_URL} = config;

function useMergeState(initialState) {
    const [state, setState] = useState(initialState);
    const setMergedState = newState => 
        setState(prevState => Object.assign({}, prevState, newState)
    );
    return [state, setMergedState];
}



function Profile(props) {
    const [userRequest, setUser] = useMergeState({
        user: null,
        myPost: [],
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
            const postsResponse = await fetch(`${API_BASE_URL}/posts/myPost`, options);
            const postsData = await postsResponse.json();
            const userData = await userResponse.json();
            setUser({
                user: userData,
                myPost: postsData,
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    

    useEffect(() => {
        getUser();
    }, []);


    const {user, myPost} = userRequest;
    let currentDate = moment();

    return (
        <>
            {props.isShowingUpdate ? <div onClick={props.closeModalUpdateHandler} className="back-drop"></div> : null }
            <main role="main">
                <header role="banner">
                    <h1>Profile</h1>
                </header>
                {props.isShowingUpdate ? <UpdateMyPost className='modal' postId={props.postId} handleUpdateSubmit={props.handleUpdateSubmit} posts={myPost} show={props.isShowingUpdate} close={props.closeModalUpdateHandler}></UpdateMyPost> : null}
                {!user ? <h2>Oops Something Went Wrong</h2>: (
                    <section>
                        <header>
                            <h3>{user.first_name} {user.last_name}</h3>
                            <p>{moment(user.start_date).format("MM-DD-YYYY")}</p>
                            <p>Days Sober: {currentDate.diff(moment(user.start_date), 'days')}</p>
                            <h4>Money Saved: ${currentDate.diff(moment(user.start_date), 'days') * user.money_spent}</h4>
                            <h4>How your life will improve once you beat your addiction!</h4>
                            <p>{user.impact}</p>
                            <button>Delete Account</button>
                        </header>
                        
                    </section>
                )}
                <section className='my-posts'>
                    <h3>My Posts</h3>
                    {!myPost ? <h2>Oops Something Went Wrong</h2> : myPost.map(post => {
                        return (
                            <section key={post.id}>
                                <h4>{post.post_title}</h4>
                                <p>{post.post_content}</p>
                                <button className='deletePostBtn' onClick={() => {props.handleDeletePost(post.id); getUser()}}>Delete</button>
                                <button className='updatePostBtn' onClick={() => props.openModalUpdateHandler(post.id)}>Update</button>
                            </section>
                        )
                    })} 
                </section>  
            </main>
        </>
    )
}


export default Profile;