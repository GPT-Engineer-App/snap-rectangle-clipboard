import React, { useState, useRef, useCallback } from 'react';
import { useKey } from 'react-use';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Clipboard } from 'lucide-react';

const ScreenshotTool = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  const selectionRef = useRef(null);

  const startSelection = (e) => {
    setIsDrawing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setEndPos({ x: e.clientX, y: e.clientY });
  };

  const updateSelection = (e) => {
    if (isDrawing) {
      setEndPos({ x: e.clientX, y: e.clientY });
    }
  };

  const endSelection = () => {
    if (isDrawing) {
      setIsDrawing(false);
      takeScreenshot();
    }
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
          // Convert data URL to Blob
          fetch(dataUrl)
            .then(res => res.blob())
            .then(blob => {
              // Create a new ClipboardItem
              const item = new ClipboardItem({ "image/png": blob });
              // Write the ClipboardItem to the clipboard
              navigator.clipboard.write([item]).then(() => {
                toast.success('Screenshot copied to clipboard!');
              }).catch(() => {
                toast.error('Failed to copy screenshot to clipboard');
              });
            });
        })
        .catch(() => toast.error('Failed to capture screenshot'));
    }
    setIsActive(false);
  }, []);

  useKey('Escape', () => {
    setIsActive(false);
    setIsDrawing(false);
  });

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
      <Button onClick={() => setIsActive(true)}>
        <Clipboard className="mr-2 h-4 w-4" />
        Take Screenshot
      </Button>
      {isActive && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, cursor: 'crosshair' }}
          onMouseDown={startSelection}
          onMouseMove={updateSelection}
          onMouseUp={endSelection}
          onMouseLeave={endSelection}
        >
          {isDrawing && <div ref={selectionRef} style={selectionStyle} />}
        </div>
      )}
    </div>
  );
};

export default ScreenshotTool;
