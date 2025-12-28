import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/common/PageHeader';
import { PlayerCard } from '@/components/common/PlayerCard';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';

type SortOption = 'name' | 'ppg' | 'rpg' | 'apg' | 'efficiency';
type PositionFilter = 'all' | 'PG' | 'SG' | 'SF' | 'PF' | 'C';

export default function PlayersPage() {
  const { players, teams, loading, getTeamById } = useData();
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const [positionFilter, setPositionFilter] = useState<PositionFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('efficiency');
  const [sortDesc, setSortDesc] = useState(true);

  const filteredPlayers = useMemo(() => {
    let result = [...players];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(p =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchLower)
      );
    }

    // Team filter
    if (teamFilter !== 'all') {
      result = result.filter(p => p.teamId === teamFilter);
    }

    // Position filter
    if (positionFilter !== 'all') {
      result = result.filter(p => p.position === positionFilter);
    }

    // Sort
    result.sort((a, b) => {
      let aVal: number | string;
      let bVal: number | string;

      switch (sortBy) {
        case 'name':
          aVal = `${a.lastName} ${a.firstName}`;
          bVal = `${b.lastName} ${b.firstName}`;
          return sortDesc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
        case 'ppg':
          aVal = a.stats.ppg;
          bVal = b.stats.ppg;
          break;
        case 'rpg':
          aVal = a.stats.rpg;
          bVal = b.stats.rpg;
          break;
        case 'apg':
          aVal = a.stats.apg;
          bVal = b.stats.apg;
          break;
        case 'efficiency':
        default:
          aVal = a.stats.efficiency;
          bVal = b.stats.efficiency;
          break;
      }

      return sortDesc ? bVal - aVal : aVal - bVal;
    });

    return result;
  }, [players, search, teamFilter, positionFilter, sortBy, sortDesc]);

  if (loading) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <PageHeader
          title="Players"
          subtitle={`${filteredPlayers.length} of ${players.length} players`}
        />

        {/* Filters */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search players..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={teamFilter} onValueChange={setTeamFilter}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              {teams.map(team => (
                <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={positionFilter} onValueChange={(v) => setPositionFilter(v as PositionFilter)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              <SelectItem value="PG">Point Guard (PG)</SelectItem>
              <SelectItem value="SG">Shooting Guard (SG)</SelectItem>
              <SelectItem value="SF">Small Forward (SF)</SelectItem>
              <SelectItem value="PF">Power Forward (PF)</SelectItem>
              <SelectItem value="C">Center (C)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger>
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="efficiency">Efficiency</SelectItem>
              <SelectItem value="ppg">Points Per Game</SelectItem>
              <SelectItem value="rpg">Rebounds Per Game</SelectItem>
              <SelectItem value="apg">Assists Per Game</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Players Grid */}
        {filteredPlayers.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlayers.map((player, index) => (
              <div
                key={player.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <PlayerCard player={player} team={getTeamById(player.teamId)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">No players found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
