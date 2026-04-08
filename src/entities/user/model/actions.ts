import type { User } from './types';
import type { UsersAction } from './usersReducer';

export const addUser = (user: User): UsersAction => ({ type: 'ADD_USER', payload: user });
export const deleteUser = (id: string): UsersAction => ({ type: 'DELETE_USER', payload: id });
export const updateUser = (user: User): UsersAction => ({ type: 'UPDATE_USER', payload: user });
