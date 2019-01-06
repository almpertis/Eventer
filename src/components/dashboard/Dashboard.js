import React, { Component } from 'react';
import EventList from '../events/EventsList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m12">
                        <EventList events={this.props.events} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.firestore.ordered.events
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'events'}
    ])
)(Dashboard)