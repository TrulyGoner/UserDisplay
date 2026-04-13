import type { User } from './types';

export const UsersActionType = {
  ADD_USER: 'ADD_USER',
  DELETE_USER: 'DELETE_USER',
  UPDATE_USER: 'UPDATE_USER',
  REORDER_USERS: 'REORDER_USERS',
  SET_LOADING: 'SET_LOADING',
} as const;

export interface UsersState {
  list: User[];
  loading: boolean;
}

type AT = typeof UsersActionType;

export type UsersAction =
  | { type: AT['ADD_USER']; payload: User }
  | { type: AT['DELETE_USER']; payload: string }
  | { type: AT['UPDATE_USER']; payload: User }
  | { type: AT['REORDER_USERS']; payload: { from: number; to: number } }
  | { type: AT['SET_LOADING']; payload: boolean };

export const usersInitialState: UsersState = {
  list: [],
  loading: false,
};

export function usersReducer(state: UsersState, action: UsersAction): UsersState {
  switch (action.type) {
    case UsersActionType.ADD_USER:
      return { ...state, list: [...state.list, action.payload] };
    case UsersActionType.DELETE_USER:
      return { ...state, list: state.list.filter((u) => u.id !== action.payload) };
    case UsersActionType.UPDATE_USER:
      return {
        ...state,
        list: state.list.map((u) => (u.id === action.payload.id ? action.payload : u)),
      };
    case UsersActionType.REORDER_USERS: {
      const { from, to } = action.payload;
      const list = [...state.list];
      const [moved] = list.splice(from, 1);
      list.splice(to, 0, moved);
      return { ...state, list };
    }
    case UsersActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
