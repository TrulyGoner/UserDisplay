import { memo, useState } from 'react';
import { List, type RowComponentProps } from 'react-window';
import { ICON_SIZE, MAX_HEIGHT, ROW_HEIGHT, SKELETON_COUNT, SKELETON_KEYS } from '../../constants';
import type { UserTableProps, UserRowData } from '../../types';
import { SkeletonRow } from '../Skeleton';
import './UserTable.css';

function RowComponent({ index, style, users, onRowClick, onDelete, dragIndex, overIndex, onDragStart, onDragOver, onDrop, onDragEnd }: RowComponentProps<UserRowData>) {
  const user = users[index];
  const isDragging = dragIndex === index;
  const isOver = overIndex === index && dragIndex !== index;

  const handleDelete = () => {
    onDelete(user.id);
  };

  const handleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRowClick(user);
  };

  return (
    <div
      style={style}
      className={`ut-row${isDragging ? ' ut-row--dragging' : ''}${isOver ? ' ut-row--drag-over' : ''}`}
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => { e.preventDefault(); onDragOver(index); }}
      onDrop={() => onDrop(index)}
      onDragEnd={onDragEnd}
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

const Row = memo(RowComponent) as typeof RowComponent;

export function UserTable({ users, loading, onRowClick, onDelete, onReorder }: UserTableProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  function handleDragStart(index: number) { setDragIndex(index); }
  function handleDragOver(index: number) { setOverIndex(index); }
  function handleDrop(index: number) {
    if (dragIndex !== null && dragIndex !== index) {
      onReorder(dragIndex, index);
    }
    setDragIndex(null);
    setOverIndex(null);
  }
  function handleDragEnd() { setDragIndex(null); setOverIndex(null); }

  if (users.length === 0 && !loading) {
    return <p className="ut-empty">No users yet. Click «Add User» to add one.</p>;
  }

  const listHeight = Math.min(users.length * ROW_HEIGHT, MAX_HEIGHT);
  const skeletonCount = users.length === 0 ? SKELETON_COUNT : 1;
  const listContainerStyle = { height: listHeight } as const;
  const listStyle = { overflow: listHeight < MAX_HEIGHT ? 'hidden' : 'auto' } as const;
  const rowProps = { users, onRowClick, onDelete, dragIndex, overIndex, onDragStart: handleDragStart, onDragOver: handleDragOver, onDrop: handleDrop, onDragEnd: handleDragEnd };

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
