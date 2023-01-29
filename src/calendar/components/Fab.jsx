import { addHours } from 'date-fns'
import React from 'react'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { useUiStore } from '../../hooks/useUiStore'
import '../styles/botonFlotante.css'

export const Fab = () => {
    const { activeEventSet } = useCalendarStore()
    const { openDateModal } = useUiStore()


    const onclickhandle = () =>{
        activeEventSet({
            title:'',
            notes:'',
            start: new Date(),
            end: addHours( new Date(), 2),
            user:{
                _id:'123',
                name:'Pedro'
            }
        })
        openDateModal()
    }


  return (
    <button 
        className="btn-flotante "
        onClick={ onclickhandle }
        
    >
        <i className="fas fa-calendar-alt"></i>
        &nbsp;
        Agregar evento
    </button>
  )
}
