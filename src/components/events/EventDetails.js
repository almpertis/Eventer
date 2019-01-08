import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { deleteEvent } from '../../store/actions/eventActions';

export class EventDetails extends Component {
    handleDelete = (e) => {
        this.props.deleteEvent(this.props.match.params.id)
    }
    render() {
        const { event, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        if (event) {
            console.log(event)
            return (
                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{event.title}</span>
                            <p><strong>Attendees: </strong>{event.attendees}</p>
                            <p><strong>Place: </strong>{event.place}</p>
                            <p><strong>Date: </strong>{moment(event.createdAt.toDate()).calendar()}</p>
                            <p><strong>Description: </strong>{event.description}</p>
                            <br />
                            <div className="card-action grey lighten-4 grey-text">
                                <div>Event posted by {event.authorFirstName} {event.authorLastName}, {moment(event.createdAt.toDate()).calendar()}</div>
                            </div>
                            <button onClick={this.handleDelete}>delete</button>
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
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const events = state.firestore.data.events;
    const event = events ? events[id] : null;
    return {
        event: event,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteEvent: (event_id) => dispatch(deleteEvent(event_id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'events' }
    ])
)(EventDetails);
