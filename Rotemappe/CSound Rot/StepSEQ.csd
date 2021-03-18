<CsoundSynthesizer>
<CsOptions>
-o test.wav //-n -d -+rtmidi=NULL -M0 -m0d
</CsOptions>
<CsInstruments>
// Initialize the global variables.
ksmps = 32
nchnls = 2
0dbfs = 1

  // TABLES
    giRGB_R ftgen 0, 0, 0, -2, 231, 134, 160, 69, 114, 43, 78, 147, 152, 24, 207, 40, 63, 51, 196, 98
    giRGB_G ftgen 0, 0, 0, -2, 160, 98, 222, 79, 182, 162, 180, 249, 163, 36, 199, 59, 3, 108, 141, 27
    giRGB_B ftgen 0, 0, 0, -2, 106, 204, 80, 244, 230, 214, 41, 191, 28, 86, 231, 151, 146, 45, 162, 56

// CONTROLLER INSTRUMENT
instr 1

  // CLOCK
    ktriggercps = p4 // frequency of trigger bangs in cps.
    ktrigger metro ktriggercps

  // INDEX TABLE
  kindex init -1  // Initialize at -1 so the first index in the table is read
    if ktrigger == 1 then
      kindex += 1
      if kindex >= ftlen(giRGB_B-1) then // reads the full lenght of the table and then repeats
        kindex = 0
      endif
    endif

  // READ FROM TABLE, NORMALIZED
    ixmode = 0 // ixmode - index data mode: 1 Normalized, 0 Non-Normalized
    ixoff = 0 // ixoff - amount by which index is to be offset.
    iwrap = 0 // iwrap - wraparound index flag
    ifn = giRGB_R // Function Table
    kFrequency_R table kindex, ifn, ixmode, ixoff, iwrap
    ifn = giRGB_G // Function Table
    kFrequency_G table kindex, ifn, ixmode, ixoff, iwrap
    ifn = giRGB_B // Function Table
    kFrequency_B table kindex, ifn, ixmode, ixoff, iwrap

  // INSTRUMENT TRIGGER
    //ktrigger = // triggers a new score event. If ktrigger = 0, no new event is triggered.
    kmintim = 0 // minimum time between generated events, in seconds.
    kmaxnum = 2 // maximum number of simultaneous instances of instrument kinsnum allowed.
    kinsnum = 2 // instrument number
    kwhen = 0 // start time of the new event.
    kDuration = 1/ktriggercps // duration of event
    //kFrequency = // Frequency sent from table to instrument
    schedkwhen ktrigger, kmintim, kmaxnum, kinsnum, kwhen, kDuration, kFrequency_R, kFrequency_G, kFrequency_B

endin


// Test oscilator
instr 2

  aR oscili 0.3, p4*2 // R
  aG oscili 0.3, p5*4 // G
  aB oscili 0.3, p6*8 // B

  aEnv madsr p3*0.25, p3*0.25, 1, p3*0.4999

  outs ((aR+aG+aB)*aEnv)*0.5,((aR+aG+aB)*aEnv)*0.5

endin

</CsInstruments>
<CsScore>
      // P4 controlls notes per second
i1 0 4 6
i1 + 4 12
i1 + 4 1
i1 + 4 0.25
</CsScore>
</CsoundSynthesizer>
