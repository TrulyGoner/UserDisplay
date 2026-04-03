import type { User } from '../../../entities/user';
import './UserTable.css';

interface Props {
  users: User[];
  onRowClick: (user: User) => void;
  onDelete: (id: string) => void;
}

export function UserTable({ users, onRowClick, onDelete }: Props) {
  if (users.length === 0) {
    return <p className="ut-empty">No users yet. Click «Add User» to add one.</p>;
  }

  return (
    <table className="ut-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th className="ut-th-actions" aria-label="Actions"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="ut-row"
            onClick={() => onRowClick(user)}
          >
            <td>{user.username}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td className="ut-td-actions">
              <button
                className="ut-details"
                aria-label={`View details of ${user.username}`}
                title="Click to view / edit details"
                onClick={(e) => {
                  e.stopPropagation();
                  onRowClick(user);
                }}
              >
                <img src="/info.svg" alt="info" width={23} height={23} />
              </button>
              <button
                className="ut-delete"
                aria-label={`Delete ${user.username}`}
                title="Click to delete user"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(user.id);
                }}
              >
                <img src="/delete.svg" alt="delete" width={23} height={23} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
