#!/usr/bin/python
# -*- coding: latin-1 -*-

"""
A wrapper for using vectorHarmonizer from Csound

Quick and dirty adaption from ImproSculpt4 eventCaller

@author: Øyvind Brandtsegg
@contact: obrandts@gmail.com
@license: GPL
"""

from pythresh import *
from vectorHarmonizer import *

class VectorHarmWrap:
    """
    Quick and dirty minimized version of ImproSculpt4 EventCaller class
    """

    def __init__(self):

        self.vHarmonize = VectorHarmonizer()
        """Instance of the VectorHarmonizer composition class."""
        self.pyThresh = PyThresh(0.3) # 300 millisecond time window for thresh
        """Instance of the thresh object, similar to a MAX/MSP thresh object."""
        self.vectorHarmonizeAutoVoiceRange = True
        """Auto update of vector harmonize voice range according to midi note number used as input to the harmonizer."""
        self.pendingOnEvents = {}
        """Queue of note events to be turned on, for a specific base note number and channel."""
        self.pendingOffEvents = {}
        """Queue of note events to be turned off, for a specific base note number and channel."""
        self.playChannels = [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]
        self.recordChannels = [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0]

    def vectorHarmonizeMidiNote(self, note, channel, instr):
        if note*channel not in self.pendingOnEvents.keys():
            self.pendingOnEvents[note*channel] = []
        if self.pendingOnEvents[note*channel] == []:
            self.vectorHarmonizeMidiNote2(note, channel, instr)
        pitch, instr = self.pendingOnEvents[note*channel].pop(0)
        return float(pitch), float(instr)

    def vectorHarmonizeMidiNoteOff(self, note, channel):
        if note*channel not in self.pendingOffEvents.keys():
            self.pendingOffEvents[note*channel] = []
        if self.pendingOffEvents[note*channel] == []:
            self.vectorHarmonizeMidiNoteOff2(note, channel)
        pitch, instr = self.pendingOffEvents[note*channel].pop(0)
        return float(pitch), float(instr)

    def vectorHarmonizeMidiNote2(self, note, channel, instr):
        """
        Harmonize a midi note, using the vectorHarmonizer to determine the harmony notes.

        @param self: The object pointer.
        @param note: The note number to be harmonized.
        @param channel: The midi channel of the note, used to distinguish notes received simultaneuosly on different channels (setCurrentChordForNote).
        @param instr : The instument number used for playback of harmonizing notes
        """
        if self.vectorHarmonizeAutoVoiceRange:
            self.vHarmonize.setVoiceRange([note-self.vHarmonize.autoVoiceRangeBorder, note+self.vHarmonize.autoVoiceRangeBorder])
        chord = self.vHarmonize.harmonize(note)
        chord.append(-999) #end of list flag
        chordInstr = self.vHarmonize.setCurrentChordForNote(note*channel, chord, instr)
        self.pendingOnEvents[note*channel] = []
        for pitch, instr in chordInstr:
            self.pendingOnEvents[note*channel].append([pitch, instr])

    def vectorHarmonizeMidiNoteOff2(self, note, channel):
        """
        Turn off a chord, as played by the vector harmonizing of a midi note.

        The chord for a midi note number, and the instrument number used to play that chord is stored in a dictionary the VectorHarmonizer class instance.

        @param self: The object pointer.
        @param note: The harmonized note to be turned off.
        @param channel: The midi channel of the note, used to distinguish notes received simultaneuosly on different channels (setCurrentChordForNote).
        """
        chordInstr = self.vHarmonize.getCurrentChordForNote(note*channel)
        if chordInstr == []: return
        self.pendingOffEvents[note*channel] = []
        for pitch, instr in chordInstr:
            self.pendingOffEvents[note*channel].append([pitch, instr])

    def recordIntervalVector(self, note):
        """
        Recording method for creating an interval vector from realtime midi input.

        Sets the interval vector for the vector harmonize instance.

        @param self: The object pointer.
        @param note: The note to be analyzed as part of an interval vector.
        """
        notelist = self.pyThresh.thresh(note)
        if len(notelist) < 2: return
        vector = self.vHarmonize.makeIntervalVector(notelist)
        vector = self.vHarmonize.setIntervalVector(vector)
        return vector

    def getIntervalVector(self, bogus=0):
        v1,v2,v3,v4,v5,v6 = self.vHarmonize.intervalVector
        return float(v1),float(v2),float(v3),float(v4),float(v5),float(v6)

    def setIntervalVectorFromPclist(self, pclist):
        """
        Convert a pitch class list into an interval vector

        Sets the interval vector for the vector harmonize instance.

        @param self: The object pointer.
        @param pclist: The list of pitch classes to be analyzed and convertet into an interval vector.
        """
        vector = self.vHarmonize.makeIntervalVector(pclist)
        vector = self.vHarmonize.setIntervalVector(vector)

    def setAutoVoiceRangeFlag(self, state):
        """
        Set auto voice range on or off.

        When on, the voice range is updated by each harmonized midi note,
        using the midi note number as base and self.vHarmonize.voiceRangeBorder as the relative +/- range from the base note.

        @param self: The object pointer.
        @param state: The state (true/false)
        """
        self.vectorHarmonizeAutoVoiceRange = state

    def setPcsetRecordThreshTime(self, time):
        """
        Set the size of the time window for realtime recording of pitches to be made into an interval vector.

        @param self: The object pointer.
        @param time: The size of the time window in milliseconds.
        """
        self.pyThresh.setThreshTime(time/1000.0)

    def setVectorHarmonizeVoiceRange(self, lowHighList):
        """
        Set the voice range for vector harmonizing.

        @param self: The object pointer.
        @param lowHighList: The list of [low, high] note numbers for the voice range.
        """
        self.vHarmonize.setVoiceRange(lowHighList)

    def getVectorHarmonizeVoiceRange(self, bogus=0):
        low = float(self.vHarmonize.voiceRange[0])
        high = float(self.vHarmonize.voiceRange[1])
        return low, high


if __name__ == '__main__' :
    vh = VectorHarmWrap()
    note = 60
    channel = 1
    instr = 100
    noteH = 0
    while noteH > -999 :
        noteH,instrH = vh.vectorHarmonizeMidiNote(note, channel, instr)
        print('on', noteH,instrH)
    noteH = 0
    while noteH > -999 :
        noteH,instrH = vh.vectorHarmonizeMidiNoteOff(note, channel)
        print('off', noteH,instrH)
    for note in [65,66,70]:
        vh.recordIntervalVector(note)
    note = 60
    noteH = 0
    while noteH > -999 :
        noteH,instrH = vh.vectorHarmonizeMidiNote(note, channel, instr)
        print('on', noteH,instrH)
    print(vh.getVectorHarmonizeVoiceRange(0))
