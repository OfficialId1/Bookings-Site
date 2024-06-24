import { shortISO } from '../utils/date-wrangler';
import BookablesList from '../Bookables/BookablesList';
import Bookings from './Bookings';
import Spinner from '../UI/Spinner';
import { useBookingsParams } from './bookingsHooks';
import { useQuery } from 'react-query';

export default function BookingsPage() {
  const {data : bookables = [], status, error} = useQuery(
    "bookables",
    () => fetch("http://localhost:3001/bookables")
    .then(res => res.json())
  );

  const {date, bookableId} = useBookingsParams();

  const bookable = bookables.find(
    b => b.id == bookableId
  ) || bookables[0];

  function getUrl(id){
    const root = `/bookings?bookableId=${id}`;
    return date ? `${root}&date=${shortISO(date)}` : root;
  }

  if(status === 'error'){
    return <p>{error.message}</p>
  }

  if(status === 'loading'){
    return <p><Spinner />Loading bookables...</p>
  }

  return (
    <main className="bookings-page">
      <BookablesList 
        bookable={bookable}
        bookables={bookables}
        getUrl={getUrl}
      />

      <Bookings bookable={bookable}/>
    </main>
  )
}
 