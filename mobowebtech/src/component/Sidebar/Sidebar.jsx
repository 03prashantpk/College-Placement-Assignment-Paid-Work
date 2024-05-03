import React, { useState } from 'react';
import './Sidebar.scss';

const Sidebar = ({ sendPageInfo }) => {
    const [pages, setPages] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [selectedPage, setSelectedPage] = useState('');
    const [userIDInput, setUserIDInput] = useState('');
    const [accessTokenInput, setAccessTokenInput] = useState('');
    const [pageAccessToken, setPageAccessToken] = useState('');
    const [APIPrams, setAPIPrams] = useState('');

    const fetchPages = async () => {
        try {
            const response = await fetch(`https://graph.facebook.com/v19.0/${userIDInput}/accounts?access_token=${accessTokenInput}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPages(data.data);
            setPageInfo(data.data);
            document.getElementById('pages').style.border = '1px solid lightgreen';
            setTimeout(() => {
                document.getElementById('pages').style.border = 'none';
            }, 5000);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageSelect = (event) => {
        setSelectedPage(event.target.value);
        // set page access token
        const page = pages.find((page) => page.id === event.target.value);
        setPageAccessToken(page.access_token);
        
    };

    const renderPageOptions = () => {
        return pages.map((page) => (
            <option key={page.id} value={page.id}>
                {page.name}
            </option>
        ));
    };

    const handleSubmit = () => {
        if (!userIDInput || !accessTokenInput) {
            alert('Please add USER_ID and Access Token');
            return;
        }

        fetchPages();
    };

    const getLikeInsights = () => {
        setAPIPrams('insights?metric=page_fan_adds,page_fan_removes');
        handleFetchPageDetails();
        alert('Likes Insights');
    };

    const getPostInsights = () => {
        setAPIPrams('insights?metric=post_impressions,post_engagements,post_clicks');
        handleFetchPageDetails();
        alert('Post Insights');
    };

    const getAllFeed = () => {
        setAPIPrams('feed');
        handleFetchPageDetails();
        alert('All Feeds');
    };

    const handleFetchPageDetails = async () => {
        if (!accessTokenInput) {
            alert('Please add Access Token');
            return;
        }

        if (selectedPage === '') {
            alert('Please select a Page');
            return;
        }

        if (!selectedPage) {
            alert('Please select a Page ID');
            return;
        }

        if (APIPrams === '') {
            alert('Please add API Parameters');
            return;
        }

        try {
            const response = await fetch(`https://graph.facebook.com/v19.0/${selectedPage}/${APIPrams}?access_token=${pageAccessToken}`);


            if (!response.ok) {
                alert('Maybe you are using User Token to fatch Pages Data, Please use Page Token');
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            setPageInfo(data);
            console.log('Page Data:', data);

            // Send page info to parent component
            sendPageInfo(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="Sidebar">
            <div className="user">
                <h3>Admin</h3>
            </div>

            <div className="form">
                <input
                    list="userIds"
                    type="text"
                    placeholder="Add USER_ID"
                    value={userIDInput}
                    onChange={(e) => setUserIDInput(e.target.value)}
                />
                <datalist id="userIds">
                    <option value={userIDInput}>{userIDInput}</option>
                </datalist>
                <input
                    list="accessTokens"
                    type="text"
                    placeholder="Add Access Token"
                    value={accessTokenInput}
                    onChange={(e) => setAccessTokenInput(e.target.value)}
                />
                <datalist id="accessTokens">
                    <option value={accessTokenInput}>{accessTokenInput}</option>
                </datalist>
                <button className="btn" onClick={handleSubmit}>Submit</button>
            </div>

            <div className="response">
                <h3>Pages</h3>
                
                <select
                    name="pages"
                    id="pages"
                    value={selectedPage}
                    onChange={handlePageSelect}
                >
                    
                    <option value="">Select Page</option>
                    {renderPageOptions()}
                </select>

                <input type="text" placeholder="Page Access token" 
                value={pageAccessToken} readOnly />

            </div>

            <div className="form_select">
                <h3>Get Page Data</h3>
                <input
                    type="text"
                    placeholder="Page ID"
                    id="page_id"
                    value={selectedPage}
                    readOnly
                />
                <textarea
                    placeholder="API Parameters"
                    id="APIPrams"
                    value={APIPrams}
                    onChange={(e) => setAPIPrams(e.target.value)}
                />

                <h3>Insights</h3>
                <div className="insights-btn">
                    <button onClick={getLikeInsights}>Get Likes</button>
                    <button onClick={getPostInsights}>Get Post</button>
                    <button onClick={getAllFeed}>List All Feeds</button>
                </div>

                <button className="btn" onClick={handleFetchPageDetails}>Submit</button>
            </div>
        </div>
    );
};

export default Sidebar;
