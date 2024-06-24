import {useMemo} from 'react';
import { getGrid, transformBookings } from "./grid-builder";
import useFetch from '../utils/useFetch';
import { useSearchParams } from 'react-router-dom';
import { isDate } from '../utils/date-wrangler';
import { useQuery } from 'react-query';

// export function useBookings(){
//   const query = useQuery("bookings",
//   () => fetch('http://localhost:3001/bookings')
//   .then(res => res.json())
//   );

//   return { bookings: query.data ? transformBookings(query.data) : {}, ...query };
// }

export function useGrid(bookable, startDate) {
  return useMemo(
    () => bookable ? getGrid(bookable, startDate) : {}, 
    [bookable, startDate]
  );
}

export function useBookingsParams(){
  const [searchParams, setSearchParams] = useSearchParams();
  const searchDate = searchParams.get('date');
  const bookableId = searchParams.get('bookableId');

  const date = isDate(searchDate)
    ? new Date(searchDate)
    : new Date();

  // const idInt = parseInt(bookableId, 10);
  const idInt = bookableId;
  // const hasId = !isNaN(idInt);
  const hasId = idInt;

  function setBookingsDate(date){
    const params = {};

    if(hasId) {params.bookableId = bookableId}
    if(isDate(date)) {params.date = date}

    if(params.date || params.bookableId !== undefined) {
      setSearchParams(params);
    }
  }

  return{
    date,
    bookableId: hasId ? idInt : undefined,
    setBookingsDate
  };
}
