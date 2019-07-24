import React, { useState } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import NavBar from './components/NavBar'
//Importing routing views
import Login from './views/Login'
import Welcome from './views/Welcome'

const history = createBrowserHistory()

history.listen((location, action) => {
    console.log(location.pathname)
})


export default function Routes(props){

    return(
        <div>
            <Router history={history}>
            <NavBar history={history}/>
                <Switch>
                    <Route path='/login' exact component={Login} />
                    <Route path='/welcome' exact component={Welcome} />
                </Switch>
            </Router>
        </div>
    )
}