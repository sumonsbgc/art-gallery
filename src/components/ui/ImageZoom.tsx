import React, { memo, useRef, useState, useEffect } from 'react';
import { Icon } from '@/components/ui';

interface ImageZoomProps {
  image: string;
  title: string;
}

const ImageZoom = (props: ImageZoomProps) => {
  const { image, title } = props;

  const imageRef = useRef(null);
  const [zoom, setZoom] = useState(100);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const zoomIn = () => {
    setZoom(zoom + 10);
    setPosition({
      x: 0,
      y: 0
    });
  };

  const zoomOut = () => {
    if (zoom > 100) {
      setZoom(zoom - 10);
      setPosition({
        x: 0,
        y: 0
      });
    }
  };

  useEffect(() => {
    const image = imageRef.current;
    let isDragging = false;
    let prevPosition = { x: 0, y: 0 };

    // Mouse down event handler for starting image drag
    const handleMouseDown = (e: { clientX: any; clientY: any }) => {
      isDragging = true;
      prevPosition = { x: e.clientX, y: e.clientY };
    };

    // Mouse move event handler for dragging the image
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPosition.x;
      const deltaY = e.clientY - prevPosition.y;
      prevPosition = { x: e.clientX, y: e.clientY };
      if (zoom > 100) {
        setPosition((position) => ({
          x: position.x + deltaX,
          y: position.y + deltaY
        }));
      }
    };

    // Mouse up event handler for ending image drag
    const handleMouseUp = () => {
      isDragging = false;
    };

    // Add event listeners
    //@ts-ignore
    image?.addEventListener('mousedown', handleMouseDown);
    //@ts-ignore
    image?.addEventListener('mousemove', handleMouseMove);
    //@ts-ignore
    image?.addEventListener('mouseup', handleMouseUp);

    // Remove event listeners on component unmount
    return () => {
      //@ts-ignore
      image?.removeEventListener('mousedown', handleMouseDown);
      //@ts-ignore
      image?.removeEventListener('mousemove', handleMouseMove);
      //@ts-ignore
      image?.removeEventListener('mouseup', handleMouseUp);
    };
  }, [imageRef, zoom]);

  return (
    <div className="w-full h-[300px] md:h-screen bg-gray/95 relative overflow-hidden">
      <picture className="w-full">
        <img
          ref={imageRef}
          src={image}
          alt={title}
          className={`w-full h-[300px] md:h-screen object-fit ${zoom > 100 ? 'cursor-move' : ''}`}
          style={{
            transform: `scale(${zoom / 100}) translate(${position.x}px, ${position.y}px)`
          }}
          draggable={false}
        />
      </picture>
      <div className="w-[48px] h-[93px] z-10 bg-white flex flex-col items-center justify-center gap-2 rounded-full absolute right-8 bottom-4 cursor-pointer">
        <div
          className="w-[36px] h-[36px] mt-2 rounded-full flex items-center justify-center cursor-pointer"
          onClick={zoomIn}
        >
          <Icon name="add" size="30" color="orange" />
        </div>
        <div
          className="w-[36px] h-[36px] mb-2 rounded-full flex items-center justify-center cursor-pointer"
          onClick={zoomOut}
        >
          <Icon name="minus" size="26" color="orange" />
        </div>
      </div>
    </div>
  );
};

export default memo(ImageZoom);
