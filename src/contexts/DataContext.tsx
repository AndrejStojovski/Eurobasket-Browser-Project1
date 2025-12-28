import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { teams as initialTeams, players as initialPlayers, games, gameStats, Team, Player, Game, GameStats } from '@/data/mockData';

interface DataContextType {
  teams: Team[];
  players: Player[];
  games: Game[];
  gameStats: GameStats[];
  loading: boolean;
  getTeamById: (id: string) => Team | undefined;
  getPlayerById: (id: string) => Player | undefined;
  getPlayersByTeam: (teamId: string) => Player[];
  getGameById: (id: string) => Game | undefined;
  getGameStats: (gameId: string) => GameStats | undefined;
  addPlayer: (player: Omit<Player, 'id'>) => Promise<void>;
  updatePlayer: (id: string, updates: Partial<Player>) => Promise<void>;
  deletePlayer: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [teams] = useState<Team[]>(initialTeams);
  const [players, setPlayers] = useState<Player[]>(() => {
    const stored = localStorage.getItem('euroleague_players');
    return stored ? JSON.parse(stored) : initialPlayers;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('euroleague_players', JSON.stringify(players));
  }, [players]);

  const getTeamById = useCallback((id: string) => {
    return teams.find(t => t.id === id);
  }, [teams]);

  const getPlayerById = useCallback((id: string) => {
    return players.find(p => p.id === id);
  }, [players]);

  const getPlayersByTeam = useCallback((teamId: string) => {
    return players.filter(p => p.teamId === teamId);
  }, [players]);

  const getGameById = useCallback((id: string) => {
    return games.find(g => g.id === id);
  }, []);

  const getGameStats = useCallback((gameId: string) => {
    return gameStats.find(gs => gs.gameId === gameId);
  }, []);

  const addPlayer = useCallback(async (playerData: Omit<Player, 'id'>) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newPlayer: Player = {
      ...playerData,
      id: `p${Date.now()}`,
    };
    setPlayers(prev => [...prev, newPlayer]);
  }, []);

  const updatePlayer = useCallback(async (id: string, updates: Partial<Player>) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deletePlayer = useCallback(async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    setPlayers(prev => prev.filter(p => p.id !== id));
  }, []);

  const value: DataContextType = {
    teams,
    players,
    games,
    gameStats,
    loading,
    getTeamById,
    getPlayerById,
    getPlayersByTeam,
    getGameById,
    getGameStats,
    addPlayer,
    updatePlayer,
    deletePlayer,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
