// This is the code for Image pixel sequencer.
// versjo n7: gjør koden enklere. bare én gain, bare en effekt

// Sequencer code borrowed from Tone.js examples https://tonejs.github.io/examples/stepSequencer:
const keys = new Tone.Players({
    urls: {
        0: "BD.wav",
        1: "SDRoom.wav",
        2: "HH.wav",
        3: "OH.wav",
    },
  
      baseUrl: "https://limesack.github.io/MCT4046/Javascript/Medoog/"
  
  }).toDestination();
  
  document.querySelector("tone-play-toggle").addEventListener("start", () => Tone.Transport.start());
  document.querySelector("tone-play-toggle").addEventListener("stop", () => Tone.Transport.stop());
  document.querySelector("tone-slider").addEventListener("input", (e) => Tone.Transport.bpm.value = parseFloat(e.target.value));
  document.querySelector("tone-step-sequencer").addEventListener("trigger", ({ detail }) => {
      keys.player(detail.row).start(detail.time, 0, "0t");
  });
  
  ////////
  
  //Gain and effects:
  
  //Gain:
  let gainNode = new Tone.Gain().toMaster();
  gainNode.gain.value = 0.5;
  
  // individual gainNodes
  let gainNode1 = new Tone.Gain().connect(gainNode);
  let gainNode2 = new Tone.Gain().connect(gainNode);
  let gainNode3 = new Tone.Gain().connect(gainNode);
  let gainNode4 = new Tone.Gain().connect(gainNode);
  let gainNode5 = new Tone.Gain().connect(gainNode);
  let gainNode6 = new Tone.Gain().connect(gainNode);
  let gainNode7 = new Tone.Gain().connect(gainNode);
  let gainNode8 = new Tone.Gain().connect(gainNode);
  let gainNode9 = new Tone.Gain().connect(gainNode);
  let gainNode10 = new Tone.Gain().connect(gainNode);
  let gainNode11 = new Tone.Gain().connect(gainNode);
  let gainNode12 = new Tone.Gain().connect(gainNode);
  let gainNode13 = new Tone.Gain().connect(gainNode);
  let gainNode14 = new Tone.Gain().connect(gainNode);
  let gainNode15 = new Tone.Gain().connect(gainNode);
  let gainNode16 = new Tone.Gain().connect(gainNode);
  
  // Individual filters
  const autoFilter1 = new Tone.AutoFilter("4n").connect(gainNode1);
  autoFilter1.type = "square3";
  const autoFilter2 = new Tone.AutoFilter("4n").connect(gainNode2);
  autoFilter2.type = "square4";
  const autoFilter3 = new Tone.AutoFilter("4n").connect(gainNode3);
  autoFilter3.type = "square5";
  const autoFilter4 = new Tone.AutoFilter("4n").connect(gainNode4);
  autoFilter4.type = "square6";
  //Individual FeedbackDelay
  const feedbackDelay5 = new Tone.FeedbackDelay("8n", 0.5).connect(gainNode5);
  const feedbackDelay6 = new Tone.FeedbackDelay("8n", 0.5).connect(gainNode6);
  const feedbackDelay7 = new Tone.FeedbackDelay("8n", 0.5).connect(gainNode7);
  const feedbackDelay8 = new Tone.FeedbackDelay("8n", 0.5).connect(gainNode8);
  
  // ################################################################# EFFECTS
  
  // EFFECTS
  // REVERB
  const reverb9 = new Tone.Reverb({
    decay: 1,
    preDelay:0.02,
    wet: 0.5,
  }).connect(gainNode9);

  const reverb10 = new Tone.Reverb({
    decay: 1,
    preDelay:0.02,
    wet: 0.5,
  }).connect(gainNode10);

  const reverb11 = new Tone.Reverb({
    decay: 1,
    preDelay:0.02,
    wet: 0.5,
  }).connect(gainNode11);

  const reverb12 = new Tone.Reverb({
    decay: 1,
    preDelay:0.02,
    wet: 0.5,
  }).connect(gainNode12);
  
  
  
  // PHASER
  const phaser13 = new Tone.Phaser({
      frequency: 15,
      octaves: 5,
      baseFrequency: 1000,
    //Q: 1,
    wet: 0.5,
  }).connect(gainNode13);

  const phaser14 = new Tone.Phaser({
    frequency: 15,
    octaves: 5,
    baseFrequency: 1000,
  //Q: 1,
  wet: 0.5,
}).connect(gainNode14);

const phaser15 = new Tone.Phaser({
    frequency: 15,
    octaves: 5,
    baseFrequency: 1000,
  //Q: 1,
  wet: 0.5,
}).connect(gainNode15);

const phaser16 = new Tone.Phaser({
    frequency: 15,
    octaves: 5,
    baseFrequency: 1000,
  //Q: 1,
  wet: 0.5,
}).connect(gainNode16);
  
  
//   // PING PONG DELAY
//   const ppdelay = new Tone.PingPongDelay({
//     delayTime: 100,
//     Feedback: 33,
//     wet: 0.5,
//   });
  
  // ################################################################# INSTRUMENTS
  
  // SYNTHS
  // SYNTH 1
  const synth = new Tone.DuoSynth({
      oscillator: {
          type: "sawtooth",
      },
      envelope: {
      attack: 0.05,
      decay: 0.1,
      release: 1,
      sustain: 0.9,
      },
      filter: {
      Q: 1,
      rolloff: -12,
      type: "lowpass",
      },
    filterEnvelope: {
      attack: 0.005,
      baseFrequency: 200,
      decay: 0.1,
      exponent: 2,
      octaves: 3,
      release: 2,
      sustain: 1,
    },
    harmonicity: 2, // 2 = 1 oscilator en oktav over den andre, 1 = unison
    Detune: 10,
    vibratoAmount: 0,
    vibratoRate: 0,
  }).connect(autoFilter1);
  
  
  
  // synth1 - 6 autoFilter, synth 7-10 feedbackDelay, synth 11-16 autoFilter + automated sustain
  //const synth = new Tone.AMSynth().connect(autoFilter1);
  const synth2 = new Tone.AMSynth().connect(autoFilter2);
  const synth3 = new Tone.AMSynth().connect(autoFilter3);
  const synth4 = new Tone.AMSynth().connect(autoFilter4);

// SYNTH 5
const synth5 = new Tone.FMSynth({
    detune: 10,
    envelope: {
        attack: 0.005,
        decay: 0.1,
        release: 1,
        sustain: 0.3,
    },
    harmonicity: 1,
    modulation: 1,
    modulationEnvelope: {
        attack: 0.005,
        decay: 0.1,
        release: 1,
        sustain: 0.3,
    },
    oscillator: "sine",
    portamento: 0,
    }).connect(feedbackDelay5);

const synth6 = new Tone.FMSynth().connect(feedbackDelay6);
const synth7 = new Tone.AMSynth().connect(feedbackDelay7);
const synth8 = new Tone.FMSynth().connect(feedbackDelay8);

    // SYNTH 9
    const synth9 = new Tone.DuoSynth({
        oscillator: {
            type: "sawtooth",
        },
        envelope: {
        attack: 0.05,
        decay: 0.1,
        release: 1,
        sustain: 0.9,
        },
        filter: {
        Q: 1,
        rolloff: -12,
        type: "lowpass",
        },
      filterEnvelope: {
        attack: 0.005,
        baseFrequency: 200,
        decay: 0.1,
        exponent: 2,
        octaves: 3,
        release: 2,
        sustain: 1,
      },
      harmonicity: 2, // 2 = 1 oscilator en oktav over den andre, 1 = unison
      Detune: 10,
      vibratoAmount: 0,
      vibratoRate: 0,
    }).connect(reverb9);
    

const synth10 = new Tone.AMSynth().connect(reverb10);
const synth11 = new Tone.AMSynth().connect(reverb11);
const synth12 = new Tone.FMSynth().connect(reverb12);

// SYNTH 13
const synth13 = new Tone.FMSynth({
    detune: 10,
    envelope: {
        attack: 0.005,
        decay: 0.1,
        release: 1,
        sustain: 0.3,
    },
    harmonicity: 1,
    modulation: 1,
    modulationEnvelope: {
        attack: 0.005,
        decay: 0.1,
        release: 1,
        sustain: 0.3,
    },
    oscillator: "sine",
    portamento: 0,
    }).connect(phaser13);


const synth14 = new Tone.FMSynth().connect(phaser14);
const synth15 = new Tone.AMSynth().connect(phaser15);
const synth16 = new Tone.FMSynth().connect(phaser16);
  
  // 16 brightness arrays
  let brightness = [];
  let brightness2 = [];
  let brightness3 = [];
  let brightness4 = [];
  let brightness5 = [];
  let brightness6 = [];
  let brightness7 = [];
  let brightness8 = [];
  let brightness9 = [];
  let brightness10 = [];
  let brightness11 = [];
  let brightness12 = [];
  let brightness13 = [];
  let brightness14 = [];
  let brightness15 = [];
  let brightness16 = [];
  
  // function for loading an image
      window.addEventListener('load', function() {
          document.querySelector('input[type="file"]').addEventListener('change', function() {
              if (this.files && this.files[0]) {
                  var img1 = document.querySelector('img');
      cv = document.querySelector("#cv");
      c = cv.getContext("2d");
  
      // This is where the pixelated image will be placed in the HTML
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
  
          var width = scaledWidth * 37.5; // the size of the pixels
          var height = scaledHeight * 37.5;
  
  
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
  
  // Function for getting pixels:
  function getPixels(imgData) {
      // get colors rgba (4 pix sequentially)
  
      var count=1;
      //var msg = '';
      var rValues = [];
      var gValues = [];
      var bValues = [];
      var highest = [];
      var lowest = [];
      let warmColours = [];
      let coldColours = [];
      let whiteness = [];
  
      for (var i = 0; i < imgData.data.length; i += 4) {

        // Individual r, g and b values are not used, but is good to keep for later
        //   rValues += Math.floor(imgData.data[i]) + " ";
        //   gValues += Math.floor(imgData.data[i+1]) + " ";
        //   bValues += Math.floor(imgData.data[i+2]) + " ";
  
  // Getting brightness values of pixels:
          highest = Math.max((imgData.data[i]), (imgData.data[i+1]), (imgData.data[i+2]) );
          lowest = Math.min((imgData.data[i]), (imgData.data[i+1]), (imgData.data[i+2]) );
          brightness += ((highest + lowest) / 2 / 255) + " ";
  
          warmColours += normalize((imgData.data[i] - imgData.data[i+2]) / 255) + " ";
          coldColours += normalize((imgData.data[i+2] - imgData.data[i]) / 255) + " ";
          whiteness += ((((imgData.data[i]) + (imgData.data[i+1]) + (imgData.data[i+2])) /765) * 0.9) + " ";
  
          count++;
      }
  // Arrays for lightness
  whiteness = whiteness.split(" ");
  whiteness.pop();
  let whiteness1 = sliceAndMultiply(0, whiteness);
  let whiteness2 = sliceAndMultiply(1, whiteness);
  let whiteness3 = sliceAndMultiply(2, whiteness);
  let whiteness4 = sliceAndMultiply(3, whiteness);
  let whiteness5 = sliceAndMultiply(4, whiteness);
  let whiteness6 = sliceAndMultiply(5, whiteness);
  let whiteness7 = sliceAndMultiply(6, whiteness);
  let whiteness8 = sliceAndMultiply(7, whiteness);
  let whiteness9 = sliceAndMultiply(8, whiteness);
  let whiteness10 = sliceAndMultiply(9, whiteness);
  let whiteness11 = sliceAndMultiply(10, whiteness);
  let whiteness12 = sliceAndMultiply(11, whiteness);
  let whiteness13 = sliceAndMultiply(12, whiteness);
  let whiteness14 = sliceAndMultiply(13, whiteness);
  let whiteness15 = sliceAndMultiply(14, whiteness);
  let whiteness16 = sliceAndMultiply(15, whiteness);
  console.log(whiteness1);
  console.log(whiteness2);
  console.log(whiteness3);
  
  // Array for warm colours
  warmColours = warmColours.split(" ");
  warmColours.pop();
  let warmColours1 = sliceAndMultiply(0, warmColours);
  let warmColours2 = sliceAndMultiply(1, warmColours);
  let warmColours3 = sliceAndMultiply(2, warmColours);
  let warmColours4 = sliceAndMultiply(3, warmColours);
  let warmColours5 = sliceAndMultiply(4, warmColours);
  let warmColours6 = sliceAndMultiply(5, warmColours);
  let warmColours7 = sliceAndMultiply(6, warmColours);
  let warmColours8 = sliceAndMultiply(7, warmColours);
  let warmColours9 = sliceAndMultiply(8, warmColours);
  let warmColours10 = sliceAndMultiply(9, warmColours);
  let warmColours11 = sliceAndMultiply(10, warmColours);
  let warmColours12 = sliceAndMultiply(11, warmColours);
  let warmColours13 = sliceAndMultiply(12, warmColours);
  let warmColours14 = sliceAndMultiply(13, warmColours);
  let warmColours15 = sliceAndMultiply(14, warmColours);
  let warmColours16 = sliceAndMultiply(15, warmColours);


  // Array for cold colours
coldColours = coldColours.split(" ");
  coldColours.pop();
  let coldColours1 = sliceAndMultiply(0, coldColours);
  let coldColours2 = sliceAndMultiply(1, coldColours);
  let coldColours3 = sliceAndMultiply(2, coldColours);
  let coldColours4 = sliceAndMultiply(3, coldColours);
  let coldColours5 = sliceAndMultiply(4, coldColours);
  let coldColours6 = sliceAndMultiply(5, coldColours);
  let coldColours7 = sliceAndMultiply(6, coldColours);
  let coldColours8 = sliceAndMultiply(7, coldColours);
  let coldColours9 = sliceAndMultiply(8, coldColours);
  let coldColours10 = sliceAndMultiply(9, coldColours);
  let coldColours11 = sliceAndMultiply(10, coldColours);
  let coldColours12 = sliceAndMultiply(11, coldColours);
  let coldColours13 = sliceAndMultiply(12, coldColours);
  let coldColours14 = sliceAndMultiply(13, coldColours);
  let coldColours15 = sliceAndMultiply(14, coldColours);
  let coldColours16 = sliceAndMultiply(15, coldColours);
  
  
  // converting brightnessvalue to array:
  brightness = brightness.split(" ");
  brightness.pop();
  
  // Function that converts midi value to frequency:
  function arrayToFreq(array) {
      let a = 440; //frequency of A (coomon value is 440Hz)
      var newArray = [];
  
      for (var i = 0; i < array.length; i += 1) {
  
          if (array[i] > 0)
              newArray.push((a / 32) * (2 ** ((array[i] - 9) / 12)));
          else
              newArray.push(0);
      }
      return newArray;
  }
  
  // array that slices the 16x16 array up in 16 different separate arrays
  function sliceAndMultiply(multiplyValue, array) {
  
      var number1 = scaledWidth * multiplyValue;
      var number2 = scaledWidth * multiplyValue + parseInt(scaledWidth);
      var output = array.slice(number1, number2);
  
      return output;
  };
  
  // brightness value determines note on/off.
  function onOffValues(array, midivalue) {
      var onOffValue = [];
      for (var i = 0; i < array.length; i += 1) {
  
      if (array[i] < (sensiScale) )
          onOffValue.push(midivalue);
      else
          onOffValue.push(0);
     }
     return onOffValue;
  };
  
  
  // slicing the 16x16 array up ti 16 different separate arrays
  brightness1 = sliceAndMultiply(0, brightness);
  brightness2 = sliceAndMultiply(1, brightness);
  brightness3 = sliceAndMultiply(2, brightness);
  brightness4 = sliceAndMultiply(3, brightness);
  brightness5 = sliceAndMultiply(4, brightness);
  brightness6 = sliceAndMultiply(5, brightness);
  brightness7 = sliceAndMultiply(6, brightness);
  brightness8 = sliceAndMultiply(7, brightness);
  brightness9 = sliceAndMultiply(8, brightness);
  brightness10 = sliceAndMultiply(9, brightness);
  brightness11 = sliceAndMultiply(10, brightness);
  brightness12 = sliceAndMultiply(11, brightness);
  brightness13 = sliceAndMultiply(12, brightness);
  brightness14 = sliceAndMultiply(13, brightness);
  brightness15 = sliceAndMultiply(14, brightness);
  brightness16 = sliceAndMultiply(15, brightness);
  
  // converting the arrays to arrays determing on and off of midi values. One array per horizontal line of the image.
  let Arraybrightness1 = onOffValues(brightness1, 62);
  let Arraybrightness2 = onOffValues(brightness2, 61);
  let Arraybrightness3 = onOffValues(brightness3, 59);
  let Arraybrightness4 = onOffValues(brightness4, 57);
  let Arraybrightness5 = onOffValues(brightness5, 55);
  let Arraybrightness6 = onOffValues(brightness6, 54);
  let Arraybrightness7 = onOffValues(brightness7, 52);
  let Arraybrightness8 = onOffValues(brightness8, 50);
  let Arraybrightness9 = onOffValues(brightness9, 49);
  let Arraybrightness10 = onOffValues(brightness10, 47);
  let Arraybrightness11 = onOffValues(brightness11, 45);
  let Arraybrightness12 = onOffValues(brightness12, 43);
  let Arraybrightness13 = onOffValues(brightness13, 42);
  let Arraybrightness14 = onOffValues(brightness14, 40);
  let Arraybrightness15 = onOffValues(brightness15, 38);
  let Arraybrightness16 = onOffValues(brightness16, 37);
  
  // converting brightness arrays to frequencies
  Arraybrightness1 = arrayToFreq(Arraybrightness1);
  Arraybrightness2 = arrayToFreq(Arraybrightness2);
  Arraybrightness3 = arrayToFreq(Arraybrightness3);
  Arraybrightness4 = arrayToFreq(Arraybrightness4);
  Arraybrightness5 = arrayToFreq(Arraybrightness5);
  Arraybrightness6 = arrayToFreq(Arraybrightness6);
  Arraybrightness7 = arrayToFreq(Arraybrightness7);
  Arraybrightness8 = arrayToFreq(Arraybrightness8);
  Arraybrightness9 = arrayToFreq(Arraybrightness9);
  Arraybrightness10 = arrayToFreq(Arraybrightness10);
  Arraybrightness11 = arrayToFreq(Arraybrightness11);
  Arraybrightness12 = arrayToFreq(Arraybrightness12);
  Arraybrightness13 = arrayToFreq(Arraybrightness13);
  Arraybrightness14 = arrayToFreq(Arraybrightness14);
  Arraybrightness15 = arrayToFreq(Arraybrightness15);
  Arraybrightness16 = arrayToFreq(Arraybrightness16);
  
  
  // Functions for the 16 different sequences:
  
  const seq = new Tone.Sequence((time, note) => {
  
      var time2 = time * 4;
      
      var i = Math.floor(time2 % brightness1.length);
  


      // Harmonicity for DuoSynth determined by warmness of prior pixel
      synth.harmonicity.value = warmColours1[i-1];

      // Gain value for individual line pixel triggered by brightness value
      gainNode1.gain.rampTo(brightness1[i], 0.2);

      // Individual filter wet value triggered by coldness of colour next to pixel
      autoFilter1.wet.value = coldColours1[i+1];

      // Release value triggered by whiteness of pixel below
      synth.triggerAttackRelease(note, whiteness2[i], time);
  
  
  }, Arraybrightness1).start(0);
  
  const seq2 = new Tone.Sequence((time, note) => {
  
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness2.length);

  // Synth 2-4 follows the same pattern:
      gainNode2.gain.rampTo(brightness2[i], 0.2);
      autoFilter2.wet.value = coldColours2[i+1];
      synth2.triggerAttackRelease(note, whiteness3[i], time);
  
  
  }, Arraybrightness2).start(0);
  
  const seq3 = new Tone.Sequence((time, note) => {
  
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness3.length);
  
      gainNode3.gain.rampTo(brightness3[i], 0.2);
      autoFilter3.wet.value = coldColours3[i+1];
      synth3.triggerAttackRelease(note, whiteness4[i], time);

  }, Arraybrightness3).start(0);
  
  const seq4 = new Tone.Sequence((time, note) => {
  
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness4.length);
  
      gainNode4.gain.rampTo(brightness4[i], 0.2);
      autoFilter4.wet.value = coldColours4[i+1];
      synth4.triggerAttackRelease(note, whiteness5[i], time);
  

  }, Arraybrightness4).start(0);
  
  const seq5 = new Tone.Sequence((time, note) => {
  
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness5.length);

      // Modulation value for FMSynth determined by warmness of prior pixel
      synth5.modulation.value = warmColours5[i-1];

      gainNode5.gain.rampTo(brightness5[i], 0.2);
      feedbackDelay5.wet.value = coldColours5[i+1];
      synth5.triggerAttackRelease(note, whiteness6[i], time);
  
  
      // subdivisions are given as subarrays
  }, Arraybrightness5).start(0);
  
  const seq6 = new Tone.Sequence((time, note) => {
  
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness6.length);
  
      gainNode6.gain.rampTo(brightness6[i], 0.2);
      feedbackDelay6.wet.value = coldColours6[i+1];
      synth6.triggerAttackRelease(note, whiteness7[i], time);
  
      // subdivisions are given as subarrays
  }, Arraybrightness6).start(0);
  
  const seq7 = new Tone.Sequence((time, note) => {
  
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness7.length);
  
      gainNode7.gain.rampTo(brightness7[i], 0.2);
      feedbackDelay7.wet.value = coldColours7[i+1];
      synth7.triggerAttackRelease(note, whiteness8[i], time);
  
      // subdivisions are given as subarrays
  }, Arraybrightness7).start(0);
  
  const seq8 = new Tone.Sequence((time, note) => {
  
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness8.length);
  
      gainNode8.gain.rampTo(brightness8[i], 0.2);
      feedbackDelay8.wet.value= coldColours8[i+1];
      synth8.triggerAttackRelease(note, whiteness9[i], time);
  
      // subdivisions are given as subarrays
  }, Arraybrightness8).start(0);
  
  const seq9 = new Tone.Sequence((time, note) => {
  
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness9.length);
  
      gainNode9.gain.rampTo(brightness9[i], 0.2);
      reverb9.preDelay.value = coldColours9[i+1];
      synth9.harmonicity.value = warmColours9[i-1];

      synth9.triggerAttackRelease(note, whiteness10[i], time);
  
  
      // subdivisions are given as subarrays
  }, Arraybrightness9).start(0);
  
  const seq10 = new Tone.Sequence((time, note) => {
  
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness10.length);
  
      gainNode10.gain.rampTo(brightness10[i], 0.2);
      reverb10.preDelay.value = coldColours10[i+1];
      synth10.triggerAttackRelease(note, whiteness11[i], time);
  
  
  
      // subdivisions are given as subarrays
  }, Arraybrightness10).start(0);
  
  const seq11 = new Tone.Sequence((time, note) => {
  
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness11.length);
  
      gainNode11.gain.rampTo(brightness11[i], 0.2);
      reverb11.preDelay.value = coldColours11[i+1];
      synth11.triggerAttackRelease(note, whiteness12[i], time);
  
      // subdivisions are given as subarrays
  }, Arraybrightness11).start(0);
  
  const seq12 = new Tone.Sequence((time, note) => {
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness12.length);
  
      gainNode12.gain.rampTo(brightness12[i], 0.2);
      reverb12.preDelay.value = coldColours12[i+1];
      synth11.triggerAttackRelease(note, whiteness13[i], time);
  
      // subdivisions are given as subarrays
  }, Arraybrightness12).start(0);
  
  const seq13 = new Tone.Sequence((time, note) => {
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness13.length);
  
      gainNode13.gain.rampTo(brightness13[i], 0.2);
      phaser13.wet.value = coldColours13[i+1];
      synth13.modulation.value = warmColours13[i-1];
  
      synth11.triggerAttackRelease(note, whiteness14[i], time);
  
      // subdivisions are given as subarrays
  }, Arraybrightness13).start(0);
  
  const seq14 = new Tone.Sequence((time, note) => {
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness14.length);
  
      gainNode14.gain.rampTo(brightness14[i], 0.2);
      phaser14.wet.value = coldColours14[i+1];
      synth11.triggerAttackRelease(note, whiteness15[i], time);
  
      // subdivisions are given as subarrays
  }, Arraybrightness14).start(0);
  
  const seq15 = new Tone.Sequence((time, note) => {
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness15.length);
  
      gainNode15.gain.rampTo(brightness15[i], 0.2);
      phaser15.wet.value = coldColours15[i+1];
      synth11.triggerAttackRelease(note, whiteness16[i], time);
  
      // subdivisions are given as subarrays
  }, Arraybrightness15).start(0);
  
  const seq16 = new Tone.Sequence((time, note) => {
      var time2 = time * 4;
  
      var i = Math.floor(time2 % brightness16.length);
  
      gainNode16.gain.rampTo(brightness16[i], 0.2);
      phaser16.wet.value = coldColours16[i+1];
      synth11.triggerAttackRelease(note, whiteness1[i], time);
  
      // subdivisions are given as subarrays
  }, Arraybrightness16).start(0);
  
  
  }
  
  
  
  });
  });
  
  
  //Function for scaling any incoming number
  function generateScaleFunction(prevMin, prevMax, newMin, newMax) {
      var offset = newMin - prevMin,
          scale = (newMax - newMin) / (prevMax - prevMin);
      return function (x) {
          return offset + scale * x;
          };
      };
  
  let normalize = generateScaleFunction(-0.5, 1, 0, 1);
  