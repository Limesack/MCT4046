<CsoundSynthesizer>
<CsOptions>
--midioutfile=midiout.mid // EXPORT MIDI TO FILE //-n -d -+rtmidi=NULL -M0 -m0d
</CsOptions>
<CsInstruments>
; Initialize the global variables.
ksmps = 32
nchnls = 2
0dbfs = 1


                  // NON FUNCTIONING.... PROBLEMS WITH READING ARRAY TOO FAST TO BE ABLE TO USE IT IN MAKING THE MIDI
instr 1
  // CREATE ARRAY
    karray[] fillarray 2.2,2.5,2.5,2.6,4.9,4,3.4,4.8,7.6,4.7,4.5,6,8,7.1,8.2,8.9,9.5,7.8,8.2,9.1,16.2,21,21.3,22.1,23.3

  // TAKE MAXIMUM VALUE FROM ARRAY
  //  kMax ,kindx maxarray karray

  // SCALE VALUE
  //  kScaled = (kNorm/kMax)*128 // scale value

  // SCALE VALUE
    scalearray karray, 1, 128

  // READ THROUGH ARRAY
    kIndex = 0
    until kIndex == lenarray(karray) do
      kArraySig = karray[kIndex]
      kIndex += 1
    od

    // MIDI OUT
    knum  = kArraySig // knum -- note number (0-127)
    kchn  = 1 // kchn -- MIDI channel number (1-16)
    kvel  = 100 // kvel -- velocity (0-127)
    kDuration = 0.500 // kdur -- note duration in seconds
    kpause  = 0 // kpause -- pause duration after each noteoff and before new note in seconds
    moscil kchn, knum, kvel, kDuration, kpause
printk 0.10, knum/*, ispace, inamed, i, i*/

endin
</CsInstruments>
<CsScore>
//starts instrument 1 and runs it for a week
i1 0 20
</CsScore>
</CsoundSynthesizer>
