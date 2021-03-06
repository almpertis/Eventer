import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEvent } from '../../store/actions/eventActions';
import { Redirect } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';

export class CreateEvent extends Component {
    state = {
        title: '',
        attendees: '',
        place: '',
        date: new Date(),
        description: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createEvent(this.state);
        this.props.history.push('/');
    }
    onChange = date => this.setState({ date })
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="greay=text text-darken-3">Create new Event</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} required />
                    </div>
                    <div className="input-field">
                        <label htmlFor="attendees">Attendees</label>
                        <input type="text" id="attendees" onChange={this.handleChange} required />
                    </div>
                    <div className="input-field">
                        <label htmlFor="place">Place</label>
                        <input type="text" id="place" onChange={this.handleChange} required />
                    </div>
                    <div>
                        <span className='grey-text'>Date & Time</span> &nbsp;
                        <DateTimePicker
                            locale={'el-GR'}
                            onChange={this.onChange}
                            value={this.state.date}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" className="materialize-textarea" onChange={this.handleChange} required ></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const madDispatchToProps = (dispatch) => {
    return {
        createEvent: (event) => dispatch(createEvent(event))
    }
}

export default connect(mapStateToProps, madDispatchToProps)(CreateEvent)

