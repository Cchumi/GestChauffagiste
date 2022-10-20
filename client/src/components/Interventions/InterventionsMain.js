import React, {useState} from 'react';
import { Calendar } from 'primereact/calendar';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
export const InterventionsMain = () => {
    const [date17, setDate17] = useState(null);
    const events = [
        {
          id: 1,
          title: 'event 1',
          start: '2022-09-24T10:00:00',
          end: '2022-09-24T12:00:00',
        },
        {
          id: 2,
          title: 'event 2',
          start: '2022-09-25T13:00:00',
          end: '2022-09-25T18:00:00',
        },
        { id: 3, title: 'event 3', start: '2022-09-23', end: '2022-09-26' },
      ];
    return (
<FullCalendar
schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
locale={frLocale}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
        headerToolbar={{
            //center: 'dayGridMonth,timeGridWeek,timeGridDay,new, printButton',
            left: 'today,prevYear,nextYear,printButton,new',
           center: 'prev,title,next',
           right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          customButtons={{
            new: {
              text: 'new',
              click: () => console.log('new event'),
            },
            printButton: {
                icon: 'print',
                click: function() {
                  window.print();
                }
              }
          }}
          views= {{
            month: {
              columnFormat:'dddd'
            },
            agendaWeek:{
              columnFormat:'ddd D/M',
              eventLimit: false
            },
            agendaDay:{
              columnFormat:'dddd',
              eventLimit: false
            },
            listWeek:{
              columnFormat:''
            }
        }}
        initialView="dayGridMonth"
        events={events}
        eventColor="red"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.id)}
      />
            /*<Calendar value={date17} onChange={(e) => setDate17(e.value)} inline showWeek className='' monthNavigator yearNavigator yearRange="2010:2030" />*/

    )
}
