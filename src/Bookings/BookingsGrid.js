import { transformBookings } from "./grid-builder";
import { Fragment, useEffect, } from "react";
import Spinner from '../UI/Spinner';
import { useGrid } from "./bookingsHooks";
import useFetch from "../utils/useFetch";
import { shortISO } from "../utils/date-wrangler";
import { useQuery } from "react-query";

export default function BookingsGrid({week, bookable, booking, setBooking}) {
  let {data : bookings = [], status, error} = useQuery(
    "bookings",
    () => fetch('http://localhost:3001/bookings')
    .then(res => res.json())
  );

  bookings = bookings ? transformBookings(bookings) : {};

  const {grid, sessions, dates} = useGrid(bookable, week.start);

  const weekStart = shortISO(week.start);

  useEffect(() => {
    setBooking(null);
  }, [weekStart, bookable, setBooking]);
  
  function cell(session, date){
    const cellData = bookings?.[session]?.[date] || grid[session][date];
    const isSelected = booking?.session === session && booking?.date === date;

    return(
      <td
        key={date}
        className={isSelected ? 'selected' : null}
        onClick={status === 'success' ? () => setBooking(cellData) : null}
      >
        {cellData.title}
      </td>
    )
  }

  if(!grid){
    return <p>Waiting for bookable and week details...</p>
  }

  return(
    <Fragment>
      {status === 'error' && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data (${error})`}
        </p>
      )}

      <table
        className={status === 'success' ? 'bookingsGrid active' : 'bookingsGrid'}
      >
        <thead>
          <tr>
            <th>
              <span className="status"><Spinner /></span>
            </th>

            {dates.map(d => (
              <th key={d}>
                {(new Date(d).toDateString())}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sessions.map(session => (
            <tr key={session}>
              <th>{session}</th>
              {dates.map(date => cell(session, date))}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}
