import type { User } from './types';
import type { UsersAction } from './usersReducer';
import { UsersActionType } from './usersReducer';

export const addUser = (user: User): UsersAction => ({ type: UsersActionType.ADD_USER, payload: user });
export const deleteUser = (id: string): UsersAction => ({ type: UsersActionType.DELETE_USER, payload: id });
export const updateUser = (user: User): UsersAction => ({ type: UsersActionType.UPDATE_USER, payload: user });
