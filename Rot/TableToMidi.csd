<CsoundSynthesizer>
<CsOptions>
--midioutfile=midiout.mid // EXPORT MIDI TO FILE //-n -d -+rtmidi=NULL -M0 -m0d
</CsOptions>
<CsInstruments>
; Initialize the global variables.
ksmps = 32
nchnls = 2
0dbfs = 1

//  TABLES TO BE CONVERTED TO MIDI
                            // VALUES TO BE CONVERTED, NORMLIZED
    // Klokkeslett
    giTable1 ftgen 0, 0, 0, -2,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7,8,9,10
    // Vær
    giTable2 ftgen 0, 0, 0, -2,1,0,0,1,0,0,1,0,0,0.66,0,0,0.66,0,0,0,0,0,0,0,0,0.33,0,0,0
    // Min Temp.
    giTable3 ftgen 0, 0, 0, -2,1.1,4.2,5.5,6.1,6.6,6.5,6.4,5.4,3.6,2.5,1.7,1.6,1.7,1.5,1.4,1.2,1.5,1.5,2.5,3,3.5,5.1,5.1,5.7,5.8
    // Maks Temp.
    giTable4 ftgen 0, 0, 0, -2,4.6,5.6,6.7,6.7,7.5,7.3,7.2,6.6,5.5,3.5,2.6,1.9,3.5,1.8,2.2,2,2.4,2.6,3.3,3.6,5.2,5.6,5.9,8,6
    // Målt Temp.
    giTable5 ftgen 0, 0, 0, -2,4.5,5.6,6.5,6.6,7.1,6.7,6.6,5.5,3.6,2.6,1.7,1.9,1.7,1.5,1.4,1.9,2.4,2.6,3.1,3.5,5.2,5.6,5.8,5.9,5.8
    // Kraftige vindkast
    giTable6 ftgen 0, 0, 0, -2,2.2,2.5,2.5,2.6,4.9,4,3.4,4.8,7.6,4.7,4.5,6,8,7.1,8.2,8.9,9.5,7.8,8.2,9.1,16.2,21,21.3,22.1,23.3
    // Vind i MS
    giTable7 ftgen 0, 0, 0, -2,1.1,1.4,1.3,1.2,2.4,1.9,2.2,2.1,2.9,3,2.4,2.7,4.2,4.5,3.6,4.6,4.6,5.2,4.2,5.7,10.3,13.2,13.1,15.1,14.4
    // Luftfuktighet
    giTable8 ftgen 0, 0, 0, -2,0.61,0.52,0.49,0.47,0.46,0.47,0.47,0.49,0.59,0.7,0.72,0.64,0.63,0.65,0.68,0.62,0.57,0.55,0.52,0.5,0.38,0.35,0.32,0.31,0.33


// MIDI CONVERTER INSTRUMENT
instr 1
  // READ FROM TABLE, NORMALIZED
    kcps = 1/p3 // READ SPEED OF INDEX
    kIndex phasor kcps // READS THE INDEX OF THE TABLE
    ifn = giTable8 // Function Table
    ixmode = 1 // ixmode - index data mode: 1 Normalized, 0 Non-Normalized
    ixoff = 0 // ixoff - amount by which index is to be offset.
    iwrap = 0 // iwrap - wraparound index flag
    kNorm table kIndex, ifn, ixmode, ixoff, iwrap
/*
  // MIN-MAX NORMALIZATION (BETWEEN 0 AND 1)
    kTable = giTable1 // TABLE TO BE CONVERTED
    kMin = 1 // MIN VALUE IN TABLE
    kMax = 9 // MAX VALUE IN TABLE
    kNorm = (kTable-kMin)/(kMax-kMin)
*/
  // SCALING TO DESIRED RANGE
    kSkalMin = 1
    kSkalMax = 10
    kRange = kSkalMax-kSkalMin
    //kScaled = (kNorm*kRange)+kSkalMin
    
    kScaled = (kNorm/kMax)*128 // scale value

  //  kScaled = (kNorm-0+kSkalMin)/(1-0+kScaled)*kSkalMax  //(values-min(values)+minOutput)/(max(values)-min(values)+output)*maxOutput
  //  kScaled = (((kSkalMax-kSkalMin)*(kNorm - 0))/(1-0))+kSkalMin

  // MIDI OUT
    knum  = kScaled/10 // knum -- note number (0-127)
    kchn  = 1 //kchn -- MIDI channel number (1-16)
    kvel  = 100 // kvel -- velocity (0-127)
    kDuration = 0.500 //kdur -- note duration in seconds
    kpause  = 0 // kpause -- pause duration after each noteoff and before new note in seconds
    moscil kchn, knum, kvel, kDuration, kpause

printk 1, knum/*, ispace, inamed, i, i*/
endin

</CsInstruments>
<CsScore>
//starts instrument 1 and runs it for a week
i1 0 20
</CsScore>
</CsoundSynthesizer>
