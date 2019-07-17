import React from 'react';

function DeleteMyAccount(props) {
    return (
        <section>
        <div className='modal-wrapper'
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className='modal-header'>
                    <h3>Delete Account?</h3>
                </div>
                <div className='modal-body'>
                    <p>Account Deletions Cannot be Undone!</p>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                    <button className="btn-continue" type='button' onClick={props.handleDelete}>CONTINUE</button>
                </div>
            </div>
        </section>
    )
}

export default DeleteMyAccount;