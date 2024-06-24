import { useState } from 'react';
import BookingDetails from './BookingDetails';
import WeekPicker from './WeekPicker';
import { getWeek } from '../utils/date-wrangler';
import BookingsGrid from './BookingsGrid';
import { useBookingsParams } from './bookingsHooks';
 
export default function Bookings({bookable}) {
  const [booking, setBooking] = useState(null);

  const {date} = useBookingsParams();
  const week = getWeek(date);

  return (
    <div className='bookings'>
      <div>
        <WeekPicker />
        
        <BookingsGrid 
          week={week} 
          bookable={bookable} 
          booking={booking} 
          setBooking={setBooking}
        />
      </div>

      <BookingDetails booking={booking} bookable={bookable} />
    </div>
  ) 
}
