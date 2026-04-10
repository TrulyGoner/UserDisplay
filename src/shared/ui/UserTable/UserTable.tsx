import { List, type RowComponentProps } from 'react-window';
import type { User } from '../../../entities/user';
import './UserTable.css';

const ROW_HEIGHT = 46;
const MAX_HEIGHT = 500;
const SKELETON_COUNT = 3;

interface Props {
  users: User[];
  loading?: boolean;
  onRowClick: (user: User) => void;
  onDelete: (id: string) => void;
}

function SkeletonRow() {
  return (
    <div className="ut-row ut-row--skeleton" style={{ height: ROW_HEIGHT }}>
      <div className="ut-cell"><span className="ut-skeleton" style={{ width: '60%' }} /></div>
      <div className="ut-cell"><span className="ut-skeleton" style={{ width: '70%' }} /></div>
      <div className="ut-cell"><span className="ut-skeleton" style={{ width: '75%' }} /></div>
      <div className="ut-cell"><span className="ut-skeleton" style={{ width: '50%' }} /></div>
      <div className="ut-cell ut-cell--actions" />
    </div>
  );
}

interface RowData {
  users: User[];
  onRowClick: (user: User) => void;
  onDelete: (id: string) => void;
}

function Row({ index, style, users, onRowClick, onDelete }: RowComponentProps<RowData>) {
  const user = users[index];
  return (
    <div
      style={style}
      className="ut-row"
      onClick={() => onRowClick(user)}
    >
      <div className="ut-cell">{user.username}</div>
      <div className="ut-cell">{user.name}</div>
      <div className="ut-cell">{user.email}</div>
      <div className="ut-cell">{user.address}</div>
      <div className="ut-cell ut-cell--actions">
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
      </div>
    </div>
  );
}

export function UserTable({ users, loading, onRowClick, onDelete }: Props) {
  if (users.length === 0 && !loading) {
    return <p className="ut-empty">No users yet. Click «Add User» to add one.</p>;
  }

  const listHeight = Math.min(users.length * ROW_HEIGHT, MAX_HEIGHT);
  const skeletonCount = users.length === 0 ? SKELETON_COUNT : 1;

  return (
    <div className="ut-container">
      <div className="ut-header-row">
        <div className="ut-th">Username</div>
        <div className="ut-th">Name</div>
        <div className="ut-th">Email</div>
        <div className="ut-th">Address</div>
        <div className="ut-th" aria-label="Actions" />
      </div>
      {users.length > 0 && (
        <div style={{ height: listHeight }}>
          <List
            rowComponent={Row}
            rowCount={users.length}
            rowHeight={ROW_HEIGHT}
            rowProps={{ users, onRowClick, onDelete }}
            defaultHeight={listHeight}
            style={{ overflow: listHeight < MAX_HEIGHT ? 'hidden' : 'auto' }}
          />
        </div>
      )}
      {loading && Array.from({ length: skeletonCount }, (_, i) => <SkeletonRow key={i} />)}
    </div>
  );
}
