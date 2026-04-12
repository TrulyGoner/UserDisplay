import { createStore } from './createStore';

export interface ToastItem {
  id: string;
  message: string;
  onUndo?: () => void;
}

interface ToastState {
  items: ToastItem[];
}

const ToastActionTypes = {
  ADD: 'ADD_TOAST',
  REMOVE: 'REMOVE_TOAST',
} as const;

type ToastAction =
  | { type: typeof ToastActionTypes.ADD; payload: ToastItem }
  | { type: typeof ToastActionTypes.REMOVE; payload: string };

const toastTimers = new Map<string, ReturnType<typeof setTimeout>>();

function addToastItem(state: ToastState, payload: ToastItem): ToastState {
  return { items: [...state.items, payload] };
}

function removeToastItem(state: ToastState, id: string): ToastState {
  return { items: state.items.filter((t) => t.id !== id) };
}

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case ToastActionTypes.ADD:
      return addToastItem(state, action.payload);
    case ToastActionTypes.REMOVE:
      return removeToastItem(state, action.payload);
    default:
      return state;
  }
}

export const toastStore = createStore(toastReducer, { items: [] });

export function addToast(message: string, onUndo?: () => void): string {
  const id = crypto.randomUUID();
  toastStore.dispatch({ type: ToastActionTypes.ADD, payload: { id, message, onUndo } });
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
  toastStore.dispatch({ type: ToastActionTypes.REMOVE, payload: id });
}

export function clearAllToasts(): void {
  toastTimers.forEach((timer) => clearTimeout(timer));
  toastTimers.clear();
  const { items } = toastStore.getState();
  items.forEach((t) => toastStore.dispatch({ type: ToastActionTypes.REMOVE, payload: t.id }));
}
