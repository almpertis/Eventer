import React from 'react';

const EventSummary = ({event}) => {
    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{event.title}</span>
                <p>Posted by Almpertis</p>
                <p className="grey-text">3rs Sep, 2am</p>
            </div>
        </div>
    )
}

export default EventSummary;