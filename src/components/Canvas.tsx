import React, {useEffect, useState} from "react";
import {print,setBgImage} from "../helpers/ImageHelper";

type CanvasProps = {
    lineOpacity: number;
    lineColor: string;
    lineWidth: number;
    width:number;
    height:number;
    imageUri: string;
    setLineColor: string;
	setLineWidth: number;
	setLineOpacity: number;
}

const Canvas:React.FunctionComponent<CanvasProps> = (props) => {
    const {lineColor, lineOpacity, lineWidth, width, height, setLineColor, setLineWidth, setLineOpacity } = props;
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const ctxRef = React.useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const colorPalette = [{"color":"yellow","value":"#FFFF00"}, {"color":"red","value":"#FF0000"}, {"color":"green","value":"#00FF00"}, {"color":"blue","value":"#0000FF"}, {"color":"black", "value":"#000000"}];
    const imgList = [
        'happy2.svg',
        'snowflake.svg',
        'sonic.svg',
        'cheshire.svg',
    ];
    let canvasId:string = "canvasDraw";
    let selectedColor: string = "#000000";

    useEffect(() => {
        let canvas = canvasRef.current;
        let ctx = canvas?.getContext("2d");
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = lineOpacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
    }, [lineColor, lineOpacity, lineWidth]);


    const setBlackColor = () => {
        let blackColor = document.querySelectorAll("[data-color='black']")[0];
        blackColor.style.marginLeft = "20%";
        selectedColor = "black";
        setLineColor(selectedColor);
    }

    const resetColors = () => {
        let colors = document.getElementsByClassName('color');
        let colorsCount = colors.length;
        for (let i=0; i< colorsCount; i++) {
            colors[i].style.marginLeft= "20px";
        }
    }

    const startDrawing = (e:any) => {
        ctxRef.current?.beginPath();
        ctxRef.current?.moveTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        );
        setIsDrawing(true);
    };
  
    const endDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    const clearDrawing = () => {
        resetColors();
        setBlackColor();
        ctxRef.current.clearRect(0, 0, width, height);
    }
  
    const draw = (e:any) => {
        if (!isDrawing) {
            return;
        }
        ctxRef.current.lineTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        );
        ctxRef.current.stroke();
    };

    const updateColorFromPalette = (e:any) => {
        resetColors();
        selectedColor = e.target.getAttribute("data-color");
        e.target.style.marginLeft = "20%";
        setLineColor(selectedColor);
    }

    const updateLineWidth = (e:any) =>{
        setLineWidth(e.target.value);
    }

    const updateBrushOpacity = (e:any) => {
        let opacity = parseFloat(e.target.value);
        if (opacity > 0) {
            setLineOpacity(opacity / 100);
        }
    }

    const saveCanvasToImagePng = (e:any) => {
        let url = document.getElementById(canvasId).toDataURL();
        const createEl = document.createElement('a');

        createEl.href = url;
        createEl.download = "download-this-canvas";

        createEl.click();
        createEl.remove();
    }

    const setColoringBg = () => {
        let index =  Math.floor(Math.random() * 3);

        setBgImage(height, width, ctxRef.current, "/img/" + imgList[index]);
    }

    return (
        <div className="coloringWrapper mt-4">
            <div className="row pl-3">
                <div className="col-3 toolbox">
                    <div className="row buttons pb-1">
                        <div className="col-2 save">
                            <button
                                className="btn btn-success saveBtn"
                                onClick={saveCanvasToImagePng}
                                title="Save">
                                <i className="bi bi-save"></i>
                            </button>
                        </div>
                        {/* <div className="col-2 undo">
                            <button
                                className="btn btn-info undoBtn"
                                title="Undo"
                                onClick={cUndo}>
                                <i className="bi bi-arrow-return-left"></i>
                            </button>
                        </div> */}
                        <div className="col-2 printImage">
                            <button
                                data-canvas ="canvasDraw"
                                data-svg = "paint"
                                className="btn btn-success printBtn"
                                title="Print"
                                onClick={print}>
                                    <i className="bi bi-printer"></i>
                            </button>
                        </div>
                        <div className="col-2 clear">
                            <button
                                className="btn btn-danger clearBtn"
                                title="Clear"
                                onClick={clearDrawing}>
                                <i className="bi bi-x-circle"></i>
                            </button>
                        </div>
                    </div>
                    <div className="row paletteContainer mt-4">
                        <div className="col-12 mt-2 brushWidth">
                            <label>Width</label>
                            <input
                                type="range"
                                min="3"
                                max="20"
                                step="1"
                                onChange={updateLineWidth}
                            />
                        </div>
                        <div className="col-12 mt-2 opacity">
                            <label>Opacity</label>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                step="5"
                                onChange={updateBrushOpacity}
                            />
                        </div>
                        <div className="col-12 paletteWidth">
                            <button
                                type="button"
                                className="btn btn-secondary btn-lg color mt-2"
                                title="white"
                                data-color="white"
                                key="white"
                                onClick={updateColorFromPalette}>
                                    <i className="bi bi-eraser"></i>
                            </button>
                            {colorPalette.map((color) => (
                            <img 
                                src={"/img/"+ color.color+".png"}
                                alt={color.color}
                                data-color={color.color}
                                className="color mt-2"
                                key={color.color}
                                onClick={updateColorFromPalette}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-9 drawCanvasBox">
                    <div className="row mb-1">
                        <div className="col-12">
                            <button type="button" className="btn btn-secondary" onClick={setColoringBg}>
                                <i className="bi bi-card-image"></i>
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={setColoringBg}>
                                <i className="bi bi-card-image"></i>
                            </button>
                            <button
                                type="button" 
                                className="btn btn-secondary"
                                onClick={setColoringBg}>
                                <i className="bi bi-card-image"></i>
                            </button>
                        </div>
                    </div>
                    <canvas 
                        id="canvasDraw" 
                        className="draw"
                        onMouseDown={startDrawing}
                        onMouseUp={endDrawing}
                        onMouseMove={draw}
                        ref={canvasRef}
                        width={width}
                        height={height}/>
                    <div id="paint" style={{display:"none"}}></div>
                </div>
            </div>
            <footer>
                <a href="https://bojanseirovski.github.io/">https://bojanseirovski.github.io/</a>
            </footer>
        </div>
    );
}

export default Canvas;