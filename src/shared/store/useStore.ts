import { useEffect, useRef, useState } from 'react';
import type { Store, Action } from './createStore';

export function useStore<S, A extends Action, T>(
  store: Store<S, A>,
  selector: (state: S) => T,
): T {
  const [value, setValue] = useState<T>(() => selector(store.getState()));
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  useEffect(() => {
    return store.subscribe(() => {
      setValue(selectorRef.current(store.getState()));
    });
  }, [store]);

  return value;
}
