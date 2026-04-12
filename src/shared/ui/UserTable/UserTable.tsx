import { List, type RowComponentProps } from 'react-window';
import type { User } from '../../../entities/user';
import { ICON_SIZE, MAX_HEIGHT, ROW_HEIGHT, SKELETON_COUNT, SKELETON_KEYS } from '../../constants';
import './UserTable.css';

interface Props {
  users: User[];
  loading?: boolean;
  onRowClick: (user: User) => void;
  onDelete: (id: string) => void;
}

function SkeletonRow() {
  return (
    <div className="ut-row ut-row--skeleton">
      <div className="ut-cell"><span className="ut-skeleton" /></div>
      <div className="ut-cell"><span className="ut-skeleton" /></div>
      <div className="ut-cell"><span className="ut-skeleton" /></div>
      <div className="ut-cell"><span className="ut-skeleton" /></div>
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

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(user.id);
  };

  const handleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRowClick(user);
  };

  return (
    <div
      style={style}
      className="ut-row"
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
          onClick={handleDetails}
        >
          <img src="/info.svg" alt="info" width={ICON_SIZE} height={ICON_SIZE} />
        </button>
        <button
          className="ut-delete"
          aria-label={`Delete ${user.username}`}
          title="Click to delete user"
          onClick={handleDelete}
        >
          <img src="/delete.svg" alt="delete" width={ICON_SIZE} height={ICON_SIZE} />
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
  const listContainerStyle = { height: listHeight } as const;
  const listStyle = { overflow: listHeight < MAX_HEIGHT ? 'hidden' : 'auto' } as const;
  const rowProps = { users, onRowClick, onDelete };

  return (
    <div className="ut-container">
      <div className="ut-header-row">
        <div className="ut-th">Username</div>
        <div className="ut-th">Name</div>
        <div className="ut-th">Email</div>
        <div className="ut-th">Address</div>
        <div className="ut-th" aria-label="Actions" />
      </div>
      {!!users.length && (
        <div style={listContainerStyle}>
          <List
            rowComponent={Row}
            rowCount={users.length}
            rowHeight={ROW_HEIGHT}
            rowProps={rowProps}
            defaultHeight={listHeight}
            style={listStyle}
          />
        </div>
      )}
      {loading && SKELETON_KEYS.slice(0, skeletonCount).map(key => <SkeletonRow key={key} />)}
    </div>
  );
}
