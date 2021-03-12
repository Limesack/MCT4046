<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs	=	1

instr 1
kf1 init 0
kf2 init 0
kmetro metro 1
kf1 = (kf1+kmetro)%3
kf2 = (kf2+(kmetro*0.2))%2
knewdata changed kf1, kf2
OSCsend  knewdata, "127.0.0.1", 7770, "/foo/bar", "ff", kf1, kf2
printf "data: %f, %f\n", knewdata, kf1, kf2
endin

</CsInstruments>
<CsScore>
i 1 0 [3600*24*7]
</CsScore>
</CsoundSynthesizer>
