import type { User } from '../../entities/user';

export interface UserTableProps {
  users: User[];
  loading?: boolean;
  onRowClick: (user: User) => void;
  onDelete: (id: string) => void;
  onReorder: (from: number, to: number) => void;
}

export interface UserRowData {
  users: User[];
  onRowClick: (user: User) => void;
  onDelete: (id: string) => void;
  dragIndex: Nullable<number>;
  overIndex: Nullable<number>;
  onDragStart: (index: number) => void;
  onDragOver: (index: number) => void;
  onDrop: (index: number) => void;
  onDragEnd: () => void;
}
