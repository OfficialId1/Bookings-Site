import { useEffect, useState } from 'react';
import Spinner from '../UI/Spinner';
import { useUser} from './UserContext';
import { useQuery } from 'react-query';

export default function UserPicker() {
  const [user, setUser] = useUser();

  const {data : users = [], status} = useQuery(
    'users',
    () => fetch('http://localhost:3001/users')
    .then(res => res.json())
  );

  useEffect(() => {
    setUser(users[0]);
  }, [users, setUser]);

  function handleSelect(e){
    const selectId = e.target.value;
    const selectedUser = users.find(u => u.id === selectId);

    setUser(selectedUser);
  }

  if (status === "loading") {
    return <Spinner/>
  }

  if (status === "error") {
    return <span>Error!</span>
  }

  return (
    <select
      className='user-picker'
      onChange={handleSelect}
      value={user?.id}
    >
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
    </select>
  )
}
