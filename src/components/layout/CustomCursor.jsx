import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);

  useEffect(() => {
    // Disable on mobile/touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const move = (e) => {
      setIsVisible(true);
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      // Smooth interpolation for the ring
      const easing = 0.15;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * easing;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * easing;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    // Event Delegation for hover effects
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('a, button, [data-cursor-expand], input, select, textarea')) {
        setExpanded(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.closest('a, button, [data-cursor-expand], input, select, textarea')) {
        setExpanded(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div 
      className={`custom-cursor ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none', 
        zIndex: 9999,
        transition: 'opacity 0.3s ease'
      }} 
      aria-hidden="true"
    >
      <div 
        ref={dotRef} 
        className="cursor-dot" 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: '#fff',
          borderRadius: '50%',
          willChange: 'transform'
        }} 
      />
      <div 
        ref={ringRef} 
        className={`cursor-ring ${expanded ? 'expanded' : ''}`} 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0,
          width: '30px',
          height: '30px',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '50%',
          willChange: 'transform',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease'
        }} 
      />
    </div>
  );
}