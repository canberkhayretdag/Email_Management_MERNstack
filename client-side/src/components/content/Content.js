import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import Sidebar from '../sidebar/Sidebar'
import EmailList from './List'
import EmailTemplates from './Template'
import MyEmails from './Mails'

const Content = () => {
    return (
        <div className="content">
        <BrowserRouter>
          <Switch>
              <Route exact path="/email-lists">
                <EmailList />
              </ Route>
              <Route exact path="/email-templates">
                <EmailTemplates />
              </ Route>
              <Route exact path="/my-emails">
                <MyEmails />
              </ Route>
              <Route exact path="/email-lists" component={EmailList} />
            </Switch>        
        </BrowserRouter>            
        </div>
    )
}

export default Content
