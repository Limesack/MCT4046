// This code has an interface for uploading images, downscale them to  a 16x16 pixels image,
// and then extract the RGB values from all pixels. The RGB values are then mapped to a 
// frequencies played by a synth through a sequencer.
// The three RGB nots are mapped to one synth each, and plays a harmony through the 16 beat sequence

// Sequencer code:

const keys = new Tone.Players({
    urls: {
        0: "../samples/002.wav",
        1: "../samples/003.wav",
        2: "../samples/004.wav",
        3: "../samples/005.wav",
        4: "../samples/006.wav",
    },
    fadeOut: "64n",
    //baseUrl: "https://tonejs.github.io/audio/casio/"
}).toDestination();

document.querySelector("tone-play-toggle").addEventListener("start", () => Tone.Transport.start());
document.querySelector("tone-play-toggle").addEventListener("stop", () => Tone.Transport.stop());
document.querySelector("tone-slider").addEventListener("input", (e) => Tone.Transport.bpm.value = parseFloat(e.target.value));
document.querySelector("tone-step-sequencer").addEventListener("trigger", ({ detail }) => {
    keys.player(detail.row).start(detail.time, 0, "16t");
});

////////
const synth = new Tone.AMSynth().toMaster();
const synth2 = new Tone.AMSynth().toMaster();
const synth3 = new Tone.AMSynth().toMaster();



    window.addEventListener('load', function() {
        document.querySelector('input[type="file"]').addEventListener('change', function() {
            if (this.files && this.files[0]) {
                var img1 = document.querySelector('img');
    cv = document.querySelector("#cv");
    c = cv.getContext("2d");
    
    pre1 = document.querySelector("pre1")
    pre2 = document.querySelector("pre2")
    pre3 = document.querySelector("pre3")
    pre = document.querySelector("pre")

    //img1 = new Image();
    img1.crossOrigin = "Anonymous"; // to bypass cors for imgur image link
    
    //img1.src = 'assets/colours.jpg';
    img1.src = URL.createObjectURL(this.files[0]); // set src to blob url
    
    img1.onload = function() {



        URL.revokeObjectURL(img1.src);  // no longer needed, free memory
        c.drawImage(img1, 0,0,scaledWidth, scaledHeight);
        var idata = c.getImageData(0, 0, scaledWidth, scaledHeight);
        getPixels(idata);

        //// code for pixelating 

        var width = scaledWidth * 50;
        var height = scaledHeight * 50;

      
        // Create canvas element.
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
      
        // This is what gives us that blocky pixel styling, rather than a blend between pixels.
        canvas.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0
                               'image-rendering: -moz-crisp-edges;' + // FireFox
                               'image-rendering: -o-crisp-edges;' +  // Opera
                               'image-rendering: -webkit-crisp-edges;' + // Chrome
                               'image-rendering: crisp-edges;' + // Chrome
                               'image-rendering: -webkit-optimize-contrast;' + // Safari
                               'image-rendering: pixelated; ' + // Future browsers
                               '-ms-interpolation-mode: nearest-neighbor;'; // IE
      
        // Grab the drawing context object. It's what lets us draw on the canvas.
        var context = canvas.getContext('2d');
      
        // Use nearest-neighbor scaling when images are resized instead of the resizing algorithm to create blur.
        context.webkitImageSmoothingEnabled = false;
        context.mozImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

      
        // Render image smaller.
        context.drawImage(img1, 0, 0, scaledWidth, scaledHeight);
      
        // Stretch the smaller image onto larger context.
        context.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, width, height);
      
        // Here are what the above parameters mean:
        // canvasElement, canvasXOffsetForImage, canvasYOffsetForImage, imageWidth, imageHeight, imageXOffset, imageYOffset, destinationImageWidth, destinationImageHeight
      
        // Append canvas to body.
        pre.appendChild(canvas);
        
    };
      
    
}   


function getPixels(imgData) {
    // get colors rgba (4 pix sequentially)
    
    var count=1;
    var msg = '';
    var rValues = [];
    var gValues = [];
    var bValues = [];
    var highest = [];
    var lowest = [];
    var brightnessArray = [];
    let brightness = [];
    let brightness2 = [];
    for (var i = 0; i < imgData.data.length; i += 4) {
        msg += "\npixel red " + count + ": " + imgData.data[i];
        msg += "\npixel green " + count + ": " + imgData.data[i+1];
        msg += "\npixel blue " + count + ": " + imgData.data[i+2];
        msg += "\npixel alpha " + count + ": " + imgData.data[i+3] + "\n";
        rValues += Math.floor(imgData.data[i]/2) + " ";
        gValues += Math.floor(imgData.data[i+1]/2) + " ";
        bValues += Math.floor(imgData.data[i+2]/2) + " ";


// Getting brightness values of pixels:
        highest = Math.max((imgData.data[i]), (imgData.data[i+1]), (imgData.data[i+2]) );
        lowest = Math.min((imgData.data[i]), (imgData.data[i+1]), (imgData.data[i+2]) );
        //brightness += ((highest + lowest) / 2 / 255) + " ";
        brightness += Math.floor(((highest + lowest) / 2 / 255) * 50) + " ";
        brightness2 += Math.floor(((highest + lowest) / 2 / 255) * 100) + " ";
        
    
        count++;  
    }   

    // Function that converts midi value to frequency:


    
    function arrayToFreq(array) {
        let a = 440; //frequency of A (coomon value is 440Hz)
        var newArray = [];

        for (var i = 0; i < array.length; i += 1) {

            newArray.push((a / 32) * (2 ** ((array[i] - 9) / 12)));
            
        }   
        return newArray; 
    }




    // converting brightnessvalue to array:
    brightness = brightness.split(" ");
    brightness.pop();
    brightness = arrayToFreq(brightness);
    console.log(brightness);
    // converting rValues to array:

    brightness2 = brightness2.split(" ");
    brightness2.pop();
    brightness2 = arrayToFreq(brightness2);
    console.log(brightness2);
    // converting rValues to array:
    
    
    rValues = rValues.split(" ");
    rValues.pop();
    rValues = arrayToFreq(rValues);
    console.log(rValues);

    rgbValues = imgData.data;
    //console.log(typeof(rgbValues));
    //console.log(rgbValues);
    // converting gValues to array:
    gValues = gValues.split(" ");
    gValues.pop();
    gValues = arrayToFreq(gValues);
    
    // converting bValues to array:
    bValues = bValues.split(" ");
    bValues.pop();
    bValues = arrayToFreq(bValues);
    

    const seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, brightness).start(0);

    const seq2 = new Tone.Sequence((time, note) => {
        synth2.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, brightness2 ).start(0);

    const seq3 = new Tone.Sequence((time, note) => {
        synth3.triggerAttackRelease(note, 0.2, time);

        // subdivisions are given as subarrays
    }, brightness).start(1);
    
    //console.log(imgData.height);
    //console.log(imgData.data.length);
    pre1.innerText = ("Red values array: " + rValues);       
    pre2.innerText = ("Green values array: " + gValues);       
    pre3.innerText = ("Blue values array: " + bValues);  
}

            

});
});