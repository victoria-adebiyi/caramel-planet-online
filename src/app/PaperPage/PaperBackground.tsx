'use client';
import React, {useEffect} from 'react';
import paper from '../assets/paper-design/MainPage.png'
import shadow from '../assets/paper-design/PaperBehind.png'

export default function PaperBackground() {
    var topLayer;
    var bottomLayer;
    var topCtx: CanvasRenderingContext2D | null;
    var bottomCtx: CanvasRenderingContext2D | null;
    var WIDTH = 774;
    var HEIGHT = 512;
    function init() {
        topLayer = document.getElementById('topLayer') as HTMLCanvasElement;
        topCtx = topLayer.getContext('2d');
        bottomLayer = document.getElementById('bottomLayer') as HTMLCanvasElement;
        bottomCtx = bottomLayer.getContext('2d');
    }
    
    useEffect(() => {
        init();
        const backgroundImage = new Image();
        const backgroundShadow = new Image();
        backgroundImage.src = paper.src;
        backgroundShadow.src = shadow.src;
        backgroundImage.onload = () => {
            topCtx?.clearRect(0, 0, WIDTH, HEIGHT)
            topCtx?.drawImage(backgroundImage, 0, 0)
            backgroundShadow.onload = () => {
                bottomCtx?.clearRect(0, 0, WIDTH, HEIGHT)
                bottomCtx?.drawImage(backgroundShadow, 0, 0)
            }
        }
    });

    return (
        <>
        <div id="canvasesdiv" className='pagediv'>
            <canvas id='topLayer' className='pagecanvas'>
                This text is displayed if your browser does not support HTML5 Canvas.
            </canvas>
            <canvas id='bottomLayer' className='pagecanvas'>
                This text is displayed if your browser does not support HTML5 Canvas.
            </canvas>
        </div>
        </>
    );
}
