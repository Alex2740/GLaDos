import React from 'react';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className="top-bar">
                <div className="container">
                    <div className="top-bar-left">
                        <h2>GLaDOS</h2>
                    </div>
                    <div className="top-bar-right">
                        <h2>v 0.0.1</h2>
                    </div>
                </div>  
            </div>
        )
    }
}

export default Header;