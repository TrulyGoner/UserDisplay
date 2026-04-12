import type { User } from '../../entities/user';

export interface UserTableProps {
  users: User[];
  loading?: boolean;
  onRowClick: (user: User) => void;
  onDelete: (id: string) => void;
}

export interface UserRowData {
  users: User[];
  onRowClick: (user: User) => void;
  onDelete: (id: string) => void;
}
