import React, { createContext, useContext, useState, ReactNode } from 'react';
import { sounds, isSoundEnabled, setSoundEnabled, playSound } from '../utils/sounds';

interface SoundContextType {
  enabled: boolean;
  toggleSound: () => void;
  play: (soundName: keyof typeof sounds) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(isSoundEnabled());

  const toggleSound = () => {
    const newState = !enabled;
    setEnabled(newState);
    setSoundEnabled(newState);
    if (newState) {
      playSound('toggle');
    }
  };

  const play = (soundName: keyof typeof sounds) => {
    if (enabled) {
      playSound(soundName);
    }
  };

  return (
    <SoundContext.Provider value={{ enabled, toggleSound, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within SoundProvider');
  }
  return context;
}
