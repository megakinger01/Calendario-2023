import { useState } from "react"
import { Calendar } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'



import { CalendarEvent, calendarLocalizer, Navbar,CalendarModal } from "../"
import { messagesInEs } from "../helpers/messagesInEs"
import { useUiStore } from "../../hooks/useUiStore"
import { useCalendarStore } from "../../hooks/useCalendarStore"
import { Fab } from "../components/Fab"
import { FabDelete } from "../components/FabDelete"






export const CalendarPage = () => {

const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' )
const {  openDateModal } = useUiStore()

const { events, activeEventSet } = useCalendarStore()






  const eventStyleGetter = ({ title, start , end }) => {

    const style= {
      backgroundColor: 'blue',
      color:"white",
    }  

    return {
      style
    }
  }


  const onClick = ( event ) => {
    activeEventSet( event )
  }

  const onDoubleClick = ( event ) =>{
      activeEventSet( event )
      openDateModal()
  }

  const onViewChange = ( event ) => {
    localStorage.setItem( 'lastView', event )
    setLastView( event )
  }




  return (
    <>
      <Navbar />

      <Calendar
        localizer={calendarLocalizer}
        eventPropGetter={ eventStyleGetter }
        culture="es"
        style={{ height: 600 }}

        events={ events }
        onSelectEvent={ onClick }
        onDoubleClickEvent={ onDoubleClick }
        onView={ onViewChange }
        defaultView={ lastView }

        startAccessor="start"
        endAccessor="end"
        messages={ messagesInEs()}
        components={{
          event: CalendarEvent
        }}
      />
      <Fab />
      <FabDelete />
      

      <CalendarModal />
    </>
  )
}
