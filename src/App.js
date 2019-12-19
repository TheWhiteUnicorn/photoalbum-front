import React from 'react';
import './App.css';
import { Route, Switch} from "react-router-dom";

import Home from './screens/home'
import Album from "./screens/album";
import Photo from "./screens/photo";

function App() {
  return (
      <div>
        <main>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/albums/:id" component={Album}/>
                <Route path="/photos/:id" component={Photo}/>
            </Switch>
        </main>
      </div>
  );
}

export default App;
