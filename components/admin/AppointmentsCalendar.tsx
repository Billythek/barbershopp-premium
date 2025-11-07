'use client'

import { Calendar, momentLocalizer, View } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/fr'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'

moment.locale('fr')
const localizer = momentLocalizer(moment)

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  resourceId?: string
  barber?: string
  client?: string
  service?: string
  status?: 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED'
}

// Demo data
const demoEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Jean Dupont - Coupe + Barbe',
    start: new Date(2025, 10, 7, 9, 0),
    end: new Date(2025, 10, 7, 10, 0),
    barber: 'Marc',
    client: 'Jean Dupont',
    service: 'Coupe + Barbe',
    status: 'CONFIRMED',
  },
  {
    id: '2',
    title: 'Marie Martin - Coupe',
    start: new Date(2025, 10, 7, 10, 30),
    end: new Date(2025, 10, 7, 11, 15),
    barber: 'Marc',
    client: 'Marie Martin',
    service: 'Coupe Classique',
    status: 'CONFIRMED',
  },
  {
    id: '3',
    title: 'Pierre Bernard - Barbe',
    start: new Date(2025, 10, 7, 14, 0),
    end: new Date(2025, 10, 7, 14, 30),
    barber: 'Marc',
    client: 'Pierre Bernard',
    service: 'Entretien Barbe',
    status: 'IN_PROGRESS',
  },
  {
    id: '4',
    title: 'Thomas Petit - Rasage',
    start: new Date(2025, 10, 7, 15, 0),
    end: new Date(2025, 10, 7, 15, 40),
    barber: 'Marc',
    client: 'Thomas Petit',
    service: 'Rasage Traditionnel',
    status: 'CONFIRMED',
  },
  {
    id: '5',
    title: 'Alexandre Roux - Service Complet',
    start: new Date(2025, 10, 8, 10, 0),
    end: new Date(2025, 10, 8, 11, 30),
    barber: 'Marc',
    client: 'Alexandre Roux',
    service: 'Service Complet',
    status: 'CONFIRMED',
  },
]

export function AppointmentsCalendar() {
  const [view, setView] = useState<View>('week')
  const [date, setDate] = useState(new Date())
  const [events] = useState<CalendarEvent[]>(demoEvents)

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = '#8B4513' // mocha-500
    let borderColor = '#6B3410'

    switch (event.status) {
      case 'IN_PROGRESS':
        backgroundColor = '#0A1628' // navy
        borderColor = '#050B14'
        break
      case 'COMPLETED':
        backgroundColor = '#10B981' // emerald
        borderColor = '#059669'
        break
      case 'CANCELED':
        backgroundColor = '#EF4444' // red
        borderColor = '#DC2626'
        break
    }

    return {
      style: {
        backgroundColor,
        borderLeft: `4px solid ${borderColor}`,
        borderRadius: '6px',
        color: 'white',
        border: 'none',
        padding: '4px 8px',
        fontSize: '13px',
        fontWeight: '500',
      },
    }
  }

  return (
    <Card className="p-6 border-2 border-gray-200 shadow-xl">
      <style jsx global>{`
        .rbc-calendar {
          font-family: Inter, sans-serif;
        }
        .rbc-header {
          padding: 12px 6px;
          font-weight: 600;
          font-size: 14px;
          color: #0A1628;
          border-bottom: 2px solid #E5E7EB;
          background-color: #F9FAFB;
        }
        .rbc-today {
          background-color: #FEF3C7 !important;
        }
        .rbc-time-slot {
          min-height: 40px;
        }
        .rbc-timeslot-group {
          min-height: 80px;
          border-left: 2px solid #E5E7EB;
        }
        .rbc-time-content {
          border-top: 2px solid #E5E7EB;
        }
        .rbc-current-time-indicator {
          background-color: #8B4513;
          height: 2px;
        }
        .rbc-event {
          padding: 4px 8px;
        }
        .rbc-event:focus {
          outline: 2px solid #8B4513;
          outline-offset: 2px;
        }
        .rbc-toolbar {
          padding: 16px;
          background-color: #F9FAFB;
          border-radius: 8px;
          margin-bottom: 16px;
          border: 2px solid #E5E7EB;
        }
        .rbc-toolbar button {
          color: #0A1628;
          border: 2px solid #E5E7EB;
          border-radius: 6px;
          padding: 8px 16px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .rbc-toolbar button:hover {
          background-color: #8B4513;
          color: white;
          border-color: #8B4513;
        }
        .rbc-toolbar button.rbc-active {
          background-color: #8B4513;
          color: white;
          border-color: #8B4513;
        }
        .rbc-show-more {
          background-color: #8B4513;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }
      `}</style>

      {/* Custom Toolbar */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-gray-200">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-6 h-6 text-mocha-500" />
          <h2 className="text-2xl font-serif font-bold text-navy-900">
            Calendrier des rendez-vous
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <Button
              size="sm"
              variant={view === 'day' ? 'default' : 'ghost'}
              onClick={() => setView('day')}
              className={view === 'day' ? 'bg-mocha-500 hover:bg-mocha-600 text-white' : ''}
            >
              Jour
            </Button>
            <Button
              size="sm"
              variant={view === 'week' ? 'default' : 'ghost'}
              onClick={() => setView('week')}
              className={view === 'week' ? 'bg-mocha-500 hover:bg-mocha-600 text-white' : ''}
            >
              Semaine
            </Button>
            <Button
              size="sm"
              variant={view === 'month' ? 'default' : 'ghost'}
              onClick={() => setView('month')}
              className={view === 'month' ? 'bg-mocha-500 hover:bg-mocha-600 text-white' : ''}
            >
              Mois
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (view === 'day') setDate(new Date(date.setDate(date.getDate() - 1)))
                else if (view === 'week') setDate(new Date(date.setDate(date.getDate() - 7)))
                else setDate(new Date(date.setMonth(date.getMonth() - 1)))
              }}
              className="border-2 border-gray-300 hover:bg-gray-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setDate(new Date())}
              className="border-2 border-mocha-500 text-mocha-600 hover:bg-mocha-50 font-semibold"
            >
              Aujourd'hui
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (view === 'day') setDate(new Date(date.setDate(date.getDate() + 1)))
                else if (view === 'week') setDate(new Date(date.setDate(date.getDate() + 7)))
                else setDate(new Date(date.setMonth(date.getMonth() + 1)))
              }}
              className="border-2 border-gray-300 hover:bg-gray-100"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="h-[700px]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          eventPropGetter={eventStyleGetter}
          views={['month', 'week', 'day']}
          step={30}
          showMultiDayTimes
          messages={{
            today: "Aujourd'hui",
            previous: 'Précédent',
            next: 'Suivant',
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour',
            agenda: 'Agenda',
            date: 'Date',
            time: 'Heure',
            event: 'Rendez-vous',
            noEventsInRange: 'Aucun rendez-vous sur cette période',
            showMore: (total) => `+ ${total} de plus`,
          }}
          formats={{
            timeGutterFormat: 'HH:mm',
            eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
              `${localizer?.format(start, 'HH:mm', culture)} - ${localizer?.format(end, 'HH:mm', culture)}`,
            dayFormat: 'DD/MM',
            dayHeaderFormat: 'dddd DD MMMM',
            dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
              `${localizer?.format(start, 'DD MMM', culture)} - ${localizer?.format(end, 'DD MMM', culture)}`,
          }}
        />
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t-2 border-gray-200">
        <p className="text-sm font-semibold text-navy-900 mb-3">Légende :</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-mocha-500 border-2 border-mocha-700" />
            <span className="text-sm text-navy-600">Confirmé</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-navy-900 border-2 border-navy-950" />
            <span className="text-sm text-navy-600">En cours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-emerald-500 border-2 border-emerald-700" />
            <span className="text-sm text-navy-600">Terminé</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500 border-2 border-red-700" />
            <span className="text-sm text-navy-600">Annulé</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
