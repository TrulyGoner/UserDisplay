import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import { deleteUser, updateUser, selectUsers } from '../../../entities/user';
import type { User } from '../../../entities/user';
import { AddUserButton, UserDialog, UserTable } from '../../../shared/ui';
import './UsersPage.css';

export function UsersPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function handleSave(updated: User) {
    dispatch(updateUser(updated));
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
          onDelete={(id: string) => dispatch(deleteUser(id))}
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
