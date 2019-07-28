import React from 'react';
import './AddPost.css';

function AddPost(props) {
    return (
        <main role="main">
            <header>
                <h1>New Post</h1>
            </header>
            <section>
                <form id="add-post-form" onSubmit={props.handleSubmit}>
                <div className="form-section grid-container">
                    <label className='addPost-label' htmlFor="post_title">Post title</label>
                    <input type="text" name="post_title" id="post_title" placeholder="Feeling Unstoppable" required />
                </div>
                <div className="form-section grid-container">
                    <label className='addPost-label' htmlFor="post_content">Post Content<br/>
                        (Tell us about your current journey, how you are feeling, or just any tips you might have!)</label>
                    <textarea name="post_content" rows="10" id="post_content" required></textarea>
                </div>
                <button type="submit" className='sub-btn' onClick={props.handleValidation}><span>Submit</span></button>
                <button type="reset" className='rst-btn'><span>Reset</span></button>
                {props.contentValid ? null : <p>Both title and content field are required</p>}
                </form>
            </section>
        </main>
    )
}

export default AddPost;