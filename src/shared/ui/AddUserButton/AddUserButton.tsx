import { useState } from 'react';
import { usersStore } from '../../store/usersStore';
import { fetchRandomUser } from '../../../entities/user/api/randomUserApi';
import './AddUserButton.css';

export function AddUserButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const user = await fetchRandomUser();
      usersStore.dispatch({ type: 'ADD_USER', payload: user });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="add-user-btn" onClick={handleClick} disabled={loading}>
      {loading ? 'Loading…' : 'Add User'}
    </button>
  );
}
