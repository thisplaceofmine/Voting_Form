import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">HomePage</Link>
            <Link to="/page/list" className="item">List</Link>

            <div className="right menu">
                <div className="item">
                    <Link to="/page/login" className="ui button">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;