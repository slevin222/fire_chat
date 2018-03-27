import React, { Component } from 'react';
import { db } from '../firebase';
import { getRoomList, createRoom } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Lobby extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomName: ""
        };

        this.dbChatRef = db.ref('/chat-rooms');
    }

    componentDidMount() {
        console.log('go')
        db.ref('/chat-rooms').on('value', snapshot => {
            this.props.getRoomList(snapshot.val());
        })
    }

    componentWillUnmount() {
        this.dbChatRef.off();
    }

    handleCreateRoom(e) {
        e.preventDefault();
        if (!this.state.roomName) {
            return;
        }
        this.props.createRoom(this.state.roomName);
        this.setState({ roomName: '' })
    }

    render() {

        const { roomName } = this.state;
        const { roomList } = this.props;


        let rooms = [];

        if (roomList !== null) {
            rooms = Object.keys(roomList).map((key, index) => {
                return (
                    <li key={index} className="collection-item">
                        <Link to={`/room/${key}/log/${roomList[key].chatLogId}`}>{roomList[key].name}</Link>
                    </li>
                )
            });
        } else {
            rooms.push(<li key="0" className="collection-Item">No Rooms Available. Create New One.</li>)
        }

        return (
            <div>
                <h3>Chat Lobby</h3>
                <form onSubmit={this.handleCreateRoom.bind(this)} >
                    <label className="chatLobby">Chat Room Name</label>
                    <input type="text" value={roomName} onChange={e => this.setState({ roomName: e.target.value })} />
                    <button className="btn blue darken-4 z-depth-2">Create Room</button>
                </form>
                <ul className="collection z-depth-2">
                    {rooms}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        roomList: state.chat.roomList
    }
}

export default connect(mapStateToProps, { getRoomList, createRoom })(Lobby);