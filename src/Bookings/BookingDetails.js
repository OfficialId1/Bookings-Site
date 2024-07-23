import {FaEdit} from "react-icons/fa";
import Booking from "./Booking";
import { useUser } from "../Users/UserContext";
import BookingForm from "./BookingForm";
import { useCreateBooking, useUpdateBooking, useDeleteBooking } from "./bookingsHooks";
import { useEffect, useState } from "react";

export default function BookingDetails({booking, bookable}) {
  const [isEditing, setIsEditing] = useState(false);

  const [user] = useUser();
  const isBooker = booking && user && (booking.bookerId === user.id);

  const {createBooking, isCreating} = useCreateBooking(["bookings"]);
  const {updateBooking, isUpdating} = useUpdateBooking(["bookings"]);
  const {deleteBooking, isDeleting} = useDeleteBooking(["bookings"]);

  useEffect(() => {
    setIsEditing(booking && booking.id === undefined);
  },[booking])

  function handleSave(item){
    setIsEditing(false);

    if(item.id === undefined){
      createBooking({...item, bookerId : user.id});
      console.log('edit', isEditing);
    } else {
      updateBooking(item);
    }
  }

  function handleDelete(item){
    if(window.confirm("Are you sure you want to delete this booking?")){
      setIsEditing(false);
      deleteBooking(item.id);
    }
  }
  
  return (
    <div className='booking-details'>
      <h2>
        Booking Details
        {isBooker && (
          <span className="controls">
            <button 
              className="btn"
              onClick={() => setIsEditing(!isEditing)}
            ><FaEdit/></button>
          </span>
        )}
      </h2>

      {
        isCreating || isUpdating || isDeleting ? (
          <div className="booking-details-field">
            <p>Saving...</p>
          </div> 
        ) : isEditing ? (
          <BookingForm 
            booking={booking}
            bookable={bookable}
            onSave={handleSave}
            onDelete={handleDelete}
          /> 
        ) : booking ? (
          <Booking 
            booking={booking}
            bookable={bookable}
          /> 
        ) :(
          <div className="booking-details-field">
            <p>Select a booking or a booking slot.</p>
          </div>
        )
      }
    </div>
  )
}
