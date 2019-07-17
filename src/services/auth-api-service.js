import config from '../config';

const { API_BASE_URL } = config;

const AuthApiService = {
    postLogin({email, password}) {
        return fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
            .then(res => {
                return res.json();
            })
    },
    postUser(user) {
        return fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    res.json().then(error => error)
                }
            })
    }
}

export default AuthApiService;