import React from 'react';
import EventSummary from './EventSummary';
import { Link } from 'react-router-dom';

const EventList = ({ events }) => {
    return (
        <div className="project-list section">
            {events && events.map(event => {
                return (
                    <Link to={'/event/' + event.id}>
                        <EventSummary event={event} key={event.id} />
                    </Link>
                )
            })}
        </div>
    )
}

export default EventList;