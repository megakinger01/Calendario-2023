import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveEvent, newEvent, updateEvent, onDeleteEvent } from '../store/calendar/calendarSlice'

export const useCalendarStore = () => {
    const { events, activeEvent,  } = useSelector(state => state.calendar)
    const dispatch = useDispatch()

    const activeEventSet = ( event ) => {
        dispatch( setActiveEvent( event ) )

    }

    const startLoadingEvent = ( calendarEvent ) => {
        // TODO: llegar al backend


        // todo bien:
        if ( calendarEvent._id ) {
            // siginifica que estoy acualizando el evento xq ya tiene un id ese evento
            dispatch( updateEvent( calendarEvent ))

            
        } else {
            // significa que es un nuevo evento y le damos un id temporal
            dispatch( newEvent({ ...calendarEvent, _id: new Date().getTime() }))
            
        }



    }
     
    const deleteEvent = () => {
        dispatch( onDeleteEvent() )
    }
    
    return{
        // propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // método
        activeEventSet,
        startLoadingEvent,
        deleteEvent
    }
}
