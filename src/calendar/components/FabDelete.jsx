import React from 'react'
import { useCalendarStore } from '../../hooks/useCalendarStore'

export const FabDelete = () => {
 const { hasEventSelected, deleteEvent } =  useCalendarStore()

 const deleteEventBtn = () => {
      deleteEvent()
 }

  return (
    <button 
      className='btn btn-danger btn-delete'
      style={{
        display: hasEventSelected ? '': 'none'
      }}
      onClick={ deleteEventBtn }
      >
        <i className="fa-solid fa-trash"></i>
       &nbsp;
       borrar
    </button>
  )
}
