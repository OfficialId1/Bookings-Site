import { useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../static.json';
import { FaEdit } from 'react-icons/fa';

export default function BookableDetails({bookable}) {
  const [showDetails, setShowDetails] = useState(true);
  const {sessions, days} = data;

  function toggleDetails(){
    setShowDetails(!showDetails);
  }

  return (
    <div>
      {bookable && 
        <div className='bookable-details item'>
            <div className="item-header">
              <h2>{bookable.title}</h2>

              <span className="controls">
                <label>
                  <input 
                    type="checkbox" 
                    checked={showDetails}
                    onChange={toggleDetails}
                  />
                  Show Details
                </label>

                <Link
                  to={`/bookables/${bookable.id}/edit`}
                  replace={true}
                  className="btn btn-header"
                >
                  <FaEdit/>
                  <span>Edit</span>
                </Link>
              </span>
            </div>

            <p>{bookable.notes}</p>

            {showDetails && 
              <div className='item-details'>
                <h3>Availability</h3>

                <div className='bookable-availability'>
                  <ul>
                    {bookable.days?.sort().map(day =>(
                      <li key={day}>{days[day]}</li>
                    ))} 
                  </ul>

                  <ul>
                    {bookable.sessions?.map(session =>(
                      <li key={session}>{sessions[session]}</li>
                    ))} 
                  </ul>
                </div>
              </div>
            }
        </div>
      }
    </div>
  )
}
