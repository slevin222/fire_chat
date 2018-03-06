import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import Lobby from './lobby';
import { Route } from 'react-router-dom';
import ChatRoom from './chat_room';


const App = () => (
    <div className="container">
        <h1 className='center z-depth-2 cyan lighten-5'>Fire Chat</h1>
        <Route exact path='/' component={Lobby} />
        <Route path='/room/:roomId/log/:logId' component={ChatRoom} />
    </div>
);

export default App;
