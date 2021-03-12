<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>

<CsInstruments>
sr = 48000
ksmps = 64
nchnls = 2
0dbfs = 1

instr 1
kcps chnget "frequency" ; we get values from Python on this channel
kcps tonek kcps, 5
iamp = ampdbfs(-3) ; basic amplitude in decibels
amp adsr 0.3, 0.2, 0.5, 0.5 ; amp envelope
a1 poscil amp*iamp, kcps ; oscillator

outs a1, a1 ; audio output
endin

</CsInstruments>
<CsScore>
; empty score: wait forever
</CsScore>
</CsoundSynthesizer>
