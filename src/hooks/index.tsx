import React from 'react';

interface State<T> {
  status: 'init' | 'fetching' | 'error' | 'fetched'
  data?: T
  error?: string
};

type Action<T> =
  | { type: 'request' }
  | { type: 'success'; payload: T }
  | { type: 'failure'; payload: string };

export function useFetch<T = unknown>(request: RequestInfo, init?: RequestInit): State<T> {
  const cancelRequest = React.useRef<boolean>(false);
  const initialState: State<T> = {
    status: 'init',
    error: undefined,
    data: undefined,
  };

  const fetchReducer = (state: State<T>, action: Action<T>) : State<T> => {
    switch (action.type) {
      case 'request':
        return { ...initialState, status: 'fetching' }
      case 'success':
        return { ...initialState, status: 'fetched', data: action.payload }
      case 'failure':
        return { ...initialState, status: 'error', error: action.payload }
      default:
        return state
    }
  };

  const [state, dispatch] = React.useReducer(fetchReducer, initialState);

  React.useEffect(() => {
    (async () => {
      // dispatch({ type: 'request' });
      try {
        const response = await fetch(request, {
          ...init,
        });
        const respJson = await response.json();
        if (cancelRequest.current) {
          return;
        }
        dispatch({ type: 'success', payload: respJson });
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }
        if (cancelRequest.current) {
          return;
        }
        dispatch({ type: 'failure', payload: error.message });
      }
    })();
    return () => {
      cancelRequest.current = true;
    };
  }, [init, request]);

  return state;
}
