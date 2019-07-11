import React from 'react';

function Profile(props) {
    return (
        <main role="main">
            <header role="banner">
                <h1>Profile</h1>
            </header>
            <section>
                <header>
                    <h3>John Doe</h3>
                    <h4>Days Sober: 10</h4>
                    <h4>Money Saved: $200</h4>
                </header>
                <h3>How your life will improve once you beat your addiction!</h3>
                <p>Praesent sagittis a mi sit amet dictum. Donec orci nibh, dignissim in leo et, congue semper mauris. Donec elit lacus, dictum et placerat eget, rhoncus sodales erat. Curabitur sit amet placerat neque, a tempus mi. Suspendisse a tempus dolor. Nullam porttitor nisi sed justo dictum consequat. Etiam sed congue felis.</p>
                <button>Delete Account</button>
            </section>
        </main>
    )
}


export default Profile;