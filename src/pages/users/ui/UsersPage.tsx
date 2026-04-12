import { useState } from 'react';
import { useStore } from '../../../shared/store/useStore';
import { usersStore } from '../../../shared/store/usersStore';
import { addToast } from '../../../shared/store/toastStore';
import type { User } from '../../../entities/user';
import { AddUserButton, UserDialog, UserTable } from '../../../shared/ui';
import './UsersPage.css';

export function UsersPage() {
  const users = useStore(usersStore, (s) => s.list);
  const loading = useStore(usersStore, (s) => s.loading);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function handleSave(updated: User) {
    usersStore.dispatch({ type: 'UPDATE_USER', payload: updated });
    addToast(`Updated "${updated.username}"`);
    setSelectedUser(null);
  }

  function handleDelete(id: string) {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    usersStore.dispatch({ type: 'DELETE_USER', payload: id });
    addToast(`Deleted "${user.username}"`, () => {
      usersStore.dispatch({ type: 'ADD_USER', payload: user });
    });
  }

  const handleDialogClose = () => setSelectedUser(null);

  return (
    <div className="users-page">
      <header className="users-page__header">
        <h1 className="users-page__title">User Management</h1>
        <AddUserButton />
      </header>

      <main className="users-page__main">
        <UserTable
          users={users}
          loading={loading}
          onRowClick={setSelectedUser}
          onDelete={handleDelete}
        />
      </main>

      {selectedUser && (
        <UserDialog
          user={selectedUser}
          onSave={handleSave}
          onClose={handleDialogClose}
        />
      )}
    </div>
  );
}
