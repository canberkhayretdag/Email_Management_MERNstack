import React from 'react'

import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__items">
                <Router>
                    <p><Link to="/email-lists">Email Lists</Link></p>
                    <p><Link to="/email-templates">Email Templates</Link></p>
                    <p><Link to="/my-emails">My Emails</Link></p>
                </Router>
            </div>
            
            <div className="sidebar__items">
                
            </div>
        </div>
    )
}

export default Sidebar
