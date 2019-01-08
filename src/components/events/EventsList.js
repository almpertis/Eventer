import React from 'react';
import EventSummary from './EventSummary';
import { Link } from 'react-router-dom';
import moment from 'moment';

const pStyle = {
    color: '#fff',
    fontSize: '28px',
    textAlign: 'center',
    backgroundColor: '#3c3c3cc7',
    padding: '20px',
    borderRadius: '10px'
}

const EventList = ({ events, searchValue }) => {
    return (
        <div className="project-list section">
            {events.length < 1 && <p style={pStyle}>There are currently no events. Feel free to create one!</p>}
            {events && events.map(event => {
                if (searchValue) {
                    if (moment.unix(event.date.seconds, event.date.nanoseconds).format("MMMM Do YYYY, h:mm a").toString().indexOf(searchValue) != -1) {
                        return (
                            <Link to={'/event/' + event.id} key={event.id}>
                                <EventSummary event={event} />
                            </Link>
                        )
                    }else{
                        return <div></div>
                    }
                }
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