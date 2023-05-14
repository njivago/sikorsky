import {useState, useCallback, useRef, useEffect} from 'react';

type UpdateState<T> = (newState: (prev: T) => T, callback?: (...args: unknown[]) => unknown) => void;

type ReturnType<T> = Array<T | UpdateState<T>>;

const useStateWithCallback = <T>(initialState: T): ReturnType<T> => {
  const [state, setState] = useState(initialState);
  const callbackRef = useRef(null);

  const updateState = useCallback((newState: (prev: T) => T, callback: (...args: unknown[]) => unknown) => {
    callbackRef.current = callback;

    setState((prev: T) => typeof newState === 'function' ? newState(prev) : newState);
  }, []);

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);

  return [state, updateState];
}

export default useStateWithCallback;