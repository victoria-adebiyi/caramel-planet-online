"use client";
import spritesheet from '../assets/individual_frames/spritesheet.png'
import React, { useEffect, useRef, useState } from 'react';

export default function AnimatedRoomMap() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const numColumns = 24;
    const numRows = 1;

    const [frameDelay, setFrameDelay] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d') || null;
        let frameWidth: number;
        let frameHeight: number;
        let currentFrame = 0;

        const image = new Image();
        image.src = spritesheet.src;
        image.onload = () => {
            frameWidth = image.width / numColumns;
            frameHeight = image.height / numRows;

            // Start the first frame request
            window.requestAnimationFrame(gameLoop);
        };

        function gameLoop(_timeStamp: number) {
            setFrameDelay(prev => {
                if (prev < 8) {  // Adjust this value to control speed (lower value = faster)
                    return prev + 1;
                } else {
                    update();
                    draw(context, image);
                    return 0;
                }
            });

            window.requestAnimationFrame(gameLoop);
        }

        const update = () => {
            // Pick a new frame
            currentFrame++;
            // Make the frames loop
            const maxFrame = numColumns * numRows - 1;
            if (currentFrame > maxFrame) {
                currentFrame = 0;
            }
        }

        const draw = (context: CanvasRenderingContext2D | null, image: HTMLImageElement) => {
            if (!context) return;

            // Update rows and columns
            const column = currentFrame % numColumns;
            const row = Math.floor(currentFrame / numColumns);

            // Clear the canvas
            context.clearRect(0, 0, canvas!.width, canvas!.height);

            // Draw the current frame
            context.drawImage(
                image,
                column * frameWidth,
                row * frameHeight,
                frameWidth,
                frameHeight,
                0, 0, // Destination x, y
                frameWidth,
                frameHeight // Destination width, height
            );
        };

    }, [canvasRef]);

    return (
        <canvas className='roomcanvas' ref={canvasRef} id={'room'} width='246' height='216'/>
    );
}
