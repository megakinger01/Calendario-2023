import React from 'react'

export const CalendarEvent = ({ event }) => {

 
   
  return (
    <div>
        
        <i className="fa-solid fa-paper-plane"></i>
        <span>&nbsp; { event.title }</span>
        <strong>- { event.user.name }</strong>
    </div>
  )
}
