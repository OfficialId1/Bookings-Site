import data from '../static.json';
import { addDays, shortISO } from '../utils/date-wrangler';

const {sessions : sessionNames} = data;

export function getGrid(bookable, startDate) {
  const sessions = bookable.sessions.map(i => sessionNames[i]);
  const dates = bookable.days.map(d => shortISO(addDays(startDate, d)));

  const grid = {};

  sessions.map(session => {
    grid[session] = {};

    dates.map(date => grid[session][date] = {
        session,
        date,
        bookableId : bookable.id,
        title : ''
    })
  })
  
  return { grid, dates, sessions }
}

export function transformBookings(bookingsArray){
  const bookings = {};

  bookingsArray.map(booking => {
    const {session, date} = booking;

    if(!bookings[session]){
      bookings[session] = {};
    }

    bookings[session][date] = booking;
  })
  
  return bookings;
}


// Alernate Testing code

// export function transformBookings(bookingsArray){
//   return bookingsArray.reduce((bookings, booking) => {
//     const {session, date} = booking;
//     if(!bookings[session]){
//       bookings[session] = {};
//     }
//     bookings[session][date] = booking;
//     console.log('bookings', bookings);
//     return bookings;
//   }, {})
// }