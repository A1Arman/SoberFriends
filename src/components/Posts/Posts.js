import React from 'react';


function Posts(props) {
    return (
        <main role="main">
            <header role="banner">
                <h1>Posts</h1>
            </header>
            {props.posts.map(post => {
                return (
                    <section className='card'>
                        <header>
                            <h3>{post.post_title}</h3>
                            <p>{props.user.first_name} {props.user.last_name}</p>
                            <p>{props.user.start_date}</p>
                        </header>
                        <p>{post.content}</p>
                    </section>
                )
            })}
            <section>
                <header>
                    <h3>Feeling Down</h3>
                    <p>John Doe</p>
                    <p>07.08.2019</p>
                </header>
                <p>Praesent sagittis a mi sit amet dictum. Donec orci nibh, dignissim in leo et, congue semper mauris. Donec elit lacus, dictum et placerat eget, rhoncus sodales erat. Curabitur sit amet placerat neque, a tempus mi. Suspendisse a tempus dolor. Nullam porttitor nisi sed justo dictum consequat. Etiam sed congue felis.</p>
            </section>
            <section>
                <header>
                    <h3>1 month sober!!!</h3>
                    <p>Jane Smith</p>
                    <p>01.27.2017</p>
                </header>
                <p>Praesent sagittis a mi sit amet dictum. Donec orci nibh, dignissim in leo et, congue semper mauris. Donec elit lacus, dictum et placerat eget, rhoncus sodales erat. Curabitur sit amet placerat neque, a tempus mi. Suspendisse a tempus dolor. Nullam porttitor nisi sed justo dictum consequat. Etiam sed congue felis.</p>
            </section>
            <section>
                <header>
                    <h2>Might have a relaspe</h2>
                    <p>Susy Shoehorn</p>
                    <p>01.26.2017</p>
                </header>
                <p>Praesent sagittis a mi sit amet dictum. Donec orci nibh, dignissim in leo et, congue semper mauris. Donec elit lacus, dictum et placerat eget, rhoncus sodales erat. Curabitur sit amet placerat neque, a tempus mi. Suspendisse a tempus dolor. Nullam porttitor nisi sed justo dictum consequat. Etiam sed congue felis.</p>
            </section>
        </main>
    )
}

export default Posts;