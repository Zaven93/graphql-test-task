import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Login from './Login'
import MainPage from './MainPage'
import PrivateRoute from './routing/PrivateRoute'
import ArticleInfo from './ArticleInfo'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute path="/articles" component={MainPage} />
                <PrivateRoute path="/article/:id" component={ArticleInfo} />
            </Switch>
        </Router>
    )
}

export default App
