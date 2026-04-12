import type { User } from './types';

export interface UsersState {
  list: User[];
  loading: boolean;
}

export type UsersAction =
  | { type: 'ADD_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean };

export const usersInitialState: UsersState = {
  list: [],
  loading: false,
};

export function usersReducer(state: UsersState, action: UsersAction): UsersState {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, list: [...state.list, action.payload] };
    case 'DELETE_USER':
      return { ...state, list: state.list.filter((u) => u.id !== action.payload) };
    case 'UPDATE_USER':
      return {
        ...state,
        list: state.list.map((u) => (u.id === action.payload.id ? action.payload : u)),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
