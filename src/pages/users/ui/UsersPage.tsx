import { useState } from 'react';
import { useStore } from '../../../shared/store/useStore';
import { usersStore } from '../../../shared/store/usersStore';
import { addToast } from '../../../shared/store/toastStore';
import type { User } from '../../../entities/user';
import { UsersActionType } from '../../../entities/user';
import { AddUserButton, ConfirmDialog, UserDialog, UserTable } from '../../../shared/ui';
import './UsersPage.css';

export function UsersPage() {
  const users = useStore(usersStore, (s) => s.list);
  const loading = useStore(usersStore, (s) => s.loading);
  const [selectedUser, setSelectedUser] = useState<Nullable<User>>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<Nullable<string>>(null);

  const pendingDeleteUser = pendingDeleteId ? (users.find((u) => u.id === pendingDeleteId) ?? null) : null;

  function handleSave(updated: User) {
    usersStore.dispatch({ type: UsersActionType.UPDATE_USER, payload: updated });
    addToast(`Updated "${updated.username}"`);
    setSelectedUser(null);
  }

  function handleDeleteRequest(id: string) {
    setPendingDeleteId(id);
  }

  function handleDeleteConfirm() {
    if (!pendingDeleteUser) return;
    const user = pendingDeleteUser;
    usersStore.dispatch({ type: UsersActionType.DELETE_USER, payload: user.id });
    addToast(`Deleted "${user.username}"`, () => {
      usersStore.dispatch({ type: UsersActionType.ADD_USER, payload: user });
    });
    setPendingDeleteId(null);
  }

  function handleReorder(from: number, to: number) {
    usersStore.dispatch({ type: UsersActionType.REORDER_USERS, payload: { from, to } });
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
          onDelete={handleDeleteRequest}
          onReorder={handleReorder}
        />
      </main>

      {selectedUser && (
        <UserDialog
          user={selectedUser}
          onSave={handleSave}
          onClose={handleDialogClose}
        />
      )}

      {pendingDeleteUser && (
        <ConfirmDialog
          message={`Delete "${pendingDeleteUser.username}"?`}
          onConfirm={handleDeleteConfirm}
          onClose={() => setPendingDeleteId(null)}
        />
      )}
    </div>
  );
}
