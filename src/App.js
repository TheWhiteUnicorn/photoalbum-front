import React, {Component} from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";

import {connect, Provider} from 'react-redux';

import Home from './screens/home'
import Album from "./screens/album";
import Photo from "./screens/photo";

import { getUser, saveUserKey } from "./store/action/actions";
import store from "./store/store";

class App extends Component {
   async componentDidMount () {
        const { getUser, saveUserKey } = this.props;
        const key = await localStorage.getItem('key');
        if(key) {
            await saveUserKey(key);
            await getUser(key);
        }
    }
    render() {
        return (
            <div>
                <Provider store = {store}>
                    <main>
                        <BrowserRouter>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/albums/:id" component={Album}/>
                                <Route path="/photos/:id" component={Photo}/>
                            </Switch>
                        </BrowserRouter>
                    </main>
                </Provider>
            </div>
        );
    }
}


const mapDispatchToProps = {
    getUser,
    saveUserKey,
};

export default connect(null, mapDispatchToProps)(App);
