import { createStore } from './createStore';

export interface ToastItem {
  id: string;
  message: string;
  onUndo?: () => void;
}

interface ToastState {
  items: ToastItem[];
}

type ToastAction =
  | { type: 'ADD_TOAST'; payload: ToastItem }
  | { type: 'REMOVE_TOAST'; payload: string };

const toastTimers = new Map<string, ReturnType<typeof setTimeout>>();

function addToastItem(state: ToastState, payload: ToastItem): ToastState {
  return { items: [...state.items, payload] };
}

function removeToastItem(state: ToastState, id: string): ToastState {
  return { items: state.items.filter((t) => t.id !== id) };
}

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD_TOAST':
      return addToastItem(state, action.payload);
    case 'REMOVE_TOAST':
      return removeToastItem(state, action.payload);
    default:
      return state;
  }
}

export const toastStore = createStore(toastReducer, { items: [] });

export function addToast(message: string, onUndo?: () => void): string {
  const id = crypto.randomUUID();
  toastStore.dispatch({ type: 'ADD_TOAST', payload: { id, message, onUndo } });
  const timer = setTimeout(() => {
    dismissToast(id);
  }, 5000);
  toastTimers.set(id, timer);
  return id;
}

export function dismissToast(id: string): void {
  const timer = toastTimers.get(id);
  if (timer !== undefined) {
    clearTimeout(timer);
    toastTimers.delete(id);
  }
  toastStore.dispatch({ type: 'REMOVE_TOAST', payload: id });
}

export function clearAllToasts(): void {
  toastTimers.forEach((timer) => clearTimeout(timer));
  toastTimers.clear();
  const { items } = toastStore.getState();
  items.forEach((t) => toastStore.dispatch({ type: 'REMOVE_TOAST', payload: t.id }));
}
