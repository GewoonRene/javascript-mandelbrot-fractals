
window.addEventListener('DOMContentLoaded', () => {

    // Variables
    const canvas = document.getElementById('hallucination');
    const context = canvas.getContext('2d');

    let width = canvas.width;
    let height = canvas.height;
    
    // Creating the data
    let imageData = context.createImageData( width, height );

    // Calling the loop
    init(0);

    // Initializing the loop
    function init(frame) {
        window.requestAnimationFrame(init);

        // Creating the image
        createImage(Math.floor(frame / 10));

        // Drawing the image
        context.putImageData(imageData, 0, 0);

    }

    // Creating the image
    function createImage(offset) {
        // Looping over the images
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {

                // Get pixel index
                let pixelIndex = (y * width + x) * 4;

                // Generate pattern
                let red = ((x + offset) % 256) ^ (( y + offset ) % 256);
                let green = ((2 * x + offset) % 256) ^ (( 2 * y + offset ) % 256);
                let blue = 50 + Math.floor(Math.random() * 100);

                // rotate colors
                blue = (blue + offset) % 256;

                // give the pixels the right data
                imageData.data[pixelIndex] = red;
                imageData.data[pixelIndex + 1] = green;
                imageData.data[pixelIndex + 2] = blue;
                imageData.data[pixelIndex + 3] = 255; // Alpha

            }
        }
    }

});

window.addEventListener('DOMContentLoaded', () => {

    // Variables
    const canvas = document.getElementById('mandelbrot');
    const context = canvas.getContext('2d');

    let width = canvas.width;
    let height = canvas.height;

    // Creating the data
    let imageData = context.createImageData( width, height );

    // Palette array for all colors
    let palette = [];

    // Number of iterations per pixel
    let maxiterations = 250;

    // Pan and zoom parameters
    let offsetx = -width / 2;
    let offsety = -height / 2;
    let panx = -100;
    let pany = 0;
    let zoom = 150;

    // Calling the game
    init();

    // Initialize the game
    function init() {
        
        // Generate palette
        generatePalette();
        
        // Generate image
        generateImage();
    
        // Enter main loop
        main(0);
    }
    
    // Main loop
    function main(frame) {
        // Request animation frames
        window.requestAnimationFrame(main);
        
        // Draw the generate image
        context.putImageData(imagedata, 0, 0);
    }

    // Calculate the color of a specific pixel
    function iterate(x, y, maxiterations) {

        // Convert screen coordinates to fractal coordinate
        let x0 = ( x + offsetx + panx) / zoom;
        let y0 = ( y + offsety + pany) / zoom;

        // Iteration
        let a = 0;
        let b = 0;
        let rx = 0;
        let ry = 0;

        let iterations = 0;
        while (iterations < maxiterations && (rx * rx + ry * ry <= 4 )) {
            rx = a * a - b * b + x0;
            ry = 2 * a * b + y0;

            a = rx;
            b = ry;
            iterations++;
        }

        // Make a palette 
        let color;
        if (iterations == maxiterations) {
            color = { r:0, g:0, b:0 };
        } else {
            let index = Math.floor((iterations / (maxiterations - 1)) * 255);
            color = palette[index];
        }

        // Applying the colors
        let pixelIndex = ( y * width + x) * 4;
        imageData.data[pixelIndex] = color.r;
        imageData.data[pixelIndex + 1] = color.g;
        imageData.data[pixelIndex + 2] = color.b;
        imageData.data[pixelIndex + 3] = 255

    }

    function generatePalette() {
        // Calculate a gradient
        let roffset = 24;
        let goffset = 16;
        let boffset = 0;

        for ( let i = 0; i < 256; i++) {
            palette[i] = { r: roffset, g: goffset, b: boffset};

            if ( i < 64 ) {
                roffset += 3;
            } else if ( i < 128 ) {
                goffset += 3;
            } else if ( i < 192) {
                boffset += 3;
            }
        }
    }

    // Generating the fractal image
    function generateImage() {
        for (let x = 0; x <  width; x++) {
            for (let y = 0; y <  height; x++) {
                iterate(x, y, maxiterations);
            }
        } 
    }

});