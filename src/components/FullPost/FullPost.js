import React from 'react';

function FullPost(props) {
    return (
        <>
        <div className='modal-wrapper'
                    style={{
                        transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                    <div className='modal-header'>
                        <h3>Comments</h3>
                    </div>
                    <div className='modal-body'>
                        <form className='comment-form' id='comment-form' onSubmit={props.handleSubmit}>
                            <div className='grid-container'>
                                <label htmlFor='comment'>Comment</label>
                                <input placeholder='Show your support!' type='text' name='comment' id='comment' required/>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                                <button className="btn-continue" type='submit'>CONTINUE</button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
}


export default FullPost