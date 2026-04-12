import { createStore } from './createStore';
import { addToast } from './toastStore';
import { usersReducer, usersInitialState } from '../../entities/user/model/usersReducer';
import type { User } from '../../entities/user';
import { STORAGE_KEY } from '../constants';

function loadFromStorage(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(users: User[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch {
    addToast('Failed to save users to storage');
  }
}

const persisted = loadFromStorage();

export const usersStore = createStore(
  usersReducer,
  persisted.length > 0 ? { ...usersInitialState, list: persisted } : usersInitialState,
);

usersStore.subscribe(() => {
  saveToStorage(usersStore.getState().list);
});

