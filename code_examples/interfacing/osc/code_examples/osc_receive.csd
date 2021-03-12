<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs	=	1

gihandle OSCinit 7770

instr 1
kf1 init 0
kf2 init 0
message:
kflag  OSClisten gihandle, "/foo/bar", "ff", kf1, kf2
printf "data: %f, %f\n", kflag, kf1, kf2
if kflag > 0 kgoto message
endin

</CsInstruments>
<CsScore>
i 1 0 [3600*24*7]
</CsScore>
</CsoundSynthesizer>
