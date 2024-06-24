import {FaArrowRight} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function BookablesList({bookable, bookables, getUrl}) {
  const navigate = useNavigate();

  const group = bookable?.group;
  const bookablesInGroup = bookables.filter(b => b.group === group);
  const groups = [...new Set(bookables.map(b => b.group))];

  function nextBookable(){
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    navigate(getUrl(nextBookable.id));
  }

  function changeGroup(e){
    const bookablesInSelectedGroup = bookables.filter(b => b.group === e.target.value);
    navigate(getUrl(bookablesInSelectedGroup[0].id));
  }
  
  return (
      <div>
        <select value={group} onChange={changeGroup}>
          {groups.map(group => <option key={group}>{group}</option>)}
        </select>

        <ul className='bookables items-list-nav'>
          {bookablesInGroup.map(bookableInGroup => (
            <li 
              key={bookableInGroup.id}  
              className={bookableInGroup.id === bookable.id ? 'selected' : null}
            >
              <Link
                to={getUrl(bookableInGroup.id)}
                className='btn'
                replace={true}
              >
                {bookableInGroup.title}
              </Link>
            </li>
          ))}
        </ul>

        <p>
          <button 
            className='btn' 
            onClick={nextBookable} 
            autoFocus
          >
            <FaArrowRight /><span>Next</span>
          </button>
        </p>
      </div>
  );
}