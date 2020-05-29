import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import './App.css';
import NoteListView from './views/NoteListView';
import NoteView from './views/NoteView';
import CreateNoteView from './views/CreateNoteView';
import EditView from './views/EditView';
import {Auth0Lock} from 'auth0-lock';
import auth0 from 'auth0-js';
// import {connect} from 'react-redux';

var lock = new Auth0Lock(
        process.env.REACT_APP_CLIENT_ID,process.env.REACT_APP_DOMAIN_URL
);

var webAuth = new auth0.WebAuth({
        domain: process.env.REACT_APP_DOMAIN_URL,
        clientID: process.env.REACT_APP_CLIENT_ID,
        redirectUrl: process.env.REACT_APP_REDIRECT_URL,
        // responseType: 'token id_token',
        scope: 'openid'
});

webAuth.parseHash((err, authResult) => {
        if (authResult) {
          // Save the tokens from the authResult in local storage or a cookie
          let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
          );
          localStorage.setItem("access_token", authResult.accessToken);
          localStorage.setItem("expires_at", expiresAt);     
        } else if (err) {
          // Handle errors
          console.log(err);
        }
});

class App extends Component {
        isAuthenticated() {
                // Check whether the current time is past the
                // Access Token's expiry time
                let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
                return new Date().getTime() < expiresAt;
        }
        logout() {
                // Clear Access Token and ID Token from local storage
                localStorage.removeItem('access_token');
                localStorage.removeItem('expires_at');
                window.location.reload();
                
        }
        render() {
                if (this.isAuthenticated()){
                        return (
                        <div className="App">
                                <nav className="navigation-panel">
                                        <h1>My Posted Notes</h1><br></br>
                                        <div className="nav-botton-container">
                                                <button className="navigation-button" onClick={() => this.props.history.push("/")} >
                                                        View Your Notes</button>
                                                <button className="navigation-button" onClick={() => this.props.history.push("/create-note")}>
                                                        + Create New Notes</button>
                                                <button className="navigation-button" onClick={()=> this.logout()}>Log Out</button>
                                        </div>
                                        
                                </nav>  
                                <div className="display-panel">                                        
                                        <div className="route-container">
                                                <Route  exact
                                                        path='/'
                                                        component={NoteListView}/>
                                                <Route  path="/note/:id"
                                                        component={NoteView}/>
                                                <Route  path='/create-note'
                                                        component={CreateNoteView}/>
                                                <Route  path='/edit/:id'
                                                        component={EditView}/>
                                        </div>
                                        
                                </div>
                        </div>
                        );
                }      
                else{
                        return(
                                <div>
                                        <h1 id="title">Welcome to MyPostedNotes</h1>
                                        <nav>
                                                <div id="login" onClick={function(){
                                                        lock.show();}}>LOG IN
                                                </div>
                                        </nav>
                                        
                                </div>
                        )
                }         
        }        
}


export default withRouter(App);
