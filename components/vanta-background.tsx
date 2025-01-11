'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    VANTA: any;
  }
}

export function VantaBackground() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current && typeof window !== 'undefined' && window.VANTA) {
      setVantaEffect(
        window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x99ccff,
          backgroundColor: 0x000000,
          backgroundAlpha: 0,
          points: 10,
          maxDistance: 22,
          spacing: 19,
          showDots: true,
          mouseEase: true,
          mouseFactor: 0.4,
          mouseSpeed: 1.5,
          speed: 1.5
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="absolute inset-0 -z-10" style={{ height: '100vh', width: '100vw' }} />
  );
} 