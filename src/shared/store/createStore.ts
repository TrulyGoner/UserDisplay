type Listener = () => void;

export interface Action {
  type: string;
  payload?: unknown;
}

export type Reducer<S, A extends Action = Action> = (state: S, action: A) => S;

export interface Store<S, A extends Action = Action> {
  getState: () => S;
  dispatch: (action: A) => void;
  subscribe: (listener: Listener) => () => void;
}

export function createStore<S, A extends Action = Action>(
  reducer: Reducer<S, A>,
  initialState: S,
): Store<S, A> {
  let state = initialState;
  const listeners = new Set<Listener>();

  function getState(): S {
    return state;
  }

  function dispatch(action: A): void {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  return { getState, dispatch, subscribe };
}
