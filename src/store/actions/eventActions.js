export const createEvent = (event) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('events').add({
            ...event,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()

        }).then(() => {
            dispatch({ type: 'CREATE_EVENT', event });
        }).catch((err) => {
            dispatch({ type: 'CREATE_EVENT_ERROR', err });
        })
    }
};

export const deleteEvent = (event_id) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.delete({ collection: 'events', doc: event_id }).then(() => {
            dispatch({ type: 'EVENT_DELETED' });
        }).catch((err) => {
            dispatch({ type: 'EVENT_NOT_DELETED' });
        })
    }
}

export const updateEvent = (event, event_id) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.update({ collection: 'events', doc: event_id }, event).then(() => {
            dispatch({ type: 'EVENT_UPDATED' });
        }).catch((err) => {
            dispatch({ type: 'EVENT_NOT_UPDATED' });
        })
    }
}