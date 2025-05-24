import React, { useRef, useEffect, ReactElement } from 'react';

interface DraggableWrapperProps {
  children: ReactElement;
}

export const DraggableWrapper = ({ children }: DraggableWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Initial position: center
    wrapper.style.position = 'fixed';
    wrapper.style.left = '50%';
    wrapper.style.top = '100px';
    wrapper.style.transform = 'translate(-50%, 0)';
    wrapper.style.cursor = 'grab';
    wrapper.style.zIndex = '1001';

    const handleMouseDown = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();

      // On first click: commit to pixel position and drop transform
      if (!initialized.current) {
        wrapper.style.transform = 'none';
        wrapper.style.left = `${rect.left}px`;
        wrapper.style.top = `${rect.top}px`;
        initialized.current = true;
      }

      // Recalculate after transform removal
      const actualRect = wrapper.getBoundingClientRect();
      offset.current = {
        x: e.clientX - actualRect.left,
        y: e.clientY - actualRect.top,
      };

      isDragging.current = true;
      wrapper.style.cursor = 'grabbing';

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const newX = e.clientX - offset.current.x;
      const newY = e.clientY - offset.current.y;

      wrapper.style.left = `${newX}px`;
      wrapper.style.top = `${newY}px`;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      if (wrapper) wrapper.style.cursor = 'grab';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    wrapper.addEventListener('mousedown', handleMouseDown);

    return () => {
      wrapper.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
};
