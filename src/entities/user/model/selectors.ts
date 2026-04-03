import type { RootState } from '../../../shared/store';

export const selectUsers = (state: RootState) => state.users.list;
