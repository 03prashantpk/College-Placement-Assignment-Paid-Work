
import React from 'react';
import './NotificationPopUp.scss';

const NotificationPopUp = () => {
    
    const close = () => {
        document.querySelector('.Notification').style.display = 'none';
    }

    return (
        <div className="Notification" id='notify'>
            <div className="inner">
                <h2>Instruction</h2>
                <ul>
                    <li>1. Enter your Facebook USER_ID and Access Token.</li>
                    <li>2. Click on the "Get Pages" button to fetch the pages.</li>
                    <li>3. Select the page from the dropdown.</li>
                    <li>4. Click on the "Get Likes Insights" button to get the likes insights.</li>
                </ul>

                <h3>API Endpoints</h3>
                <ul>
                    <li>1. / : To get Page name & ID</li>
                    <li>2. feed : To get the feed of the page</li>
                </ul>

                <h3>Use Buttons</h3>
                <ul>
                    <li>1. Get Pages : To get the pages of the user</li>
                    <li>2. Get Likes Insights : To get the likes insights of the page</li>
                </ul>

                <p>Note: Like API end point {`page_id`}/likes is deprecated.</p>
                
                <button onClick={close}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    );
}

export default NotificationPopUp;