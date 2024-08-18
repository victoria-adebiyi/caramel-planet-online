'use client';
import React, {useCallback, useEffect, useRef} from 'react';
import door from '../assets/door.png';
import { addPointerEvent } from 'framer-motion';

interface DoorProps {
    onClick: () => void;
}

export default function DoorButton({onClick}: DoorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const currentFrameRef = useRef(0);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const numColumns = 2;
    const numRows = 1;

    const draw = useCallback((context: CanvasRenderingContext2D) => {
        if (!imageRef.current) return;

        // Update rows and columns
        const column = currentFrameRef.current % numColumns;
        const row = Math.floor(currentFrameRef.current / numColumns);
        const frameWidth = imageRef.current.width / numColumns;
        const frameHeight = imageRef.current.height / numRows;

        // Clear the canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        // Draw the current frame
        context.drawImage(
            imageRef.current,
            column * frameWidth,
            row * frameHeight,
            frameWidth,
            frameHeight,
            0, 0, // Destination x, y
            frameWidth,
            frameHeight // Destination width, height
        );
    }, []);
  
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d') || null;

        if (!canvas || !context) {
            console.error('Canvas or context not found!');
            return;
        }
            
        const image = new Image();
        image.src = door.src;
        imageRef.current = image;

        image.onload = () => {
            const frameWidth = image.width / numColumns;
            const frameHeight = image.height / numRows;

            // Adjust canvas size based on the image
            canvas.width = frameWidth;
            canvas.height = frameHeight;

            // Initial drawing
            draw(context);
        };

        const onMouseover = () => {
            currentFrameRef.current = 1;
            draw(context);
        }
    
        const onMouseout = () => {
            currentFrameRef.current = 0;
            draw(context);
        }

        canvas.addEventListener('mouseover', onMouseover)
        canvas.addEventListener('mouseout', onMouseout)
        canvas.addEventListener('click', onClick)

        return () => {
            canvas.removeEventListener('mouseover', onMouseover);
            canvas.removeEventListener('mouseout', onMouseout);
            canvas.removeEventListener('click', onClick);
        };
    }, [draw, onClick]);

    return (
        <>
        <canvas className='doorcanvas' id={'door'} ref={canvasRef}/>
        </>
    );
}
