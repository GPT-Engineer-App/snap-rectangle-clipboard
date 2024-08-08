import React, { useState, useRef, useCallback } from 'react';
import { useKey } from 'react-use';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ScreenshotTool = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  const selectionRef = useRef(null);
  const timeoutRef = useRef(null);

  const startSelection = (e) => {
    setIsSelecting(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setEndPos({ x: e.clientX, y: e.clientY });

    timeoutRef.current = setTimeout(() => {
      takeScreenshot();
    }, 500); // Hold for 500ms to take screenshot
  };

  const updateSelection = (e) => {
    if (isSelecting) {
      setEndPos({ x: e.clientX, y: e.clientY });
    }
  };

  const endSelection = () => {
    setIsSelecting(false);
    clearTimeout(timeoutRef.current);
  };

  const takeScreenshot = useCallback(() => {
    if (selectionRef.current) {
      const { left, top, width, height } = selectionRef.current.getBoundingClientRect();
      toPng(document.body, {
        width,
        height,
        style: {
          transform: `translate(${-left}px, ${-top}px)`,
        },
      })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'screenshot.png';
          link.href = dataUrl;
          link.click();
          toast.success('Screenshot saved!');
        })
        .catch(() => toast.error('Failed to save screenshot'));
    }
    setIsSelecting(false);
  }, []);

  useKey('Escape', () => setIsSelecting(false));

  const selectionStyle = {
    position: 'fixed',
    border: '2px dashed #00ff00',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    pointerEvents: 'none',
    zIndex: 9999,
    left: Math.min(startPos.x, endPos.x),
    top: Math.min(startPos.y, endPos.y),
    width: Math.abs(endPos.x - startPos.x),
    height: Math.abs(endPos.y - startPos.y),
  };

  return (
    <div>
      <Button onClick={() => setIsSelecting(true)}>Take Screenshot</Button>
      {isSelecting && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, cursor: 'crosshair' }}
          onMouseDown={startSelection}
          onMouseMove={updateSelection}
          onMouseUp={endSelection}
          onMouseLeave={endSelection}
        >
          <div ref={selectionRef} style={selectionStyle} />
        </div>
      )}
    </div>
  );
};

export default ScreenshotTool;
