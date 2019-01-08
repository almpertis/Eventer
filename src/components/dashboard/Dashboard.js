import React, { Component } from 'react';
import EventList from '../events/EventsList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        const { events, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="dashboard container">
                <div className="row">
                    {events ?
                        <div className="col s12 m12">
                            <EventList events={events} />
                        </div>
                    : <p style={pStyle}>Loading...</p>}
                </div>
            </div>
        )
    }
}

const pStyle = {
    color: '#fff',
    fontSize: '28px',
    textAlign: 'center'
}


const mapStateToProps = (state) => {
    return {
        events: state.firestore.ordered.events,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'events', orderBy: ['createdAt', 'desc'] }
    ])
)(Dashboard)