import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"
import { setCurrentUser, logoutUser } from "./actions/authActions"

import { Provider } from "react-redux"
import store from "./store"

import "./App.css"
import PrivateRoute from './components/common/PrivateRoute.jsx'


import Navbar from "./components/layout/Navbar.jsx"
import Footer from "./components/layout/Footer.jsx"
import Landing from "./components/layout/Landing.jsx"
import Register from "./components/auth/Register.jsx"
import Login from "./components/auth/Login.jsx"
import Dashboard from "./components/dashboard/Dashboard.jsx"
import { clearCurrentProfile } from "./actions/profileActions"
import CreateProfile from './components/create-profile/CreateProfile.jsx';
import EditProfile from './components/edit-profile/EditProfile.jsx'
import AddExperience from './components/add-credentials/AddExperience.jsx'
import AddEducation from './components/add-credentials/AddEducation.jsx'
import Profiles from './components/profiles/Profiles.jsx'
import Profile from './components/profile/Profile.jsx'
import ProfileActions from "./components/dashboard/ProfileActions.jsx"
import NotFound from './components/not-found/NotFound.jsx'
import Posts from './components/posts/Posts.jsx'
import Post from './components/post/Post.jsx'

if (localStorage.jwtToken) {
  // set auth token
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  //set user
  store.dispatch(setCurrentUser(decoded))
  //check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentProfile())
    window.location.href = "/"
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/feed"
                  component={Posts}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/post/:id"
                  component={Post}
                />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App





























// import logo from './logo.svg';
// import './App.css';
// import Landing from './components/layout/Landing.jsx'
// import {BrowserRouter as Router} from "react-router-dom";


// function App() {
//   return (
//       <Router>
//         <div className="App">
//           <Landing />
//         </div>
//       </Router>
//   );
// }

// export default App;
