import { useStore } from '../../store/useStore';
import { usersStore } from '../../store/usersStore';
import { addToast } from '../../store/toastStore';
import { fetchRandomUser } from '../../../entities/user/api/randomUserApi';
import './AddUserButton.css';

export function AddUserButton() {
  const loading = useStore(usersStore, (s) => s.loading);

  async function handleClick() {
    usersStore.dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const user = await fetchRandomUser();
      usersStore.dispatch({ type: 'ADD_USER', payload: user });
      addToast(`Added "${user.username}"`);
    } catch {
      addToast('Failed to fetch user');
    } finally {
      usersStore.dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  return (
    <button className="add-user-btn" onClick={handleClick} disabled={loading}>
      {loading ? 'Loading…' : 'Add User'}
    </button>
  );
}
