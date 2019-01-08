import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateEvent } from '../../store/actions/eventActions';

export class UpdateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            attendees: '',
            place: '',
            date: new Date(),
            description: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        debugger;
        this.props.updateEvent(this.state, this.props.match.params.id);
        this.props.history.push('/');
    }
    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevProps.event == null) {
            this.setState({ ...this.props.event });
        }
    }
    onChange = date => {
        this.setState({ date })
    }
    render() {
        const { auth, event } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        if (event) {
            return (
                <div className="container">
                    <form onSubmit={this.handleSubmit} className="white">
                        <h5 className="greay=text text-darken-3">Update Event</h5>
                        <div className="input-field">
                            <div className="grey-text">Title</div>
                            <input defaultValue={event.title} type="text" id="title" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field">
                            <div className="grey-text">Attendees</div>
                            <input defaultValue={event.attendees} type="text" id="attendees" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field">
                            <div className="grey-text">Place</div>
                            <input defaultValue={event.place} type="text" id="place" onChange={this.handleChange} required />
                        </div>
                        <div>
                            <span className='grey-text'>Date & Time</span> &nbsp;
                        <DateTimePicker
                                locale={'el-GR'}
                                onChange={this.onChange}
                                value={event.date.toDate()}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <div className="grey-text">Description</div>
                            <textarea defaultValue={event.description} id="description" className="materialize-textarea" onChange={this.handleChange} required ></textarea>
                        </div>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">Update Event</button>
                        </div>

                    </form>
                </div>
            )
        }
        else {
            return (
                <p>Loading...</p>
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

const mapDispatchToProps = (dispatch, ownProps) => {
    const id = ownProps.match.params.id;
    return {
        updateEvent: (event, id) => dispatch(updateEvent(event, id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'events' }
    ])
)(UpdateEvent);

