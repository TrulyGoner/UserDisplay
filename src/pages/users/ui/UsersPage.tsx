import { useState } from 'react';
import { useStore } from '../../../shared/store/useStore';
import { usersStore } from '../../../shared/store/usersStore';
import type { User } from '../../../entities/user';
import { AddUserButton, UserDialog, UserTable } from '../../../shared/ui';
import './UsersPage.css';

export function UsersPage() {
  const users = useStore(usersStore, (s) => s.list);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function handleSave(updated: User) {
    usersStore.dispatch({ type: 'UPDATE_USER', payload: updated });
    setSelectedUser(null);
  }

  return (
    <div className="users-page">
      <header className="users-page__header">
        <h1 className="users-page__title">User Management</h1>
        <AddUserButton />
      </header>

      <main className="users-page__main">
        <UserTable
          users={users}
          onRowClick={setSelectedUser}
          onDelete={(id: string) => usersStore.dispatch({ type: 'DELETE_USER', payload: id })}
        />
      </main>

      {selectedUser && (
        <UserDialog
          user={selectedUser}
          onSave={handleSave}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
