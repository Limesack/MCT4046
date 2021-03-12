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
    giRGB_R ftgen 0, 0, 0, -2 ,231, 134, 160, 69, 114, 43, 78, 147, 152, 24, 207, 40, 63, 51, 196, 98
    giRGB_G ftgen 0, 0, 0, -2 ,160, 98, 222, 79, 182, 162, 180, 249, 163, 36, 199, 59, 3, 108, 141, 27
    giRGB_B ftgen 0, 0, 0, -2 ,106, 204, 80, 244, 230, 214, 41, 191, 28, 86, 231, 151, 146, 45, 162, 56

// CONTROLLER INSTRUMENT
instr 1

  // CLOCK
    ktriggercps = 4 // frequency of trigger bangs in cps.
    ktrigger metro ktriggercps

  // INDEX TABLE
    kindex init 0
    if ktrigger == 1 then
      kindex += 1
      if kindex >= ftlen(giRGB_B-1) then
        kindex = 0
      endif
    endif
  // READ FROM TABLE, NORMALIZED
    ifn = giRGB_B // Function Table
    ixmode = 0 // ixmode - index data mode: 1 Normalized, 0 Non-Normalized
    ixoff = 0 // ixoff - amount by which index is to be offset.
    iwrap = 0 // iwrap - wraparound index flag
    kFrequency table kindex, ifn, ixmode, ixoff, iwrap

    printk2 kFrequency
  // INSTRUMENT TRIGGER
    //ktrigger = // triggers a new score event. If ktrigger = 0, no new event is triggered.
    kmintim = 0 // minimum time between generated events, in seconds.
    kmaxnum = 1 // maximum number of simultaneous instances of instrument kinsnum allowed.
    kinsnum = 2 // instrument number
    kwhen = 0 // start time of the new event.
    kDuration = 0.25 // duration of event
  //  kFrequency = // Frequency sent from table to instrument
    schedkwhen ktrigger, kmintim, kmaxnum, kinsnum, kwhen, kDuration, kFrequency

endin


// Test oscilator
instr 2

  aout oscili 0.3, p4

  aEnv madsr p3*0.2, p3*1, p3*0.2, p3*0.5

  outs aout*aEnv,aout*aEnv

endin

</CsInstruments>
<CsScore>
i1 0 32
</CsScore>
</CsoundSynthesizer>
