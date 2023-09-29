/**
 * Different helper methods
 */

export function resizeImage(width: any, height: any, image: any, ctx: any) {
    let iWidth = image.width;
    let iHeight = image.height;

    let finalW = width;
    let finalH = height;
    let padw = 0;
    let padh = 0;

    if (iWidth < width) {
        finalW = iWidth;
        padw = width / 4;
    } else {
        finalW = width / 2;
    }
    if (iHeight < height) {
        finalH = iHeight;
        padh = height / 4;
    } else {
        finalH = height / 2;
    }

    ctx.drawImage(image, padh, padw, finalH, finalW);
}

export function isSvgShape(element: any) {
    // List of recognized shape elements
    const shapeElements = ['rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'path'];

    // Check if the clicked element is an SVG element
    if (element instanceof SVGElement) {
        // Get the element's tag name and convert it to lowercase
        const tagName = element.tagName.toLowerCase();

        // Check if the tag name is in the list of recognized shape elements
        return shapeElements.includes(tagName);
    }

    return false;
}

export function setBgImage(height: number, width: number, ctxRef: any, imageUri:string) {
    let img = new Image();
    img.onload = function(){
        resizeImage(height, width, img, ctxRef);
    };
    img.src = imageUri;
    return img;
}

export function selectPaintTool(e:any)  {
    const allBrushTools = document.querySelectorAll('div.row.toolOptions');
    const coloringImg = document.getElementById('paint');
    const drawCanvas = document.getElementById('canvasDraw');
    let selectedTool = e.target.getAttribute("data-name");
    if (selectedTool !== "brush") {
        allBrushTools[0].style.display = 'none';
        coloringImg.style.display = 'block';
        drawCanvas.style.display = 'none';
    } else {
        allBrushTools[0].style.display = 'flex';
        coloringImg.style.display = 'none';
        drawCanvas.style.display = 'inline';
    }
}

export function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

export function print(e: any) {
    let canvasId = e.target.getAttribute("data-canvas");
    if (document.getElementById(canvasId)?.style.display !== "none") {
        printCanvas(e);
    } else {
        printSvg(e);
    }
}

export function printCanvas(e: any) {
    let canvasId = e.target.getAttribute("data-canvas");
    var dataUrl = document.getElementById(canvasId).toDataURL();
    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>'
    windowContent += '<head><title>Print canvas</title></head>';
    windowContent += '<body onload="window.print()">'
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';
    var printWin = window.open('','','width=1000,height=1000');
    printWin?.document.open();
    printWin?.document.write(windowContent);
    printWin?.document.close();
}

export function printSvg(e:any) {
    let svgId = e.target.getAttribute("data-svg");
    let innerContents = document.getElementById(svgId).outerHTML;
    let popupWinindow = window.open('', '', 'width=1000,height=1000');
    popupWinindow?.document.open();
    popupWinindow?.document.write('<!DOCTYPE html><html><head><style></style></head><body onload="window.print()"><svg>' + innerContents + '</svg></html>');
    popupWinindow?.document.close();
}

export function getSaveSvgData() {
    let svg = document.getElementById("coloring");
    let serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);

    if(!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)){
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if(!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)){
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    source = '<?xml version="1.0" standalone="no"?>\r\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" '+
    '"http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">\r\n' + source;

    //convert svg source to URI data scheme.
    var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
    return url;
}