
import time
import ctcsound
cs = ctcsound.Csound() # instantiate Csound

err = cs.compileCsd("sine.csd") #compile the Csound csd (the instruments)
cs.start() # start Csound
cs.scoreEvent("i",[1,0,5]) #play a note on instrument 1
frequencies = [660,330,220,440,550] # some frequencies we want to hear
time_start = time.time() # mark the start time (just so we can use time to index the table)
while (cs.performKsmps() == 0): # synthesize one block of audio
    try:
      # send frequency values to the Csound instrument
      cs.setControlChannel('frequency', frequencies[int(time.time()-time_start)])
    except:
        # if the table lookup fails (because we spent all the values)
        cs.scoreEvent("e",[]) # tell Csound that we want to end
cs.reset() # clean up Csound
