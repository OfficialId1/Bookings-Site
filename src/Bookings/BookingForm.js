import React from 'react';
import { Fragment } from 'react';
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';
import useFormState from '../Bookables/useFormState';

export default function BookingForm({booking, bookable, onSave, onDelete}) {
    const date = booking?.date;
    const {state, handleChange} = useFormState(booking);
    const {title} = state;
    const isNew = booking?.id === undefined;
    
  return booking ? (
    <Fragment>
        <div className="booking-details-fields item-form">
            <label>Title</label>

            <p>
                <input 
                    type="text" 
                    name='title'
                    value={title}
                    onChange={handleChange}
                    size={15}
                />
            </p>

            <label>Bookable</label>
            <p>{bookable.title}</p>

            <label>Booking Date</label>
            <p>{(new Date(date).toLocaleDateString())}</p>

            <label>Session</label>
            <p>{booking.session}</p>

            <label>Notes</label>
            <p>
                <textarea 
                    name="notes" 
                    rows={3}
                    cols={30}
                    value={booking.notes}
                    onChange={handleChange}
                ></textarea>
            </p>
        </div>

        <p className="controls">
            {!isNew && (
                <button 
                    onClick={() => onDelete(booking)}
                    className='btn btn-delete'
                >
                    <FaTrash />
                    <span>Delete</span>
                </button>
            )}

            <button 
                onClick={() => onSave(state)}
                className='btn'
            >
                <FaCloudUploadAlt />
                <span>{isNew ? "Add Booking" : "Update"}</span>
            </button>
        </p>
    </Fragment>
  ) : null;
}
