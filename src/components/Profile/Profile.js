import React, {useState, useEffect} from 'react';
import moment from 'moment';
import TokenService from '../../services/token-service';
import Loader from '../Loader/Loader';
import config from '../../config';
import UpdateMyPost from '../UpdateMyPost/UpdateMyPost';
import DeleteMyAccount from '../DeleteMyAccount/DeleteMyAccount';
import DeleteMyPost from '../DeleteMyPost/DeleteMyPost';

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
        isLoading: true,
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
                isLoading: false,
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    

    useEffect(() => {
        getUser();
    }, []);


    const {user, myPost, isLoading} = userRequest;
    let currentDate = moment();

    return (
        <>
            {props.isShowingUpdate ? <div onClick={props.closeModalUpdateHandler} className="back-drop"></div> : null }
            {props.isShowingDelete ? <div onClick={props.closeModalDeleteHandler} className="back-drop"></div> : null }
            {props.isShowingDeletePost ? <div onClick={props.closeModalDeletePostHandler} className="back-drop"></div> : null }
            {isLoading ? <Loader {...props} /> : (
                <main role="main">
                    <header role="banner">
                        <h1>Profile</h1>
                    </header>
                    {props.isShowingUpdate ? <UpdateMyPost className='modal' validate={props.validation} postId={props.postId} handleUpdateSubmit={props.handleUpdateSubmit} posts={myPost} show={props.isShowingUpdate} close={props.closeModalUpdateHandler}></UpdateMyPost> : null}
                    {!user ? <h2>Oops Something Went Wrong</h2>: (
                        <section>
                            <header>
                                <h3>{user.first_name} {user.last_name}</h3>
                                <p>Date Started: {moment(user.start_date).format("MM-DD-YYYY")}</p>
                                <p>Days Sober: {currentDate.diff(moment(user.start_date), 'days')}</p>
                                <h4>Money Saved: ${currentDate.diff(moment(user.start_date), 'days') * user.money_spent}</h4>
                                <p>{user.impact}</p>
                            </header>
                        </section>
                    )}
                    {props.isShowingDelete ? <DeleteMyAccount className='modal' handleDelete={props.deleteAccount} show={props.isShowingDelete} close={props.closeModalDeleteHandler}></DeleteMyAccount> : null}
                    {props.isShowingDeletePost ? <DeleteMyPost className='modal' postId={props.postId} handleDelete={props.handleDeletePost} posts={myPost} show={props.isShowingDeletePost} close={props.closeModalDeletePostHandler}></DeleteMyPost> : null}
                    <section className='my-posts'>
                        <h3>My Posts</h3>
                        {!myPost ? <h2>Oops Something Went Wrong</h2> : myPost.map(post => {
                            return (
                                <section key={post.id}>
                                    <h4>{post.post_title}</h4>
                                    <p>{post.post_content}</p>
                                    <button className='deletePostBtn' onClick={() => {props.openModalDeletePostHandler(post.id); getUser()}}>Delete</button>
                                    <button className='updatePostBtn' onClick={() => props.openModalUpdateHandler(post.id)}>Update</button>
                                </section>
                            )
                        })}
                        <button onClick={props.openModalDeleteHandler}>Delete Account</button> 
                    </section>  
                </main>
            )}
        </>
    )
}


export default Profile;