import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MoodEntry {
  id: string;
  date: Date;
  text: string;
  mood: string;
  emotion: string;
  intensity: number;
  aiResponse?: string;
  suggestions?: string[];
}

interface MoodContextType {
  entries: MoodEntry[];
  currentEntry: MoodEntry | null;
  addEntry: (entry: Omit<MoodEntry, 'id'>) => void;
  setCurrentEntry: (entry: MoodEntry | null) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};

interface MoodProviderProps {
  children: ReactNode;
}

export const MoodProvider: React.FC<MoodProviderProps> = ({ children }) => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<MoodEntry | null>(null);

  const addEntry = (entry: Omit<MoodEntry, 'id'>) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setEntries(prev => [...prev, newEntry]);
    setCurrentEntry(newEntry);
  };

  return (
    <MoodContext.Provider value={{ entries, currentEntry, addEntry, setCurrentEntry }}>
      {children}
    </MoodContext.Provider>
  );
};