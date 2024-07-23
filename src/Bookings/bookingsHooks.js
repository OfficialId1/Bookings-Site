import {useMemo} from 'react';
import { getGrid } from "./grid-builder";
import { useSearchParams } from 'react-router-dom';
import { isDate } from '../utils/date-wrangler';
import { useMutation, useQueryClient } from 'react-query';
import { createItem, editItem, deleteItem } from '../utils/api';

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
  // const idInt = bookableId;
  // const hasId = !isNaN(idInt);
  // const hasId = idInt;

  function setBookingsDate(date){
    const params = {};

    if(bookableId) {params.bookableId = bookableId}
    if(isDate(date)) {params.date = date}

    if(params.date || params.bookableId !== undefined) {
      setSearchParams(params);
    }
  }

  return{
    date,
    bookableId: bookableId ? bookableId : undefined,
    setBookingsDate
  };
}

export function useCreateBooking (key) {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    item => createItem("http://localhost:3001/bookings", item),
    {
      onSuccess: (booking) => {
        queryClient.invalidateQueries(key);
        const bookings = queryClient.getQueryData(key) || [];
        queryClient.setQueryData(key, [...bookings, booking]);
      }
    }
  );

  return {
    createBooking: mutation.mutate,
    isCreating: mutation.isLoading
  };
}

export function useUpdateBooking (key) {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    item => editItem(`http://localhost:3001/bookings/${item.id}`, item),
    {
      onSuccess: (booking) => {
        queryClient.invalidateQueries(key);
        const bookings = queryClient.getQueryData(key) || [];
        const bookingIndex = bookings.findIndex(b => b.id === booking.id);
        bookings[bookingIndex] = booking;
        queryClient.setQueryData(key, bookings);
      }
    }
  );

  return {
    updateBooking: mutation.mutate,
    isUpdating: mutation.isLoading
  };
}

export function useDeleteBooking (key) {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    id => deleteItem(`http://localhost:3001/bookings/${id}`),
    {
      onSuccess: (resp, id) => {
        queryClient.invalidateQueries(key);
        const bookings = queryClient.getQueryData(key) || [];
        queryClient.setQueryData(key, bookings.filter(b => b.id !== id))
      }
    }
  );

  return {
    deleteBooking: mutation.mutate,
    isDeleting: mutation.isLoading
  };
}
