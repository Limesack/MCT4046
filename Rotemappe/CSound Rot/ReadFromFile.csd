<CsoundSynthesizer>
<CsOptions>
-o test.wav -W -f //-n -d -+rtmidi=NULL -M0 -m0d
</CsOptions>
<CsInstruments>
; Initialize the global variables.
ksmps = 32
nchnls = 2
0dbfs = 1

  // IMPORT FILE AS TABLE
  giFile ftgen 0, 0, 0, -23, "test.txt"

instr 1
  // TABLE INDEXING
  kcps = 1/p3 // READ SPEED OF INDEX
  kIndex phasor kcps // READS THE INDEX OF THE TABLE
  ifn = giFile // Function Table
  ixmode = 1 // ixmode - index data mode: 1 Normalized, 0 Non-Normalized
  ixoff = 0 // ixoff - amount by which index is to be offset.
  iwrap = 0 // iwrap - wraparound index flag
  ktable table kIndex, ifn, ixmode, ixoff, iwrap

  printk2 ktable

aout oscil 0.5, ktable*100/*, iFunctionTable, iInitialPhase*/

kENV madsr 0.1, 0, 0.3, 0.1/*, iDelayTime, ireltim*/



outs aout*kENV, aout*kENV
endin


instr 2
  // LOAD FROM FILE
  iformat = 7
  iprd  = 0.1
  kArray[] init 20,10
  kIndx  = 0
  until kIndx == lenarray(kArray) do
    kres readk "test.txt", iformat, iprd
  printk2 kres
    kIndx += 1
  od

endin

</CsInstruments>
<CsScore>
// starts instrument 1 and runs it for a week
i1 0 10
//i2 0 10
</CsScore>
</CsoundSynthesizer>
