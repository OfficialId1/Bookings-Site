import { useQuery } from 'react-query';
import Spinner from '../UI/Spinner';

export default function UsersList({user, setUser}) {
  const {data : users = [], status} = useQuery(
    'users',
    () => fetch('http://localhost:3001/users')
    .then(res => res.json())
  );

  if (status === "loading") {
    return <p><Spinner/> Loadind users ...</p>
  }

  if (status === "error") {
    return <span>Error!</span>
  }

  return (
    <ul className='users items-list-nav'>
      {users.map(userInArray => (
        <li 
          key={userInArray.id}  
          className={userInArray.id === user?.id ? 'selected' : null}
        >
          <button 
            className="btn"
            onClick={() => setUser(userInArray)}
          >{userInArray.name}</button>
        </li>
      ))}
    </ul>
  )
}

