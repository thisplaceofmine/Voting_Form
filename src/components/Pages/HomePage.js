import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="pusher">
            <div className="ui vertical masthead center aligned segment">
                <div className="ui text container">
                    <h1 className="ui header">Voting Booth</h1>
                    <h3>Do whatever you want when you want to.</h3>
                    <Link to="/page/new" className="ui huge primary button">
                        Get Started <i className="right arrow icon" />
                    </Link>
                    
                </div>
            </div>
        </div >
    );
}

export default HomePage;

