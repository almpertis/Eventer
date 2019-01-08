import React from 'react';
import moment from 'moment';

const EventSummary = ({event}) => {
    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{event.title}</span>
                <p>Posted by {event.authorFirstName} {event.authorLastName}</p>
                <p className="grey-text">{moment(event.date.toDate()).calendar()}</p>
            </div>
        </div>
    )
}

export default EventSummary;