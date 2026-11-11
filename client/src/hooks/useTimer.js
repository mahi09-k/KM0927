import { useState, useEffect, useRef } from 'react';

export function useTimer(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, seconds]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => { setIsRunning(false); setSeconds(initialSeconds); };

  const format = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return { seconds, isRunning, start, pause, reset, formatted: format(seconds) };
}
