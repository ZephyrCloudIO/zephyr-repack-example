import { useEffect, useRef } from 'react';

/**
 * A custom hook that implements setInterval with React Hooks API.
 * @param callback The function to call on interval
 * @param delay The delay in milliseconds. If null, the interval is cleared
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    
    return undefined;
  }, [delay]);
}