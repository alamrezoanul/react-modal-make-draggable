import React, { useRef, useEffect, ReactElement } from 'react';

interface DraggableWrapperProps {
  children: ReactElement;
}

export const DraggableWrapper = ({ children }: DraggableWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 100 });
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    wrapper.style.position = 'fixed';
    wrapper.style.left = '50%';
    wrapper.style.top = '100px';
    wrapper.style.transform = 'translate(-50%, 0)';
    wrapper.style.cursor = 'grab';
    wrapper.style.zIndex = '1001';

    const handleMouseDown = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();

      // Remove transform on click to prevent re-jump
      if (wrapper.style.transform === 'translate(-50%, 0)') {
        wrapper.style.transform = 'none';
        wrapper.style.left = `${rect.left}px`;
        wrapper.style.top = `${rect.top}px`;
      }

      isDragging.current = true;
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      wrapper.style.cursor = 'grabbing';

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };


    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      position.current = {
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      };
      wrapper.style.left = `${position.current.x}px`;
      wrapper.style.top = `${position.current.y}px`;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      wrapper.style.cursor = 'grab';
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
