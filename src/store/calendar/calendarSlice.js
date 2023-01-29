import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'


const eventTemp = {
        _id: new Date().getTime(),
        title: 'TENGO QUE CONSEGUIR ESTE EMPLEO YA',
        notes:'Hay que buscarlo',
        start: new Date(),
        end:  addHours( new Date() , 2 ) ,
        user:{
            _id:'123',
            name:'Pedro'
        }
    
  }

 

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState:{
      events:[ eventTemp ],
      activeEvent: null ,
    },
    reducers: {
      setActiveEvent: ( state,{ payload } ) => {
            state.activeEvent = payload
      },
      newEvent: ( state,{ payload } ) => {
            state.events.push( payload )
            state.activeEvent= null
      },
      updateEvent: ( state,{ payload }) => {
            state.events = state.events.map( event => {
                if (event._id === payload._id) {
                  return payload
                  
                }

              return event
            })
      },
      onDeleteEvent: ( state ) => {
        if (state.activeEvent) {          
          state.events = state.events.filter(event => event._id !== state.activeEvent._id )
          state.activeEvent = null 
        }

      }

    },
  })


 export const { setActiveEvent, newEvent, updateEvent, onDeleteEvent  } = calendarSlice.actions