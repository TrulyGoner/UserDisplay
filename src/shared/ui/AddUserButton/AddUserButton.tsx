import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addUser, fetchRandomUser } from '../../../entities/user';
import './AddUserButton.css';

export function AddUserButton() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const user = await fetchRandomUser();
      dispatch(addUser(user));
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="add-user-btn" onClick={handleClick} disabled={loading}>
      {loading ? 'Loading…' : <><img src="/add.svg" className="add-user-btn__icon" alt="" width={19} height={19} />Add User</>}
    </button>
  );
}
