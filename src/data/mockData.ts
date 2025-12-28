export interface Team {
  id: string;
  name: string;
  city: string;
  country: string;
  arena: string;
  founded: number;
  logoUrl: string;
  primaryColor: string;
  wins: number;
  losses: number;
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  teamId: string;
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
  number: number;
  height: number;
  weight: number;
  nationality: string;
  birthDate: string;
  stats: {
    ppg: number;
    rpg: number;
    apg: number;
    efficiency: number;
  };
}

export interface Game {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  venue: string;
  status: 'upcoming' | 'finished';
  homeScore?: number;
  awayScore?: number;
  quarterScores?: {
    home: number[];
    away: number[];
  };
}

export interface GameStats {
  gameId: string;
  teamStats: {
    homeTeam: TeamGameStats;
    awayTeam: TeamGameStats;
  };
  playerStats: PlayerGameStats[];
}

export interface TeamGameStats {
  teamId: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fgPercentage: number;
  threePercentage: number;
  ftPercentage: number;
}

export interface PlayerGameStats {
  playerId: string;
  teamId: string;
  minutes: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fgMade: number;
  fgAttempts: number;
  threeMade: number;
  threeAttempts: number;
  ftMade: number;
  ftAttempts: number;
  efficiency: number;
}

export const teams: Team[] = [
  {
    id: 'rm',
    name: 'Real Madrid',
    city: 'Madrid',
    country: 'Spain',
    arena: 'WiZink Center',
    founded: 1931,
    logoUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop',
    primaryColor: '#FFFFFF',
    wins: 18,
    losses: 6,
  },
  {
    id: 'bar',
    name: 'FC Barcelona',
    city: 'Barcelona',
    country: 'Spain',
    arena: 'Palau Blaugrana',
    founded: 1926,
    logoUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop',
    primaryColor: '#A50044',
    wins: 17,
    losses: 7,
  },
  {
    id: 'oly',
    name: 'Olympiacos',
    city: 'Piraeus',
    country: 'Greece',
    arena: 'Peace and Friendship Stadium',
    founded: 1931,
    logoUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=200&h=200&fit=crop',
    primaryColor: '#CC0000',
    wins: 15,
    losses: 9,
  },
  {
    id: 'fen',
    name: 'Fenerbahçe',
    city: 'Istanbul',
    country: 'Turkey',
    arena: 'Ülker Sports Arena',
    founded: 1913,
    logoUrl: 'https://images.unsplash.com/photo-1504450758481-7338bbe75c8e?w=200&h=200&fit=crop',
    primaryColor: '#FFED00',
    wins: 14,
    losses: 10,
  },
  {
    id: 'cska',
    name: 'CSKA Moscow',
    city: 'Moscow',
    country: 'Russia',
    arena: 'Megasport Arena',
    founded: 1924,
    logoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop',
    primaryColor: '#ED1B2F',
    wins: 13,
    losses: 11,
  },
  {
    id: 'mac',
    name: 'Maccabi Tel Aviv',
    city: 'Tel Aviv',
    country: 'Israel',
    arena: 'Menora Mivtachim Arena',
    founded: 1932,
    logoUrl: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=200&h=200&fit=crop',
    primaryColor: '#FFD100',
    wins: 12,
    losses: 12,
  },
  {
    id: 'pao',
    name: 'Panathinaikos',
    city: 'Athens',
    country: 'Greece',
    arena: 'OAKA Indoor Hall',
    founded: 1919,
    logoUrl: 'https://images.unsplash.com/photo-1474224017046-182bbe4f1e4b?w=200&h=200&fit=crop',
    primaryColor: '#008749',
    wins: 11,
    losses: 13,
  },
  {
    id: 'mil',
    name: 'EA7 Emporio Armani Milano',
    city: 'Milan',
    country: 'Italy',
    arena: 'Mediolanum Forum',
    founded: 1936,
    logoUrl: 'https://images.unsplash.com/photo-1504450758481-7338bbe75c8e?w=200&h=200&fit=crop',
    primaryColor: '#CE0037',
    wins: 10,
    losses: 14,
  },
];

export const players: Player[] = [
  // Real Madrid
  {
    id: 'p1',
    firstName: 'Sergio',
    lastName: 'Llull',
    teamId: 'rm',
    position: 'PG',
    number: 23,
    height: 190,
    weight: 93,
    nationality: 'Spain',
    birthDate: '1987-11-15',
    stats: { ppg: 12.5, rpg: 2.1, apg: 5.8, efficiency: 14.2 },
  },
  {
    id: 'p2',
    firstName: 'Walter',
    lastName: 'Tavares',
    teamId: 'rm',
    position: 'C',
    number: 22,
    height: 220,
    weight: 120,
    nationality: 'Cape Verde',
    birthDate: '1992-03-22',
    stats: { ppg: 10.8, rpg: 8.4, apg: 1.2, efficiency: 18.5 },
  },
  {
    id: 'p3',
    firstName: 'Mario',
    lastName: 'Hezonja',
    teamId: 'rm',
    position: 'SF',
    number: 8,
    height: 203,
    weight: 100,
    nationality: 'Croatia',
    birthDate: '1995-02-25',
    stats: { ppg: 14.2, rpg: 4.5, apg: 2.3, efficiency: 15.8 },
  },
  // Barcelona
  {
    id: 'p4',
    firstName: 'Nikola',
    lastName: 'Mirotic',
    teamId: 'bar',
    position: 'PF',
    number: 33,
    height: 208,
    weight: 107,
    nationality: 'Spain',
    birthDate: '1991-02-11',
    stats: { ppg: 16.8, rpg: 6.2, apg: 1.8, efficiency: 19.4 },
  },
  {
    id: 'p5',
    firstName: 'Cory',
    lastName: 'Higgins',
    teamId: 'bar',
    position: 'SG',
    number: 22,
    height: 196,
    weight: 92,
    nationality: 'USA',
    birthDate: '1989-06-14',
    stats: { ppg: 11.2, rpg: 2.8, apg: 2.5, efficiency: 12.6 },
  },
  {
    id: 'p6',
    firstName: 'Nicolas',
    lastName: 'Laprovittola',
    teamId: 'bar',
    position: 'PG',
    number: 20,
    height: 183,
    weight: 80,
    nationality: 'Argentina',
    birthDate: '1990-01-31',
    stats: { ppg: 10.4, rpg: 1.9, apg: 4.8, efficiency: 11.2 },
  },
  // Olympiacos
  {
    id: 'p7',
    firstName: 'Vassilis',
    lastName: 'Spanoulis',
    teamId: 'oly',
    position: 'PG',
    number: 7,
    height: 191,
    weight: 91,
    nationality: 'Greece',
    birthDate: '1982-08-07',
    stats: { ppg: 13.4, rpg: 2.2, apg: 6.1, efficiency: 15.8 },
  },
  {
    id: 'p8',
    firstName: 'Sasha',
    lastName: 'Vezenkov',
    teamId: 'oly',
    position: 'PF',
    number: 8,
    height: 206,
    weight: 102,
    nationality: 'Bulgaria',
    birthDate: '1995-08-04',
    stats: { ppg: 15.6, rpg: 5.8, apg: 2.1, efficiency: 17.2 },
  },
  // Fenerbahce
  {
    id: 'p9',
    firstName: 'Nando',
    lastName: 'De Colo',
    teamId: 'fen',
    position: 'SG',
    number: 1,
    height: 196,
    weight: 91,
    nationality: 'France',
    birthDate: '1987-06-23',
    stats: { ppg: 14.8, rpg: 3.1, apg: 4.2, efficiency: 16.4 },
  },
  {
    id: 'p10',
    firstName: 'Jan',
    lastName: 'Vesely',
    teamId: 'fen',
    position: 'PF',
    number: 24,
    height: 213,
    weight: 108,
    nationality: 'Czech Republic',
    birthDate: '1990-04-24',
    stats: { ppg: 12.2, rpg: 5.4, apg: 2.8, efficiency: 15.1 },
  },
  // CSKA
  {
    id: 'p11',
    firstName: 'Mike',
    lastName: 'James',
    teamId: 'cska',
    position: 'PG',
    number: 5,
    height: 185,
    weight: 82,
    nationality: 'USA',
    birthDate: '1990-08-18',
    stats: { ppg: 18.4, rpg: 3.2, apg: 5.6, efficiency: 20.1 },
  },
  {
    id: 'p12',
    firstName: 'Nikola',
    lastName: 'Milutinov',
    teamId: 'cska',
    position: 'C',
    number: 21,
    height: 213,
    weight: 118,
    nationality: 'Serbia',
    birthDate: '1994-11-30',
    stats: { ppg: 9.8, rpg: 7.2, apg: 1.4, efficiency: 14.6 },
  },
  // Maccabi
  {
    id: 'p13',
    firstName: 'Lorenzo',
    lastName: 'Brown',
    teamId: 'mac',
    position: 'PG',
    number: 3,
    height: 196,
    weight: 85,
    nationality: 'Spain',
    birthDate: '1990-08-30',
    stats: { ppg: 11.6, rpg: 3.4, apg: 5.2, efficiency: 13.8 },
  },
  // Panathinaikos
  {
    id: 'p14',
    firstName: 'Georgios',
    lastName: 'Papagiannis',
    teamId: 'pao',
    position: 'C',
    number: 5,
    height: 216,
    weight: 120,
    nationality: 'Greece',
    birthDate: '1997-07-01',
    stats: { ppg: 8.4, rpg: 6.8, apg: 1.1, efficiency: 12.4 },
  },
  // Milano
  {
    id: 'p15',
    firstName: 'Sergio',
    lastName: 'Rodriguez',
    teamId: 'mil',
    position: 'PG',
    number: 13,
    height: 191,
    weight: 83,
    nationality: 'Spain',
    birthDate: '1986-06-12',
    stats: { ppg: 10.2, rpg: 2.0, apg: 6.8, efficiency: 13.2 },
  },
];

export const games: Game[] = [
  // Upcoming games
  {
    id: 'g1',
    homeTeamId: 'rm',
    awayTeamId: 'bar',
    date: '2025-01-05T20:00:00',
    venue: 'WiZink Center',
    status: 'upcoming',
  },
  {
    id: 'g2',
    homeTeamId: 'oly',
    awayTeamId: 'fen',
    date: '2025-01-06T19:00:00',
    venue: 'Peace and Friendship Stadium',
    status: 'upcoming',
  },
  {
    id: 'g3',
    homeTeamId: 'cska',
    awayTeamId: 'mac',
    date: '2025-01-07T18:00:00',
    venue: 'Megasport Arena',
    status: 'upcoming',
  },
  {
    id: 'g4',
    homeTeamId: 'pao',
    awayTeamId: 'mil',
    date: '2025-01-08T20:30:00',
    venue: 'OAKA Indoor Hall',
    status: 'upcoming',
  },
  // Finished games
  {
    id: 'g5',
    homeTeamId: 'rm',
    awayTeamId: 'oly',
    date: '2024-12-20T20:00:00',
    venue: 'WiZink Center',
    status: 'finished',
    homeScore: 85,
    awayScore: 78,
    quarterScores: {
      home: [22, 18, 24, 21],
      away: [20, 19, 18, 21],
    },
  },
  {
    id: 'g6',
    homeTeamId: 'bar',
    awayTeamId: 'cska',
    date: '2024-12-19T19:00:00',
    venue: 'Palau Blaugrana',
    status: 'finished',
    homeScore: 92,
    awayScore: 88,
    quarterScores: {
      home: [24, 22, 21, 25],
      away: [23, 24, 20, 21],
    },
  },
  {
    id: 'g7',
    homeTeamId: 'fen',
    awayTeamId: 'pao',
    date: '2024-12-18T20:00:00',
    venue: 'Ülker Sports Arena',
    status: 'finished',
    homeScore: 76,
    awayScore: 72,
    quarterScores: {
      home: [18, 20, 17, 21],
      away: [19, 16, 18, 19],
    },
  },
  {
    id: 'g8',
    homeTeamId: 'mac',
    awayTeamId: 'mil',
    date: '2024-12-17T19:30:00',
    venue: 'Menora Mivtachim Arena',
    status: 'finished',
    homeScore: 81,
    awayScore: 79,
    quarterScores: {
      home: [20, 21, 19, 21],
      away: [22, 18, 20, 19],
    },
  },
];

export const gameStats: GameStats[] = [
  {
    gameId: 'g5',
    teamStats: {
      homeTeam: {
        teamId: 'rm',
        points: 85,
        rebounds: 38,
        assists: 22,
        steals: 8,
        blocks: 4,
        turnovers: 12,
        fgPercentage: 48.2,
        threePercentage: 38.5,
        ftPercentage: 82.1,
      },
      awayTeam: {
        teamId: 'oly',
        points: 78,
        rebounds: 34,
        assists: 18,
        steals: 6,
        blocks: 3,
        turnovers: 14,
        fgPercentage: 44.8,
        threePercentage: 32.1,
        ftPercentage: 78.5,
      },
    },
    playerStats: [
      {
        playerId: 'p1',
        teamId: 'rm',
        minutes: 28,
        points: 18,
        rebounds: 3,
        assists: 7,
        steals: 2,
        blocks: 0,
        turnovers: 3,
        fgMade: 6,
        fgAttempts: 12,
        threeMade: 2,
        threeAttempts: 5,
        ftMade: 4,
        ftAttempts: 5,
        efficiency: 21,
      },
      {
        playerId: 'p2',
        teamId: 'rm',
        minutes: 26,
        points: 14,
        rebounds: 10,
        assists: 1,
        steals: 1,
        blocks: 3,
        turnovers: 2,
        fgMade: 6,
        fgAttempts: 9,
        threeMade: 0,
        threeAttempts: 0,
        ftMade: 2,
        ftAttempts: 3,
        efficiency: 24,
      },
      {
        playerId: 'p7',
        teamId: 'oly',
        minutes: 32,
        points: 22,
        rebounds: 4,
        assists: 6,
        steals: 1,
        blocks: 0,
        turnovers: 4,
        fgMade: 7,
        fgAttempts: 15,
        threeMade: 3,
        threeAttempts: 7,
        ftMade: 5,
        ftAttempts: 6,
        efficiency: 20,
      },
    ],
  },
];
