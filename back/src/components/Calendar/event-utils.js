
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
    {
        id: createEventId(),
        title: 'Maraude',
        start: '2024-04-03 18:00:00',
        end: '2024-04-03 20:00:00',
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00'
    }
]

export function createEventId() {
    return String(eventGuid++)
}