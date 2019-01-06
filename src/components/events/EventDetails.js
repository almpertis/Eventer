import React from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const EventDetails = (props) => {
    const { event } = props;
    if (event) {
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{event.title}</span>
                        <p>{event.content}</p>
                        <div className="card-action grey lighten-4 grey-text">
                            <div>Posted by {event.authorFirstName} {event.authorLastName}</div>
                            <div>2nd September, 2am</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading Event...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const events = state.firestore.data.events;
    const event = events ? events[id] : null;
    return {
        event: event
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'events' }
    ])
)(EventDetails);
