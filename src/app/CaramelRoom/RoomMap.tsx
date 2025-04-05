'use client';
import React, {useEffect} from 'react';
import nighttime from '../assets/original_size_animated.png'

export default function RoomMap() {
    
    useEffect(() => {
        const canvas = document.getElementById('room') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
            
        const image = new Image();
        image.src = nighttime.src;
        image.onload = () => {
            ctx?.drawImage(image, 0, 0)
        };
    }, []);

    return (
        <>
        <canvas id={'room'} width='246' height='216'/>
        </>
    );
}
