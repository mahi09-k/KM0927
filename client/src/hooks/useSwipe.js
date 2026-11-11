import { useRef } from 'react';

export function useSwipe(onSwipeLeft, onSwipeRight) {
  const touchStart = useRef(null);

  const onTouchStart = (e) => { touchStart.current = e.targetTouches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onSwipeLeft?.();
      else onSwipeRight?.();
    }
    touchStart.current = null;
  };

  return { onTouchStart, onTouchEnd };
}
