import React from 'react';
import EventSummary from './EventSummary';
import { Link } from 'react-router-dom';

const pStyle = {
    color: '#fff',
    fontSize: '28px',
    textAlign: 'center',
    backgroundColor: '#3c3c3cc7',
    padding: '20px',
    borderRadius: '10px'
}

const EventList = ({ events }) => {
    return (
        <div className="project-list section">
            {events.length<1 && <p style={pStyle}>There are currently no events. Feel free to create one!</p>}
            {events && events.map(event => {
                return (
                    <Link to={'/event/' + event.id} key={event.id}>
                        <EventSummary event={event} />
                    </Link>
                )
            })}
        </div>
    )
}

export default EventList;