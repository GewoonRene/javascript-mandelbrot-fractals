
window.addEventListener('DOMContentLoaded', () => {

    // Variables
    const canvas = document.querySelector('canvas');
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