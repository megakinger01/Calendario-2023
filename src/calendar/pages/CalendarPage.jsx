import { addHours } from "date-fns"


import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

import 'react-big-calendar/lib/css/react-big-calendar.css'


import { Navbar } from "../"

const locales = {
  'en-US': enUS,
}



const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})



export const CalendarPage = () => {


  const myEvents = [{

    title: 'TENGO QUE CONSEGUIR ESTE EMPLEO YA',
    start: new Date(),
    end: ( addHours( new Date() , 2 ) )

  }]



  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={ myEvents }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </>
  )
}
