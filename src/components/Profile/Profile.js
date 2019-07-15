import React, {useState, useEffect} from 'react';
import moment from 'moment';
import TokenService from '../../services/token-service';
import config from '../../config';

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
        user: null
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
            const userData = await userResponse.json();
            setUser({
                user: userData
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    useEffect(() => {
        getUser();
    }, []);


    const {user} = userRequest;
    let currentDate = moment();

    return (
        <main role="main">
            <header role="banner">
                <h1>Profile</h1>
            </header>
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
        </main>
    )
}


export default Profile;